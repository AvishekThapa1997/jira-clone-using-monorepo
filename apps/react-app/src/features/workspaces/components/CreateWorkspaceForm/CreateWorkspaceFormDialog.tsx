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

interface CreateWorkspaceFormDialogProps {
  trigger?: React.ReactNode;
  triggerAsChild?: boolean;
  handleCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CreateWorkspaceFormDialog = ({
  trigger,
  triggerAsChild = false,
  onOpenChange,
  handleCancel = () => {},
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
      <CreateWorkspaceForm handleCancel={handleCancel} />
    </ResponsiveDialog>
  );
};

export { CreateWorkspaceFormDialog };
