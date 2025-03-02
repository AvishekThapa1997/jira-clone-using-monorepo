import { useToast } from '@/shared/hooks/useToast';
import { useUserSession } from '@/shared/hooks/';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createWorkspace } from '../service';
import { CreateWorkspaceSchema } from '../types';

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
    },
    ...(otherOptions ?? {}),
  });
};
