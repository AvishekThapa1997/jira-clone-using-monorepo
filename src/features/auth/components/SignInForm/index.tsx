import { Form, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import { SIGNIN_FORM_FIELDS } from '../../constants';
import { Box, Input, VStack } from '@chakra-ui/react';
import { PasswordInput } from '../PasswordInput';

const SignInForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form name='sign-in' action='/auth/sign-in' method='POST'>
      <VStack gap={3} alignItems='stretch'>
        {SIGNIN_FORM_FIELDS.map((formField, index) => {
          if (formField.type === 'password') {
            return (
              <Box key={index}>
                <PasswordInput {...formField} disabled={isSubmitting} />
              </Box>
            );
          }
          return (
            <Box key={index}>
              <Input size='lg' {...formField} disabled={isSubmitting} />
            </Box>
          );
        })}
      </VStack>
      <Box marginBlockStart={5}>
        <LoadingButton
          loadingText='Login'
          loading={isSubmitting}
          type='submit'
          width='full'
        >
          Login
        </LoadingButton>
      </Box>
    </Form>
  );
};

export { SignInForm };
