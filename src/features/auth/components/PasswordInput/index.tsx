import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

import { useState } from 'react';

type PasswordInputType = 'text' | 'password';

type PasswordInputProps = Omit<TextFieldProps, 'type'>;

export const PasswordInput = ({ slotProps, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType: PasswordInputType = showPassword ? 'text' : 'password';
  const Icon = showPassword ? VisibilityIcon : VisibilityOffIcon;
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { input, ...remainingSlotProps } = slotProps ?? {};
  return (
    <TextField
      {...props}
      type={inputType}
      slotProps={{
        input: {
          ...(input ? input : {}),
          ...(remainingSlotProps ? remainingSlotProps : {}),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                type='button'
                onClick={handlePasswordVisibility}
                disabled={props.disabled}
              >
                <Icon color='action' />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
