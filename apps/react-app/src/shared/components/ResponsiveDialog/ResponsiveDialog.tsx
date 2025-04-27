import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { DialogTrigger } from '@radix-ui/react-dialog';
import React, { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { If } from '../If';

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
        <If check={!!trigger}>
          <DialogTrigger asChild={!!triggerAsChild}>{trigger}</DialogTrigger>
        </If>
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
      <If check={!!trigger}>
        <DrawerTrigger asChild={!!triggerAsChild}>{trigger}</DrawerTrigger>
      </If>
      <DrawerContent>
        {renderTitle(DrawerTitle)}
        {renderDescription(DrawerDescription)}
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export { ResponsiveDialog };
