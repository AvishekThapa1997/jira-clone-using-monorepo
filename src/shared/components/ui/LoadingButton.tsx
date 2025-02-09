import { ButtonProps, Button } from '@chakra-ui/react';

const LoadingButton = ({
  children,
  loading,
  disabled,
  colorPalette = 'blue',
  variant = 'solid',
  size = 'xl',
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      colorPalette={colorPalette}
      variant={variant}
      size={size}
      letterSpacing={2}
    >
      {children}
    </Button>
  );
};

export { LoadingButton };
