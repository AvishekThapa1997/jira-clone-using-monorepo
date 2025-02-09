import { Button, ButtonProps } from '@mui/material';

const LoadingButton = ({
  children,
  loading,
  disabled,
  loadingIndicator,
  variant = 'contained',
  size = 'large',
  loadingPosition = 'start',
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      loading={loading}
      loadingIndicator={loadingIndicator}
      loadingPosition={loadingPosition}
    >
      {children}
    </Button>
  );
};

export { LoadingButton };
