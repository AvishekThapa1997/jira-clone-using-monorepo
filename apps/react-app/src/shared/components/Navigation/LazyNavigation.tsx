import { lazy } from 'react';

const LazyNavigation = lazy(() =>
  import('./BaseNavigations').then((module) => ({ default: module.BaseNavigation })),
);

export { LazyNavigation };
