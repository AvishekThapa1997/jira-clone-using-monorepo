import { useQuery } from '@tanstack/react-query';
import { getWorkspaces } from '../service';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';
import { useUserSession } from '@/shared/hooks/useUserSession';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface UseGetWorkspacesOptions {
  enabled: boolean;
}

export const useGetWorkspaces = (
  { enabled }: UseGetWorkspacesOptions = { enabled: true },
) => {
  const { user } = useUserSession();
  const navigate = useNavigate();
  const { data, ...remaining } = useQuery({
    queryKey: [...WORKSPACES_QUERY_KEYS.getWorkspaces(user.id)],
    queryFn: async () => {
      const result = await getWorkspaces(user?.id);
      if (!result.data || result.data?.length === 0) {
        navigate('/workspaces/create', {
          replace: true,
        });
      }
      return result;
    },
    enabled,
    staleTime: 1 * 60 * 60 * 1000,
  });
  useEffect(() => {});
  return { workspaces: data?.data, ...remaining };
};
