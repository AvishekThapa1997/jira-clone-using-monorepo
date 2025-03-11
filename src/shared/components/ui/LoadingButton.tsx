import { cn } from '@jira-clone/core/utils';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';

const LoadingButton = ({
  children,
  disabled,
  size = 'default',
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
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
};

export { LoadingButton };
