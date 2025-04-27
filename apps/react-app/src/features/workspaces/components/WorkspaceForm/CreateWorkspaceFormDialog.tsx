import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import React, { ComponentProps } from 'react';
import { CreateWorkspaceForm } from './CreateWorkspaceForm';
import { ResponsiveDialog } from '@/shared/components/ResponsiveDialog/ResponsiveDialog';
import { Card, CardContent } from '@/shared/components/ui/card';
import { WorkspaceDto } from '@jira-clone/core/types';

interface CreateWorkspaceFormDialogProps {
  trigger?: React.ReactNode;
  triggerAsChild?: boolean;
  handleCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onWorkspacedCreated?: (workspace: WorkspaceDto) => void;
}

const CreateWorkspaceFormDialog = ({
  trigger,
  triggerAsChild = false,
  onOpenChange,
  handleCancel = () => {},
  onWorkspacedCreated,
  open,
}: CreateWorkspaceFormDialogProps) => {
  return (
    <ResponsiveDialog
      triggerAsChild={triggerAsChild}
      trigger={trigger}
      open={open}
      handleOpen={onOpenChange}
      renderTitle={(Comp) => <Comp>Create workspace</Comp>}
      renderDescription={(Comp) => <Comp className='sr-only' />}
    >
      <CreateWorkspaceForm
        handleCancel={handleCancel}
        onWorkspaceCreated={onWorkspacedCreated}
      />
    </ResponsiveDialog>
  );
};

export { CreateWorkspaceFormDialog };
