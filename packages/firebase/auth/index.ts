import { app } from '..';

export const getAuth = async () => {
  return import('./auth').then(({ getAuth, ...remaining }) => {
    const auth = getAuth(app);
    return {
      auth,
      ...remaining,
    };
  });
};

export type GetAuthResult = Awaited<ReturnType<typeof getAuth>>;
