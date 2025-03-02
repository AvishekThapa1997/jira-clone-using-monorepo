import { lazy, Suspense } from 'react';

import { WorkspaceSwitcherSkeleton } from './WorkspaceSwitcherSkeleton';

const WorkspaceSwitcherSection = lazy(() =>
  import('./WorkspaceSwitcherSection').then((module) => ({
    default: module.WorkspaceSwitcherSection,
  })),
);

const WorkspaceSwitchWrapper = () => {
  return (
    <Suspense fallback={<WorkspaceSwitcherSkeleton />}>
      <WorkspaceSwitcherSection />
    </Suspense>
  );
};

export { WorkspaceSwitchWrapper };
