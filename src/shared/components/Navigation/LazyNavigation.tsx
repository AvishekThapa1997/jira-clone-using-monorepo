import { lazy } from 'react';

const LazyNavigation = lazy(() =>
  import('./index').then((module) => ({ default: module.Navigation })),
);

export { LazyNavigation };
