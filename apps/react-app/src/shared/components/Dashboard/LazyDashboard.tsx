import { lazy, Suspense } from 'react';
import { DashboardSkeleton } from './DashboardSkeleton';
const DashboardLayout = lazy(() =>
  import('./DashboardLayout').then((module) => ({
    default: module.DashboardLayout,
  })),
);
const LazyDashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLayout />
    </Suspense>
  );
};

export { LazyDashboard };
