import {
  getFirestore,
  type GetFirestoreResult,
} from "@jira-clone/firebase/store";
import { handleError, parseSchema } from "@jira-clone/core/utils";
import type {
  Result,
  UserDto,
  CreateWorkspaceSchema,
  WorkspaceDto,
} from "@jira-clone/core/types";

import { createWorkspaceSchema } from "@jira-clone/core/schema/workspace";
import { workspaceConverter } from "@jira-clone/firebase/converters/workspace";

const getWorkspaceCollection = (result: GetFirestoreResult) => {
  const { collection, firestore } = result;
  return collection(firestore, "workspaces").withConverter(workspaceConverter);
};

export const createWorkspace = async (
  createWorkspace: Partial<CreateWorkspaceSchema>,
  loggedInUser: UserDto
): Promise<Result<WorkspaceDto, CreateWorkspaceSchema>> => {
  try {
    const firestoreResult = await getFirestore();
    const { serverTimestamp, addDoc, getDoc } = firestoreResult;
    const result = parseSchema(createWorkspaceSchema, createWorkspace);
    if (result.data) {
      const workspaceData: Omit<WorkspaceDto, "id"> = {
        ...result.data,
        creatorId: loggedInUser.id,
        members: [loggedInUser.id],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const workspaceRef = await addDoc(
        getWorkspaceCollection(firestoreResult),
        workspaceData
      );
      if (workspaceRef.id) {
        const workspaceSnap = await getDoc(
          workspaceRef.withConverter(workspaceConverter)
        );
        return {
          data: workspaceSnap.data(),
        };
      }
      throw new Error("Unable to create workspace.Please try again later.");
    }
    return {
      error: {
        code: 422,
        message: "Validation Error",
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
  userId: string
): Promise<Result<WorkspaceDto[]>> => {
  const result: Result<WorkspaceDto[]> = {};

  try {
    const firestoreResult = await getFirestore();
    const { query, where, getDocs, orderBy } = firestoreResult;
    const dbQuery = query(
      getWorkspaceCollection(firestoreResult),
      where("members", "array-contains", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(dbQuery);
    if (querySnapshot.size > 0) {
      const userWorkspaces = Array.from(querySnapshot.docs).map((snapshot) =>
        snapshot.data()
      );
      result.data = userWorkspaces;
    } else {
      result.data = [];
    }
  } catch (err) {
    result.error = handleError(err);
  }
  return result;
};

const _updateWorkspace = async (
  workspaceId: WorkspaceDto["id"],
  newData: Partial<WorkspaceDto>
) => {
  const { updateDoc, doc, firestore } = await getFirestore();
  const docRef = doc(firestore, "workspaces", workspaceId);
  updateDoc(docRef, newData);
};

export const updateWorkspace = async (
  workspaceId: WorkspaceDto["id"],
  newData: CreateWorkspaceSchema
): Promise<Result<void, CreateWorkspaceSchema>> => {
  const result: Result<void> = {};
  try {
    const parsedResult = parseSchema(createWorkspaceSchema, newData);
    if (parsedResult.data) {
      await _updateWorkspace(workspaceId, parsedResult.data);
    }
    return {
      error: {
        code: 422,
        message: "Validation Error",
        validationErrors: result.error?.validationErrors,
      },
    };
  } catch (err) {
    result.error = handleError(err);
  }
  return result;
};
