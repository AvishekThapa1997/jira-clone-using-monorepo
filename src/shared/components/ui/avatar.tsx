import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@jira-clone/core/utils';
import { BaseProps } from '@jira-clone/core/types';

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

interface AvatarStatusProps extends BaseProps {
  render?: (status: ImageLoadingStatus) => React.ReactNode;
}

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> &
    AvatarStatusProps
>(({ className, children, render, ...props }, ref) => {
  const { loadingStatus } = useAvatarLoadingStatus();
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    >
      {render ? render(loadingStatus) : children}
    </AvatarPrimitive.Fallback>
  );
});

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarTextInitialProps extends BaseProps {
  text: string;
}

export const AvatarTextInitial = ({
  className,
  text,
}: AvatarTextInitialProps) => {
  const textInitials = text.length > 1 ? text.slice(0, 2) : text;
  return (
    <p className={cn('uppercase tracking-wider', className)}>{textInitials}</p>
  );
};
export { Avatar, AvatarImage, AvatarFallback };
