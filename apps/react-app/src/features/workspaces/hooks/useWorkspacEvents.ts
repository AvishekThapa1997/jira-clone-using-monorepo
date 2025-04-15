import { useEventDispatcher } from '@/shared/hooks/useEventDispatcher';
import { useEventSuscriber } from '@/shared/hooks/useEventSubscriber';
import { CUSTOM_EVENT } from '@jira-clone/core/constants/shared';
import type {
  UseNewWorkspaceSubscriberOptions,
  UseWorkspaceSelectedEventSubscriberOptions,
  WorkspaceEvent,
} from '@jira-clone/core/types';

export const useNewWorkspaceEventDispatcher = () => {
  const { dispatch } = useEventDispatcher<WorkspaceEvent>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
  });
  return dispatch;
};

export const useNewWorkspaceCreatedEventSubscriber = ({
  onWorkspaceCreated,
}: UseNewWorkspaceSubscriberOptions) => {
  useEventSuscriber<WorkspaceEvent>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
    subscriber: onWorkspaceCreated,
  });
};

export const useWorkspaceSelectedEventSubscriber = ({
  onWorkspaceSelected,
}: UseWorkspaceSelectedEventSubscriberOptions) => {
  useEventSuscriber<WorkspaceEvent>({
    eventName: CUSTOM_EVENT.WORKSPACE_SELECTED,
    subscriber: onWorkspaceSelected,
  });
};

export const useWorkspaceSelectedEventDispatcher = () => {
  const { dispatch } = useEventDispatcher<WorkspaceEvent>({
    eventName: CUSTOM_EVENT.WORKSPACE_SELECTED,
  });
  return dispatch;
};
