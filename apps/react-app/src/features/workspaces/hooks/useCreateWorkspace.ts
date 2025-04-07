import { useUserSession } from '@/shared/hooks/useUserSession';
import { useToast } from '@/shared/hooks/useToast';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import { createWorkspace } from '../service';
import type {
  CreateWorkspaceSchema,
  Result,
  WorkspaceDto,
  WorkspaceQueryResult,
} from '@jira-clone/core/types';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';

export const useCreateWorkspace = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createWorkspace>>,
    Error,
    Partial<CreateWorkspaceSchema>
  >,
) => {
  const { toast } = useToast();
  const { onSuccess, onSettled, ...otherOptions } = options ?? {};
  const { user } = useUserSession();
  const queryClient = useQueryClient();
  const updateCache = useCallback(async (newWorkspace: WorkspaceDto) => {
    const queryKey = [...WORKSPACES_QUERY_KEYS.getWorkspaces(user.id)];
    await queryClient.cancelQueries({ queryKey });
    const previousResult =
      queryClient.getQueryData<WorkspaceQueryResult>(queryKey);
    if (previousResult.data) {
      const updatedResult: WorkspaceQueryResult = {
        allIds: [newWorkspace.id, ...previousResult.allIds],
        data: {
          [newWorkspace.id]: newWorkspace,
          ...previousResult.data,
        },
      };
      queryClient.setQueryData(queryKey, updatedResult);
    }
    queryClient.invalidateQueries({
      queryKey,
    });
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
      const result = args[0];
      toast({
        title: 'Workspace created successfully.',
      });
      onSuccess?.(...args);
      updateCache(result.data);
    },
    onSettled: () => {},
    ...(otherOptions ?? {}),
  });
};
