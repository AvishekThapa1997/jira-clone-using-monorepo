import { app } from '..';

const getFunctions = () =>
  import('./functions').then(({ getFunctions, ...remaining }) => {
    const firebaseFunction = getFunctions(app);
    return {
      firebaseFunction,
      ...remaining,
    };
  });

export { getFunctions };
