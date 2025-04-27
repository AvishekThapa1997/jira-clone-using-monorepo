import { useUserSession } from '@/shared/hooks/useUserSession';
import { useQuery } from '@tanstack/react-query';
import { workspaceQuery } from '../queries';

interface UseGetWorkspacesOptions {
  enabled: boolean;
}

export const useGetWorkspaces = (
  { enabled }: UseGetWorkspacesOptions = { enabled: true },
) => {
  const { user } = useUserSession();
  const { data, ...remaining } = useQuery({
    ...workspaceQuery.getUserWorkspaces(user?.id),
    enabled,
    staleTime: 1 * 60 * 60 * 1000, // 1 hour,
  });
  return { workspaceResult: data, ...remaining };
};
