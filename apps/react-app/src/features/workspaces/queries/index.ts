import { WORKSPACE_CONSTANTS } from '@jira-clone/core/constants/workspace';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';
import type {
  WorkspaceDto,
  WorkspaceQueryResult,
} from '@jira-clone/core/types';
import { UseQueryOptions } from '@tanstack/react-query';
import { getWorkspaces } from '../service';

export const workspaceQuery = {
  getUserWorkspaces: (
    userId: string,
  ): UseQueryOptions<WorkspaceQueryResult> => {
    return {
      queryKey: [...WORKSPACES_QUERY_KEYS.getWorkspaces(userId)],
      queryFn: async () => {
        const result = await getWorkspaces(userId);
        const lastSelectedWorkspace = localStorage.getItem(
          WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
        );
        const workspaces = result.data;
        let _selectedWorkspace: WorkspaceDto;
        if (!lastSelectedWorkspace && workspaces?.length > 0) {
          _selectedWorkspace = workspaces.at(-1);
          localStorage.setItem(
            WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
            JSON.stringify(_selectedWorkspace),
          );
        }
        const workspaceIds = [];
        const workspaceRecord: Record<string, WorkspaceDto> = {};
        result.data?.forEach((workspace) => {
          workspaceIds.push(workspace.id);
          workspaceRecord[workspace.id] = workspace;
        });
        return {
          allIds: workspaceIds,
          data: workspaceRecord,
        };
      },
    };
  },
};
