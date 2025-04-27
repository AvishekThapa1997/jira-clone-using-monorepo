import { SIGNIN_FORM_FIELDS } from '@jira-clone/core/constants/auth';

import { Box } from '@/shared/components/ui/box';
import { Form, FormInput, FormSubmitButton } from '@/shared/components/ui/form';

import { ComponentProps } from 'react';
import { OAuthButtonSection } from '../OAuthButtonSection';

import { useUserSignIn } from '../../hooks/useUserSignIn';
import { Banner } from '@/shared/components/ui/banner';
import { If } from '@/shared/components/If';
import { SignInActionState } from '../../action';

const SignInForm = (props: ComponentProps<'form'> & SignInActionState) => {
  return (
    <Form {...props}>
      <Box className='space-y-3'>
        {SIGNIN_FORM_FIELDS.map((formField, index) => {
          return (
            <Box key={index}>
              <FormInput
                className='h-10 px-4'
                {...formField}
                autoComplete={
                  formField.name === 'password' ? 'current-password' : ''
                }
                defaultValue={props.value?.[formField.name]}
              />
            </Box>
          );
        })}
      </Box>
      <Box className='mt-5 space-y-6'>
        <FormSubmitButton>Login</FormSubmitButton>
        <OAuthButtonSection />
      </Box>
    </Form>
  );
};

export const SignInFormSection = () => {
  const { action, signInData } = useUserSignIn();
  const error = signInData.error?.message;
  return (
    <>
      <If check={!!error}>
        <Banner text={error} type='error' />
      </If>
      <SignInForm action={action} {...signInData} />
    </>
  );
};
