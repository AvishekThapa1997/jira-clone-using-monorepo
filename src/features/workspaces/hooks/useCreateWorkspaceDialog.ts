import { useDialog } from '@/shared/hooks/useDialog';

interface UseCreateWorkspaceDialogOptions {
  onCancel?: () => void;
}

export const useCreateWorkspaceDialog = (
  options?: UseCreateWorkspaceDialogOptions,
) => {
  const { close, handleOpenChange, isOpen } = useDialog();
  const handleCancel = () => {
    close();
    options?.onCancel?.();
  };

  return {
    isCreateWorkspaceDialogOpen: isOpen,
    handleCreateWorkspaceDialogOpenChange: handleOpenChange,
    handleCreateWorkspaceDialogCancel: handleCancel,
    closeCreateWorkspaceDialog: close,
  };
};
