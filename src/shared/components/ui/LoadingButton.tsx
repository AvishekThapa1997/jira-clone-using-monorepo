import { cn } from '@/shared/util/class';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';

const LoadingButton = ({
  children,
  disabled,
  size = 'lg',
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={cn(className)}
      size={size}
    >
      {disabled && <Loader2 className='animate-spin ' />}
      {children}
    </Button>
  );
};

export { LoadingButton };
