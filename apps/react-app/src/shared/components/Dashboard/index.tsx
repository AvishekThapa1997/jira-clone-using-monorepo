import { SelectWorkspaceProvider } from '@/features/workspaces/provider/SelectWorkspaceProvider';
import { DashboardLayout } from './DashboardLayout';

const DashboardRootLayout = () => {
  return (
    <SelectWorkspaceProvider>
      <DashboardLayout />
    </SelectWorkspaceProvider>
  );
};

export { DashboardRootLayout };
