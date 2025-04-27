import { useUserSession } from '@/shared/hooks/useUserSession';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';
import type {
  WorkspaceDto,
  WorkspaceQueryResult,
} from '@jira-clone/core/types';
import { useQueryClient } from '@tanstack/react-query';

export const useGetWorkspaceByIdFromCache = (
  workspaceId?: string,
): (() => WorkspaceDto | undefined) => {
  const queryClient = useQueryClient();
  const { user } = useUserSession();
  return () => {
    const result = queryClient.getQueryData<WorkspaceQueryResult>([
      ...WORKSPACES_QUERY_KEYS.getWorkspaces(user.id),
    ]);
    if (workspaceId) {
      return result.data?.[workspaceId];
    }
  };
};
