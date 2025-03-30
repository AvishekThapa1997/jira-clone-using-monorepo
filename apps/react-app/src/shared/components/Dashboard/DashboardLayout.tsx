import { Outlet } from 'react-router';
import { MobileNavigation } from '../Navigation/MobileNavigation';
import { Dashboard, DashboardLeft, DashboardRight } from './Dashboard';
import { lazy } from 'react';
const DashboardNavigation = lazy(() =>
  import('./DashboardNavigation').then((module) => ({
    default: module.DashboardNavigation,
  })),
);

const DashboardLayout = () => {
  return (
    <>
      <Dashboard>
        <DashboardLeft>
          <DashboardNavigation />
        </DashboardLeft>
        <DashboardRight>
          <Outlet />
        </DashboardRight>
      </Dashboard>
      <MobileNavigation />
    </>
  );
};

export { DashboardLayout };

