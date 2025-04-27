import React, { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
import { LoadingButton } from './LoadingButton';
import { ButtonProps } from './button';
import { cn } from '@jira-clone/core/utils';
import { Input, InputProps } from './input';

const Form = React.forwardRef<HTMLFormElement, ComponentProps<'form'>>(
  ({ children, ...props }, ref) => {
    return (
      <form ref={ref} {...props}>
        {children}
      </form>
    );
  },
);
Form.displayName = 'Form';

const FormSubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, disabled, className, children, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <LoadingButton
        ref={ref}
        disabled={pending || disabled}
        type={type || 'submit'}
        className={cn('w-full tracking-wider text-sm', className)}
        {...props}
      >
        {children}
      </LoadingButton>
    );
  },
);

FormSubmitButton.displayName = 'FormSubmitButton';

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { pending } = useFormStatus();
    return <Input ref={ref} {...props} disabled={pending} />;
  },
);
FormInput.displayName = 'FormInput';

export { Form, FormInput, FormSubmitButton };
