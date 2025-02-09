import { Form, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import { SIGNIN_FORM_FIELDS } from '../../constants';

import { Box, TextField } from '@mui/material';
import { PasswordInput } from '../PasswordInput';

const SignInForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form name='sign-in' action='/auth/sign-in' method='POST'>
      <Box className='space-y-4'>
        {SIGNIN_FORM_FIELDS.map((formField, index) => {
          if (formField.type === 'password') {
            return (
              <Box key={index}>
                <PasswordInput
                  {...formField}
                  disabled={isSubmitting}
                  sx={{
                    '&:disabled': {
                      cursor: 'not-allowed',
                    },
                  }}
                />
              </Box>
            );
          }
          return (
            <Box key={index}>
              <TextField {...formField} disabled={isSubmitting} />
            </Box>
          );
        })}
      </Box>
      <Box marginTop={3}>
        <LoadingButton
          loading={isSubmitting}
          type='submit'
          fullWidth
          size='large'
          focusRipple={false}
        >
          Login
        </LoadingButton>
      </Box>
    </Form>
  );
};

export { SignInForm };
