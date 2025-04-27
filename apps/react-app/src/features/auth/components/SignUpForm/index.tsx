import { Box } from '@/shared/components/ui/box';
import { Form, FormInput, FormSubmitButton } from '@/shared/components/ui/form';
import { SIGNUP_FORM_FIELDS } from '@jira-clone/core/constants/auth';
import {
  Result,
  SignUpSchema,
  UserDto,
  ValidationError,
} from '@jira-clone/core/types';
import { ComponentProps } from 'react';
import { useUserSignUp } from '../../hooks/useUserSignUp';
import { OAuthButtonSection } from '../OAuthButtonSection';
import { SignUpActionState } from '../../action';
import { Banner } from '@/shared/components/ui/banner';
import { If } from '@/shared/components/If';

const SignUpForm = (props: ComponentProps<'form'> & SignUpActionState) => {
  return (
    <Form {...props} autoComplete='off'>
      <Box className='space-y-3'>
        {SIGNUP_FORM_FIELDS.map(({ ...formField }, index) => {
          const errorMessage = props.error?.validationErrors?.[formField.name];
          const inputVal = props.value?.[formField.name];
          return (
            <Box key={index}>
              <FormInput
                className='h-10 px-4'
                {...formField}
                autoComplete={
                  formField.name === 'password' ? 'new-password' : 'off'
                }
                errorMessage={errorMessage}
                defaultValue={inputVal}
              />
            </Box>
          );
        })}
      </Box>
      <Box className='mt-5 space-y-6'>
        <FormSubmitButton>Register</FormSubmitButton>
        <OAuthButtonSection />
      </Box>
    </Form>
  );
};

export const SignUpFormSection = () => {
  const { action, signUpData } = useUserSignUp();
  return (
    <>
      <If check={!!signUpData.error}>
        <Banner text={signUpData.error?.message} type='error' />
      </If>
      <SignUpForm action={action} {...signUpData} />
    </>
  );
};
