import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import * as functions from 'firebase-functions/v1';
import { onCall } from 'firebase-functions/v2/https';
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

export interface SignUpUserPayload {
  email: string;
  password: string;
  name: string;
}
export interface UserDto {
  id: string;
  email?: string;
  name?: string;
}

export const signUpUser = onCall<SignUpUserPayload, Promise<UserDto>>(
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
        email: userRecord.email,
        name: userRecord.displayName,
      };
      return userDto;
    } catch (err) {
      throw err;
    }
  },
);
