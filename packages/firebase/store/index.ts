import { app } from '..';

const getFirestore = () =>
  import('./store').then(({ getFirestore, ...remaining }) => ({
    firestore: getFirestore(app),
    ...remaining,
  }));

export type GetFirestoreResult = Awaited<ReturnType<typeof getFirestore>>;

export { getFirestore };
