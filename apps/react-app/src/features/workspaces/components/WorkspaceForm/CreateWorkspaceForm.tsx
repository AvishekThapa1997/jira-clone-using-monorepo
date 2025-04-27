import { useCreateWorkspace } from '../../hooks/useCreateWorkspace';
import type {
  CreateWorkspaceFormProps,
  HandleWorkspaceFormSubmit,
} from '../../types';
import { WorkspaceForm } from './WorkspaceForm';

const CreateWorkspaceForm = ({
  className,
  handleCancel,
  onWorkspaceCreated,
  selectedWorkspace,
  ...props
}: CreateWorkspaceFormProps) => {
  const { mutate, isPending, data } = useCreateWorkspace(undefined, {
    onSuccess: (result) => {
      onWorkspaceCreated?.(result.data);
    },
  });

  const handleSumbit: HandleWorkspaceFormSubmit = (event, options) => {
    const formData = Object.fromEntries(
      new FormData(event.target as HTMLFormElement).entries(),
    );
    mutate(formData, {
      onSuccess: (data) => {
        options?.onSuccess?.(data as any);
      },
    });
  };

  return (
    <WorkspaceForm
      className={className}
      handleCancel={handleCancel}
      onWorkspaceCreated={onWorkspaceCreated}
      handleSubmit={handleSumbit}
      errors={data?.error?.validationErrors}
      isSubmitting={isPending}
      {...props}
    />
  );
};

export { CreateWorkspaceForm };
