import { TextFieldProps } from '@mui/material';

export const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 16,
};

export const SIGNIN_FORM_FIELDS: Array<TextFieldProps> = [
  {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Enter email',
    'aria-label': 'email',
    hiddenLabel: true,
    fullWidth: true,
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    placeholder: 'Enter password',
    'aria-label': 'password',
    fullWidth: true,
    slotProps: {
      // htmlInput: {
      //   minLength: PASSWORD_LENGTH.MIN,
      //   maxLength: PASSWORD_LENGTH.MAX,
      // },
    },
  },
];

export const SIGNUP_FORM_FIELDS: Array<TextFieldProps> = [
  {
    type: 'text',
    required: true,
    'aria-label': 'username',
    placeholder: 'Enter name',
    name: 'name',
    fullWidth: true,
  },
  ...SIGNIN_FORM_FIELDS,
];

// constants.js
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Invalid email address',
  NAME_REQUIRED: 'Name is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MAX_LENGTH: 'Password must be at most 16 characters long',
  PASSWORD_REQUIRED: 'Password is required',
  EMAIL_REQUIRED: 'Email is required',
  NAME_MIN_LENGTH: 'Name must be at least 1 character long',
};
