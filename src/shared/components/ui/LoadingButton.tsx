import { Button, ButtonProps, Spinner } from '@radix-ui/themes';

const LoadingButton = ({
  children,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <Button {...props} disabled={disabled}>
      <Spinner loading={!!loading} />
      {children}
    </Button>
  );
};

export { LoadingButton };
