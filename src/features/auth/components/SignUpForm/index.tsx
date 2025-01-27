import { Box, Button, TextField } from '@radix-ui/themes';
import { Form, useActionData, useNavigation } from 'react-router';
import type { SignUpAction } from '../../action';
import { SIGNUP_FORM_FIELDS } from '../../constants';
import { PasswordInput } from '../PasswordInput';
import { LoadingButton } from '../../../../shared/components/ui';

const SignUpForm = () => {
  const result = useActionData<SignUpAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log({ result });
  return (
    <Form method='post' action='/auth/sign-up'>
      <Box className='space-y-4'>
        {SIGNUP_FORM_FIELDS.map(({ label, ...formField }, index) => {
          if (formField.type === 'password') {
            return (
              <Box key={index}>
                <PasswordInput
                  inputProps={{
                    'aria-label': label,
                    ...formField,
                    className: 'text-sm',
                    size: '3',
                    disabled: isSubmitting,
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
                disabled={isSubmitting}
              />
            </Box>
          );
        })}
      </Box>
      <Box className='mt-6'>
        <LoadingButton
          className='w-full text-sm tracking-wide cursor-pointer'
          size='3'
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Box>
    </Form>
  );
};

export { SignUpForm };
