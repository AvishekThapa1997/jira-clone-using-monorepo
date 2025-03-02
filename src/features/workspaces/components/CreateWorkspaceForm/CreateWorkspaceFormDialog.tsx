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

interface CreateWorkspaceFormDialogProps
  extends Omit<ComponentProps<typeof Dialog>, 'children'> {
  trigger?: React.ReactNode;
  triggerAsChild?: boolean;
  handleCancel?: () => void;
}

const CreateWorkspaceFormDialog = ({
  trigger,
  triggerAsChild = false,
  onOpenChange,
  handleCancel = () => {},
  ...props
}: CreateWorkspaceFormDialogProps = {}) => {
  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogTrigger asChild={triggerAsChild}>{trigger}</DialogTrigger>
      ) : null}
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className='sr-only'>Create Workspace</DialogTitle>
          <DialogDescription className='sr-only'></DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm
          className='border-0 shadow-none p-0'
          handleCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export { CreateWorkspaceFormDialog };
