import { useEventDispatcher } from '@/shared/hooks/useEventDispatcher';
import { CUSTOM_EVENT } from '@jira-clone/core/constants/shared';
import type { WorkspaceCreatedEvent } from '@jira-clone/core/types';

export const useNewWorkspaceDispatcher = () => {
  const { dispatch } = useEventDispatcher<WorkspaceCreatedEvent>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
  });
  return dispatch;
};
