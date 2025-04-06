import type { BaseProps } from '@jira-clone/core/types';
import { cn } from '@jira-clone/core/utils';
import { PropsWithChildren } from 'react';
import { AvatarProps } from '../ui/avatar';
import { Box } from '../ui/box';
import { Text } from '../ui/text';

interface AvatarWithTextProps {
  src?: string;
  text: string;
  className?: string;
  renderAvatar?: React.ReactNode;
  renderText?: React.ReactNode;
  renderFallback?: React.ReactNode;
  avatarProps?: AvatarProps;
}

export const AvatarWithLabel = ({
  className,
  children,
}: BaseProps & PropsWithChildren) => {
  return (
    <Box className={cn('flex gap-4 items-center', className)}>{children}</Box>
  );
};

export const AvatarLabel = ({
  className,
  children,
}: BaseProps & PropsWithChildren) => {
  return <Text className={className}>{children}</Text>;
};
