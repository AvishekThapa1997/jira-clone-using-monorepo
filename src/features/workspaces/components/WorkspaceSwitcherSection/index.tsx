import { lazy, Suspense } from 'react';

import { WorkspaceSwitcherSkeleton } from './WorkspaceSwitcherSkeleton';

const WorkspaceSwitcher = lazy(() =>
  import('./WorkspaceSwitcher').then((module) => ({
    default: module.WorkspaceSwitcher,
  })),
);

const WorkspaceSwitchSection = () => {
  return (
    <div className='hidden lg:block'>
      <Suspense fallback={<WorkspaceSwitcherSkeleton />}>
        <WorkspaceSwitcher />
      </Suspense>
    </div>
  );
};

export { WorkspaceSwitchSection };
