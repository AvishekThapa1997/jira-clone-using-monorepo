import { Button, TextField } from '@radix-ui/themes';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface PasswordInputProps {
  inputProps?: Omit<TextField.RootProps, 'type'>;
  slotProps?: TextField.SlotProps;
}

type PasswordInputType = 'text' | 'password';

const PasswordInput = ({ inputProps, slotProps }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { size, placeholder, ..._inputProps } = inputProps ?? {};
  const { side, gap, ..._slotProps } = slotProps ?? {};
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  console.log({ showPassword });
  const type: PasswordInputType = showPassword ? 'text' : 'password';
  return (
    <TextField.Root
      size={size ?? '2'}
      type={type}
      placeholder={placeholder ?? 'Enter password'}
      {...(_inputProps ? _inputProps : {})}
    >
      <TextField.Slot side='right' gap='2' {...(_slotProps ? _slotProps : {})}>
        <Button
          onClick={handlePasswordVisibility}
          className='cursor-pointer text-gray-800'
          type='button'
          variant='ghost'
        >
          {showPassword ? <EyeOff size='20' /> : <Eye size='20' />}
        </Button>
      </TextField.Slot>
    </TextField.Root>
  );
};

export { PasswordInput };
