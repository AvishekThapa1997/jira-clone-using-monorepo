import { Outlet } from 'react-router';
import {
  DashboardLayout,
  DashboardLeft,
  DashboardRight,
} from './DashboardLayout';

import { lazy, Suspense } from 'react';
import { MobileNavigation } from '../Navigation/MobileNavigation';
import { DashboardLeftSkeleton } from './DashboardSkeleton';

const DashboardNavigation = lazy(() =>
  import('./DashboardNavigation').then((module) => ({
    default: module.DashboardNavigation,
  })),
);
const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardLeft>
          <Suspense fallback={<DashboardLeftSkeleton />}>
            <DashboardNavigation />
          </Suspense>
        </DashboardLeft>
        <DashboardRight>
          <Outlet />
        </DashboardRight>
      </DashboardLayout>
      <MobileNavigation />
    </>
  );
};

export { Dashboard };
