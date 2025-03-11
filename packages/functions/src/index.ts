import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import * as functions from 'firebase-functions/v1';
import { onCall } from 'firebase-functions/v2/https';
import { onDocumentCreatedWithAuthContext } from 'firebase-functions/v2/firestore';
import type { SignUpSchema, UserDto } from '@jira-clone/core/types';
const apps = getApps();

if (apps.length === 0) {
  initializeApp();
}
export const handleUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    logger.log('Handing user creation: ', user.email);
    const firestore = getFirestore();
    await firestore.collection('users').doc(user.uid).create({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
    });
    logger.log('User document created: ', user.email);
  } catch (err) {
    logger.error('User document created: ', user.email, ':', err);
  }
});

export const signUpUser = onCall<SignUpSchema, Promise<UserDto>>(
  async (request) => {
    try {
      const { email, name, password } = request.data;
      const auth = getAuth();
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });
      const userDto: UserDto = {
        id: userRecord.uid,
        email: userRecord.email ?? '',
        name: userRecord.displayName ?? '',
      };
      return userDto;
    } catch (err) {
      throw err;
    }
  },
);

export const handleCreateWorkspace = onDocumentCreatedWithAuthContext(
  'workspaces/{workspaceId}',
  async function handler(event) {
    try {
      const snapshot = event.data;
      if (!snapshot) {
        console.log('No data associated with the event');
        return;
      }
      logger.info('AUTH DETAILS', event.authId, event.authType);
      const firestore = getFirestore();
      const workspaceId = event.params.workspaceId;
      const newWorkspace = snapshot.data();
      logger.log('Workspace created:', `Workspace doc id:${workspaceId}`);
      const creatorId = newWorkspace.creatorId;
      const creatorDetailsSnap = await firestore
        .collection('users')
        .doc(newWorkspace.creatorId)
        .get();
      const creatorDetails = creatorDetailsSnap.data();

      if (creatorDetails) {
        logger.log('User found with email', creatorDetails.id);
        const { email, id, name } = creatorDetails;
        const { name: workspaceName, imageUrl } = newWorkspace;
        const workspaceMemberData = {
          emailId: email,
          memberId: id,
          memberName: name,
          role: 'admin',
          workspaceDetails: {
            id: workspaceId,
            name: workspaceName,
            imageUrl,
          },
        };
        const res = await firestore
          .collection('workspace-members')
          .add(workspaceMemberData);
        if (res.id) {
          logger.log('Member added to workspace', res.id);
          return res.id;
        } else {
          logger.log('Unable to add member to workspace', creatorId);
        }
      }
      logger.error('Creator details not found', creatorId);
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
);
