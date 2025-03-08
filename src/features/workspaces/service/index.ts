import { getFirestore } from '@/config/firebase';
import { handleError } from '@/shared/util/handleError';
import { parseSchema } from '@/shared/util/parseSchema';
import { Result, UserDto } from '@/types/types';

import { workspaceConverter, WorkspaceDto } from '../dto/workspace-dto';
import { createWorkspaceSchema } from '../schema';
import { CreateWorkspaceSchema } from '../types';

type GetFirestoreReturnResult = Awaited<ReturnType<typeof getFirestore>>;

const getWorkspaceCollection = (result: GetFirestoreReturnResult) => {
  const { collection, firestore } = result;
  return collection(firestore, 'workspaces').withConverter(workspaceConverter);
};

export const createWorkspace = async (
  createWorkspace: Partial<CreateWorkspaceSchema>,
  loggedInUser: UserDto,
): Promise<Result<WorkspaceDto, CreateWorkspaceSchema>> => {
  try {
    const firestoreResult = await getFirestore();
    const { serverTimestamp, addDoc, getDoc } = firestoreResult;
    const result = parseSchema(createWorkspaceSchema, createWorkspace);
    if (result.data) {
      const workspaceData: CreateWorkspaceSchema = {
        ...result.data,
        creatorId: loggedInUser.id,
        members: [loggedInUser.id],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const workspaceRef = await addDoc(
        getWorkspaceCollection(firestoreResult),
        workspaceData,
      );
      if (workspaceRef.id) {
        const workspaceSnap = await getDoc(
          workspaceRef.withConverter(workspaceConverter),
        );
        return {
          data: workspaceSnap.data(),
        };
      }
      throw new Error('Unable to create workspace.Please try again later.');
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
    const { query, where, getDocs, orderBy } = firestoreResult;
    const dbQuery = query(
      getWorkspaceCollection(firestoreResult),
      where('members', 'array-contains', userId),
      orderBy('createdAt', 'desc'),
    );
    const querySnapshot = await getDocs(dbQuery);
    if (querySnapshot.size > 0) {
      const userWorkspaces = Array.from(querySnapshot.docs).map((snapshot) =>
        snapshot.data(),
      );
      result.data = userWorkspaces;
    }
  } catch (err) {
    result.error = handleError(err);
  }
  return result;
};
