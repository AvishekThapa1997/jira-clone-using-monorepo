import { Form, useActionData, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import type { SignUpAction } from '../../action';
import { SIGNUP_FORM_FIELDS } from '../../constants';
import { Box, TextField } from '@mui/material';
import { PasswordInput } from '../PasswordInput';

const SignUpForm = () => {
  const result = useActionData<SignUpAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  ({ result });
  console.log({ isSubmitting });
  return (
    <Form method='post' action='/auth/sign-up'>
      <Box className='space-y-4'>
        {SIGNUP_FORM_FIELDS.map(({ label, ...formField }, index) => {
          if (formField.type === 'password') {
            return (
              <Box key={index}>
                <PasswordInput {...formField} />
              </Box>
            );
          }
          return (
            <Box key={index}>
              <TextField {...formField} />
            </Box>
          );
        })}
      </Box>
      <Box className='mt-6'>
        <LoadingButton
          type='submit'
          loading={isSubmitting}
          fullWidth
          size='large'
          focusRipple={false}
        >
          Register
        </LoadingButton>
      </Box>
    </Form>
  );
};

export { SignUpForm };
