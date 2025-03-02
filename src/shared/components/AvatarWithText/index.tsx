import { cn } from '@/shared/util/class';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
  ImageLoadingStatus,
} from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { useState } from 'react';

interface AvatarWithTextProps {
  src?: string;
  text: string;
  className?: string;
  renderAvatar?: React.ReactNode;
  renderText?: React.ReactNode;
  renderFallback?: React.ReactNode;
  avatarProps?: AvatarProps;
}

const AvatarWithText = ({
  src,
  text,
  className,
  renderAvatar,
  renderText,
  avatarProps = {},
}: AvatarWithTextProps) => {
  const [avatarLoadingStatus, setAvatarLoadingStatus] =
    useState<ImageLoadingStatus>();
  const textInitials = text.length > 1 ? text.slice(0, 2) : text;
  return (
    <div className={cn('flex gap-4 items-center', className)}>
      {!renderAvatar ? (
        <Avatar className={cn(avatarProps?.baseClasses)}>
          <AvatarImage
            src={src}
            className={cn(avatarProps?.imageClasses)}
            onLoadingStatusChange={(status) => {
              setAvatarLoadingStatus(status);
            }}
          />

          <AvatarFallback className={cn(avatarProps?.fallbackClasses)}>
            {avatarLoadingStatus === 'loading' ? (
              <Skeleton className='h-full w-full' />
            ) : null}
            {avatarLoadingStatus === 'error' ? (
              <span className='uppercase tracking-wider'>{textInitials}</span>
            ) : null}
          </AvatarFallback>
        </Avatar>
      ) : (
        renderAvatar
      )}
      {!renderText ? <p className=''>{text}</p> : renderText}
    </div>
  );
};

export { AvatarWithText };
