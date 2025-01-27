import { TextField } from '@radix-ui/themes';

export const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 16,
};

export const SIGNIN_FORM_FIELDS: Array<
  TextField.RootProps & { label: string }
> = [
  {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Enter email',
    label: 'email',
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    placeholder: 'Enter password',
    minLength: PASSWORD_LENGTH.MIN,
    maxLength: PASSWORD_LENGTH.MAX,
    label: 'password',
  },
];

export const SIGNUP_FORM_FIELDS: Array<
  TextField.RootProps & { label: string }
> = [
  {
    type: 'text',
    required: true,
    label: 'username',
    placeholder: 'Enter name',
    name: 'name',
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
