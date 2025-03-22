import React, { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { CreateWorkspaceForm } from '@/features/workspaces/components/CreateWorkspaceForm/CreateWorkspaceForm';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Show } from '../Show';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

interface ResponsiveDialogProps extends PropsWithChildren {
  trigger?: React.ReactNode;
  triggerAsChild?: React.ReactNode;
  open?: boolean;
  handleOpen?: (open: boolean) => void;
  renderTitle: (
    Comp: typeof DialogTitle | typeof DrawerTitle,
  ) => React.ReactNode;
  renderDescription: (
    Comp: typeof DialogDescription | typeof DrawerDescription,
  ) => React.ReactNode;
}

const ResponsiveDialog = ({
  children,
  handleOpen,
  open,
  trigger,
  triggerAsChild,
  renderDescription,
  renderTitle,
}: ResponsiveDialogProps) => {
  const { isLargeDevice, isExtraLargeDevice } = useScreenSize();

  if (isLargeDevice || isExtraLargeDevice) {
    return (
      <Dialog open={open} onOpenChange={handleOpen}>
        <Show show={!!trigger}>
          <DialogTrigger asChild={!!triggerAsChild}>{trigger}</DialogTrigger>
        </Show>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          {renderTitle(DialogTitle)}
          {renderDescription(DialogDescription)}
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <Show show={!!trigger}>
        <DrawerTrigger asChild={!!triggerAsChild}>{trigger}</DrawerTrigger>
      </Show>
      <DrawerContent>
        {renderTitle(DrawerTitle)}
        {renderDescription(DrawerDescription)}
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export { ResponsiveDialog };
