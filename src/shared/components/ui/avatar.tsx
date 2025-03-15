import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@jira-clone/core/utils';
import type { BaseProps } from '@jira-clone/core/types';
import { Show } from '../Show';
import { Skeleton } from './skeleton';

export interface AvatarProps {
  baseClasses?: string;
  imageClasses?: string;
  fallbackClasses?: string;
}

type ImageLoadingStatus = Parameters<
  React.ComponentProps<typeof AvatarPrimitive.Image>['onLoadingStatusChange']
>[0];
type AvatarContext = {
  loadingStatus: ImageLoadingStatus;
  setLoadingStatus: React.Dispatch<ImageLoadingStatus>;
};

const AvatarContext = React.createContext<AvatarContext | null>(null);

const useAvatarLoadingStatus = () => {
  const avatarLoadingResult = React.useContext(AvatarContext);
  if (!avatarLoadingResult) {
    throw new Error('useAvatarLoadingStatus must be used with AvatarContext');
  }
  return avatarLoadingResult;
};

const AvatarProvider = ({ children }: React.PropsWithChildren) => {
  const [loadingStatus, setLoadingStatus] =
    React.useState<ImageLoadingStatus>('idle');
  return (
    <AvatarContext.Provider
      value={{
        loadingStatus,
        setLoadingStatus,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarProvider>
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  </AvatarProvider>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  const { setLoadingStatus } = useAvatarLoadingStatus();
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
      onLoadingStatusChange={setLoadingStatus}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
});

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarLoading = ({ children }: React.PropsWithChildren) => {
  const { loadingStatus } = useAvatarLoadingStatus();
  return (
    <Show show={loadingStatus === 'loading'}>
      {children ?? <Skeleton className='h-full w-full' />}
    </Show>
  );
};

AvatarLoading.displayName = 'AvatarLoading';

const AvatarError = ({ children }: React.PropsWithChildren) => {
  const { loadingStatus } = useAvatarLoadingStatus();
  return <Show show={loadingStatus === 'error'}>{children}</Show>;
};

AvatarError.displayName = 'AvatarError';

export { Avatar, AvatarImage, AvatarFallback, AvatarLoading, AvatarError };
