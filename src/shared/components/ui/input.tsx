import * as React from 'react';

import { cn } from '@/shared/util/class';
import { cva } from 'class-variance-authority';

const inputVariants = cva(
  'flex w-full  rounded-md border border-input bg-transparent  text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none ring-1 ring-transparent focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-2.5',
      },
    },
    defaultVariants: {
      variant: 'sm',
    },
  },
);

interface VariantProps {
  variant?: 'sm' | 'lg' | 'md';
}

interface InputProps extends React.ComponentProps<'input'>, VariantProps {
  isError?: boolean;
  errorMessage?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, errorMessage, variant, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            inputVariants({ variant }),
            {
              ' ring-destructive focus-visible:ring-destructive': isError,
            },
            className,
          )}
          ref={ref}
          autoFocus={!!isError}
          {...props}
        />
        {errorMessage && isError && (
          <span className='text-destructive font-medium tracking-wide text-sm'>
            {errorMessage}
          </span>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
