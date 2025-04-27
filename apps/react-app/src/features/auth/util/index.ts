import { CONSTANTS } from '@jira-clone/core/constants/auth';
import type { UserDto } from '@jira-clone/core/types';
import { tryCatch } from '@jira-clone/core/utils';
import { getAuth } from '@jira-clone/firebase/auth';

export const getLoggedInUser = async () => {
  try {
    const { auth, onAuthStateChanged } = await getAuth();
    return new Promise<UserDto | null>((res, rej) => {
      const unsuscribe = onAuthStateChanged(auth, function (user) {
        unsuscribe();
        if (user) {
          return res({
            id: user.uid,
            email: user.email,
            name: user.displayName,
          });
        }
        res(null);
      });
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addWorkspaceIdToUrl = (workspaceId: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('#workspace', workspaceId);
  window.history.pushState({}, '', url);
};
