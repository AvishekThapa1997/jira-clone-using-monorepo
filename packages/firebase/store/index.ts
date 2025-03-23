import { getApp } from "..";

const getFirestore = () =>
  import("./store").then(async ({ getFirestore, ...remaining }) => {
    const app = await getApp();
    return {
      firestore: getFirestore(app),
      ...remaining,
    };
  });

export type GetFirestoreResult = Awaited<ReturnType<typeof getFirestore>>;

export { getFirestore };
