import { useEventSuscriber } from '@/shared/hooks/useEventSubscriber';
import { CUSTOM_EVENT } from '@jira-clone/core/constants/shared';
import type { WorkspaceCreatedEvent } from '@jira-clone/core/types';

interface UseNewWorkspaceSubscriberOptions {
  subscriber: (event: WorkspaceCreatedEvent) => void;
}

export const useNewWorkspaceSubscriber = ({
  subscriber,
}: UseNewWorkspaceSubscriberOptions) => {
  useEventSuscriber<WorkspaceCreatedEvent>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
    subscriber,
  });
};
