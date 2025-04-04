import { useQuery } from '@tanstack/react-query';
import { getWorkspaces } from '../service';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';
import { useUserSession } from '@/shared/hooks/useUserSession';

export const useGetWorkspaces = (enabled: boolean = false) => {
  const { user } = useUserSession();
  const { data, ...remaining } = useQuery({
    queryKey: [...WORKSPACES_QUERY_KEYS.getWorkspaces(user.id)],
    queryFn: () => getWorkspaces(user?.id),
    enabled,
    staleTime: 1 * 60 * 60 * 1000,
  });
  return { workspaces: data?.data, ...remaining };
};
