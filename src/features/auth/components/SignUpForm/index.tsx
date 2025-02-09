import { Form, useActionData, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import type { SignUpAction } from '../../action';
import { SIGNUP_FORM_FIELDS } from '../../constants';

import { Box, Input, VStack } from '@chakra-ui/react';
import { PasswordInput } from '../PasswordInput';

const SignUpForm = () => {
  const result = useActionData<SignUpAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  ({ result });
  console.log({ isSubmitting });
  return (
    <Form method='post' action='/auth/sign-up'>
      <VStack gap={3} alignItems='stretch'>
        {SIGNUP_FORM_FIELDS.map(({ ...formField }, index) => {
          if (formField.type === 'password') {
            return (
              <Box key={index}>
                <PasswordInput {...formField} />
              </Box>
            );
          }
          return (
            <Box key={index}>
              <Input {...formField} />
            </Box>
          );
        })}
      </VStack>
      <Box marginBlockStart={5}>
        <LoadingButton
          type='submit'
          loading={isSubmitting}
          loadingText='Register'
          width='full'
        >
          Register
        </LoadingButton>
      </Box>
    </Form>
  );
};

export { SignUpForm };
