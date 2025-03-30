import { useGetWorkspaces } from '@/features/workspaces/hooks/useGetWorkspaces';
import { SelectWorkspaceProvider } from '@/features/workspaces/provider/SelectWorkspaceProvider';
import { If } from '../If';
import { LazyDashboard } from './LazyDashboard';

const DashboardRootLayout = () => {
  const { workspaces } = useGetWorkspaces();
  return (
    <SelectWorkspaceProvider>
      <If check={workspaces?.length > 0}>
        <LazyDashboard />
      </If>
    </SelectWorkspaceProvider>
  );
};

export { DashboardRootLayout };
