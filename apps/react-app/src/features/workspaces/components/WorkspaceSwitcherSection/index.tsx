import { lazy, Suspense } from 'react';

import { WorkspaceSwitcherSkeleton } from './WorkspaceSwitcherSkeleton';

const WorkspaceSwitcher = lazy(() =>
  import('./WorkspaceSwitcher').then((module) => ({
    default: module.WorkspaceSwitcher,
  })),
);

const WorkspaceSwitchSection = () => {
  return (
    <Suspense fallback={<WorkspaceSwitcherSkeleton />}>
      <WorkspaceSwitcher />
    </Suspense>
  );
};

export { WorkspaceSwitchSection };
