import { Outlet } from 'react-router';
import {
  DashboardLayout,
  DashboardLeft,
  DashboardRight,
} from './DashboardLayout';

import { SelectWorkspaceProvider } from '@/features/workspaces/provider/SelectWorkspaceProvider';
import { ReactQueryClientProvider } from '@/shared/provider/ReactQueryClientProvider';
import { lazy } from 'react';
import { MobileNavigation } from '../Navigation/MobileNavigation';

const DashboardNavigation = lazy(() =>
  import('./DashboardNavigation').then((module) => ({
    default: module.DashboardNavigation,
  })),
);
const Dashboard = () => {
  return (
    <ReactQueryClientProvider>
      <SelectWorkspaceProvider>
        <DashboardLayout>
          <DashboardLeft>
            <DashboardNavigation />
          </DashboardLeft>
          <DashboardRight>
            <Outlet />
          </DashboardRight>
        </DashboardLayout>
        <MobileNavigation />
      </SelectWorkspaceProvider>
    </ReactQueryClientProvider>
  );
};

export { Dashboard };
