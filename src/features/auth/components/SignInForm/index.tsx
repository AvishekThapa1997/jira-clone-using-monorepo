import { Box, Button, TextField } from '@radix-ui/themes';
import { Form } from 'react-router';
import { PasswordInput } from '../PasswordInput';
import { SIGNIN_FORM_FIELDS } from '../../constants';

const SignInForm = () => {
  return (
    <Form>
      <Box className='space-y-4'>
        {SIGNIN_FORM_FIELDS.map(({ label, ...formField }, index) => {
          if (formField.type === 'password') {
            return (
              <Box key={index}>
                <PasswordInput
                  inputProps={{
                    'aria-label': label,
                    ...formField,
                    className: 'text-sm',
                    size: '3',
                  }}
                />
              </Box>
            );
          }
          return (
            <Box key={index}>
              <TextField.Root
                {...formField}
                size='3'
                className='text-sm'
                aria-label={label}
              />
            </Box>
          );
        })}
      </Box>
      <Box className='mt-6'>
        <Button
          className='w-full text-sm tracking-wide cursor-pointer'
          size='3'
        >
          Login
        </Button>
      </Box>
    </Form>
  );
};

export { SignInForm };
