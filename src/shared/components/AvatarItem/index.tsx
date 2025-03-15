import React, { type PropsWithChildren } from 'react';
import { Box } from '../ui/box';
import type { BaseProps } from '@jira-clone/core/types';
import { cn } from '@jira-clone/core/utils';

interface AvatarItemProps extends BaseProps {
  avatar: React.ReactNode;
  text: React.ReactNode;
}

const AvatarItem = ({ className, avatar, text }: AvatarItemProps) => {
  return (
    <Box className={cn('flex gap-2 items-center', className)}>
      {avatar}
      {text}
    </Box>
  );
};

const AvatarItemText = ({
  className,
  children,
}: BaseProps & PropsWithChildren) => {
  return <p className={className}>{children}</p>;
};

export { AvatarItem, AvatarItemText };
