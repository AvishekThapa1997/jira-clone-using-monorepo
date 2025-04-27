import { getApp } from "..";

const getFunctions = () =>
  import("./functions").then(async ({ getFunctions, ...remaining }) => {
    const app = await getApp();
    const firebaseFunction = getFunctions(app);
    return {
      firebaseFunction,
      ...remaining,
    };
  });

export { getFunctions };
