import { getFirestore } from '@/config/firebase';
import { handleError } from '@/shared/util/handleError';
import { parseSchema } from '@/shared/util/parseSchema';
import { Result, UserDto } from '@/types/types';
import { workspaceConverter, WorkspaceDto } from '../dto/workspace-dto';
import {
  workspaceMemberConverter,
  WorkspaceMemberDto,
} from '../dto/workspace-member-dto';
import { createWorkspaceSchema } from '../schema';
import { CreateWorkspaceSchema, WorkspaceMemberRole } from '../types';

type GetFirestoreReturnResult = Awaited<ReturnType<typeof getFirestore>>;

const getWorkspaceCollection = (result: GetFirestoreReturnResult) => {
  const { collection, firestore } = result;
  return collection(firestore, 'workspaces').withConverter(workspaceConverter);
};

const getWorkspaceMemberCollection = (result: GetFirestoreReturnResult) => {
  const { collection, firestore } = result;
  return collection(firestore, 'workspace-members').withConverter(
    workspaceMemberConverter,
  );
};

export const createWorkspace = async (
  createWorkspace: Partial<CreateWorkspaceSchema>,
  loggedInUser: UserDto,
): Promise<Result<boolean, CreateWorkspaceSchema>> => {
  try {
    const firestoreResult = await getFirestore();
    const { firestore, writeBatch, doc, serverTimestamp } = firestoreResult;
    const result = parseSchema(createWorkspaceSchema, createWorkspace);
    if (result.data) {
      const workspaceData: CreateWorkspaceSchema = {
        ...result.data,
        creatorId: loggedInUser.id,
        adminMembers: [loggedInUser.id],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const batch = writeBatch(firestore);
      const workspaceRef = doc(getWorkspaceCollection(firestoreResult));
      const workspaceMemberData: WorkspaceMemberDto = {
        emailId: loggedInUser.email,
        memberId: loggedInUser.id,
        memberName: loggedInUser.name,
        workspaceDetails: {
          id: workspaceRef.id,
          name: workspaceData.name,
          imageUrl: workspaceData.imageUrl ?? '',
        },
        role: WorkspaceMemberRole.ADMIN,
      };
      const workspaceMemberRef = doc(
        getWorkspaceMemberCollection(firestoreResult),
      );
      batch.set(workspaceRef, workspaceData);
      batch.set(workspaceMemberRef, workspaceMemberData);
      await batch.commit();
      return {
        data: true,
      };
    }
    return {
      error: {
        code: 422,
        message: 'Validation Error',
        validationErrors: result.errors,
      },
    };
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
};

export const getWorkspaces = async (
  userId: string,
): Promise<Result<WorkspaceDto[]>> => {
  const result: Result<WorkspaceDto[]> = {};

  try {
    const firestoreResult = await getFirestore();
    const { query, where, getDocs } = firestoreResult;
    const dbQuery = query(
      getWorkspaceCollection(firestoreResult),
      where('creatorId', '==', userId),
    );
    const querySnapshot = await getDocs(dbQuery);
    if (querySnapshot.size > 0) {
      const workspaces = Array.from(querySnapshot.docs).map((snapshot) =>
        snapshot.data(),
      );
      result.data = workspaces;
    }
  } catch (err) {
    result.error = handleError(err);
  }
  return result;
};
