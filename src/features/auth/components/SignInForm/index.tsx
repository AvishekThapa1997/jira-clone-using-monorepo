import { Box, TextField } from '@radix-ui/themes';
import { Form, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import { SIGNIN_FORM_FIELDS } from '../../constants';
import { PasswordInput } from '../PasswordInput';

const SignInForm = () => {
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
