import { Box, Button, TextField } from '@radix-ui/themes';
import { Form, useActionData, useNavigation } from 'react-router';
import { PasswordInput } from '../PasswordInput';
import { SIGNIN_FORM_FIELDS } from '../../constants';
import type { SignInAction } from '../../action';
import { LoadingButton } from '../../../../shared/components/ui';

const SignInForm = () => {
  const result = useActionData<SignInAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form name='sign-in' action='/auth/sign-in' method='POST'>
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
          loading={isSubmitting}
          disabled={isSubmitting}
          className='w-full text-sm tracking-wide cursor-pointer'
          size='3'
        >
          Login
        </LoadingButton>
      </Box>
    </Form>
  );
};

export { SignInForm };
