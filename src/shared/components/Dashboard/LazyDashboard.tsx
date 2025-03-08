import { lazy, Suspense } from 'react';
import { DashboardSkeleton } from './DashboardSkeleton';
const Dashboard = lazy(() =>
  import('./Dashboard').then((module) => ({
    default: module.Dashboard,
  })),
);
const LazyDashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
};

export { LazyDashboard };
