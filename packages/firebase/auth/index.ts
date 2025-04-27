import { getApp } from "..";

export const getAuth = async () => {
  return import("./auth").then(async ({ getAuth, ...remaining }) => {
    const app = await getApp();
    const auth = getAuth(app);
    return {
      auth,
      ...remaining,
    };
  });
};

export type GetAuthResult = Awaited<ReturnType<typeof getAuth>>;
