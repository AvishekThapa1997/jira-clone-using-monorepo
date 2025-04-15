import { useToast } from '@/shared/hooks/useToast';
import { useUserSession } from '@/shared/hooks/useUserSession';
import { WORKSPACES_QUERY_KEYS } from '@jira-clone/core/keys/workspace';
import type {
  CreateWorkspaceSchema,
  WorkspaceDto,
  WorkspaceQueryResult,
} from '@jira-clone/core/types';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import { createWorkspace, updateWorkspace } from '../service';

type CreateWorkspaceResult = Awaited<ReturnType<typeof createWorkspace>>;
type UpdateWorkspaceResult = Awaited<ReturnType<typeof updateWorkspace>>;

const isCreatingWorkspace = (
  result: CreateWorkspaceResult | UpdateWorkspaceResult,
): result is CreateWorkspaceResult => {
  return (result as CreateWorkspaceResult).data?.id !== 'undefined';
};

export const useCreateWorkspace = (
  selectedWorkspace?: WorkspaceDto,
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
    if (previousResult?.data) {
      const workspacePreviousData = selectedWorkspace?.id
        ? previousResult?.data?.[newWorkspace.id]
        : null;
      const updatedData = {
        [newWorkspace.id]: workspacePreviousData
          ? { ...workspacePreviousData, newWorkspace }
          : newWorkspace,
        ...previousResult.data,
      };
      const updatedResult: WorkspaceQueryResult = {
        data: updatedData,
        allIds: Object.keys(updatedData),
      };
      queryClient.setQueryData(queryKey, updatedResult);
    }
    queryClient.invalidateQueries({
      queryKey,
    });
  }, []);
  return useMutation<
    Awaited<ReturnType<typeof createWorkspace | typeof updateWorkspace>>,
    Error,
    Partial<CreateWorkspaceSchema>
  >({
    mutationFn: ({ name, imageUrl }) => {
      return selectedWorkspace?.id
        ? updateWorkspace(selectedWorkspace.id, { name, imageUrl })
        : createWorkspace({ name, imageUrl }, user);
    },
    onSuccess: (result, ...args) => {
      if (isCreatingWorkspace(result)) {
        if (result.data?.id) {
          toast({
            title: 'Workspace created successfully.',
          });
          onSuccess?.(result, ...args);
          updateCache(result.data);
        } else {
          toast({
            title: 'Unable to create workspace.Please try again later.',
          });
        }
      } else if (result.error) {
        toast({
          title: 'Unable to update workspace.Please try again later.',
        });
      }
    },
    ...(otherOptions ?? {}),
  });
};
