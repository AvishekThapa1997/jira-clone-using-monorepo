import { cn } from '@jira-clone/core/utils';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, size = 'default', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={disabled}
        className={cn('justify-center relative', className)}
        size={size}
      >
        {disabled && <Loader2 className='animate-spin absolute' />}
        <span
          className={cn({
            invisible: disabled,
          })}
        >
          {children}
        </span>
      </Button>
    );
  },
);

export { LoadingButton };
