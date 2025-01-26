import { TextField } from '@radix-ui/themes';

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
  },
  ...SIGNIN_FORM_FIELDS,
];
