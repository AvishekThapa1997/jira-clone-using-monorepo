import { lazy } from 'react';

const LazyNavigation = lazy(() =>
  import('./Navigation').then((module) => ({ default: module.Navigation })),
);

export { LazyNavigation };
