import type { BaseProps } from '@jira-clone/core/types';
import { cn } from '@jira-clone/core/utils';
import { PropsWithChildren } from 'react';
import { AvatarProps } from '../ui/avatar';

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
    <div className={cn('flex gap-4 items-center', className)}>{children}</div>
  );
};

export const AvatarLabel = ({
  className,
  children,
}: BaseProps & PropsWithChildren) => {
  return <p className={className}>{children}</p>;
};
