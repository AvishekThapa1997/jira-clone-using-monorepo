import { InputProps } from '@chakra-ui/react';

export const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 16,
};

export const SIGNIN_FORM_FIELDS: Array<InputProps> = [
  {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Enter email',
    'aria-label': 'email',
    size: 'xl',
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    placeholder: 'Enter password',
    'aria-label': 'password',
    size: 'xl',
  },
];

export const SIGNUP_FORM_FIELDS: Array<InputProps> = [
  {
    type: 'text',
    required: true,
    'aria-label': 'username',
    placeholder: 'Enter name',
    name: 'name',
    size: 'lg',
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
