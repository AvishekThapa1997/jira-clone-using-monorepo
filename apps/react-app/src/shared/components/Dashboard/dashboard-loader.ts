import { getQueryClient } from '@/config/query-client';
import { getLoggedInUser } from '@/features/auth/util';

export const dashboardLoader = async () => {
  const user = await getLoggedInUser();
  if (user?.id) {
    const queryClient = getQueryClient();
    const query = await import('@/features/workspaces/queries').then(
      (module) => module.workspaceQuery,
    );
    const workspacesQuery = query.getUserWorkspaces(user.id);
    const result = await queryClient.ensureQueryData(workspacesQuery);
    return result;
  }
};
