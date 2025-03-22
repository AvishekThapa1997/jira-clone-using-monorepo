import { useUserSession } from '@/shared/hooks/useUserSession';
import { useToast } from '@/shared/hooks/useToast';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import { createWorkspace } from '../service';
import type { CreateWorkspaceSchema } from '@jira-clone/core/types';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';

export const useCreateWorkspace = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createWorkspace>>,
    Error,
    Partial<CreateWorkspaceSchema>
  >,
) => {
  const { toast } = useToast();
  const { onSuccess, ...otherOptions } = options ?? {};
  const { user } = useUserSession();
  const queryClient = useQueryClient();
  const updateCache = useCallback(() => {
    const queryKey = [...WORKSPACES_QUERY_KEYS.getWorkspaces(user.id)];
    queryClient.invalidateQueries({
      queryKey,
    });
    // queryClient.cancelQueries({
    //   queryKey,
    // });
    // const previousData =
    //   queryClient.getQueryData<Result<WorkspaceDto[]>>(queryKey);
    // if (!result.data) {
    //   return;
    // }
    // let workspaces: WorkspaceDto[] = [];
    // if (previousData) {
    //   const previousWorkspaces = previousData.data ?? [];
    //   workspaces.push(result.data, ...previousWorkspaces);
    // } else {
    //   workspaces.push(result.data);
    // }
    // queryClient.setQueryData<Result<WorkspaceDto[]>>(queryKey, {
    //   ...previousData,
    //   data: workspaces,
    // });
  }, []);
  return useMutation<
    Awaited<ReturnType<typeof createWorkspace>>,
    Error,
    Partial<CreateWorkspaceSchema>
  >({
    mutationFn: ({ name, imageUrl }) => {
      return createWorkspace({ name, imageUrl }, user);
    },
    onSuccess: (...args) => {
      toast({
        title: 'Workspace created successfully.',
      });
      onSuccess?.(...args);
      updateCache();
    },
    ...(otherOptions ?? {}),
  });
};
