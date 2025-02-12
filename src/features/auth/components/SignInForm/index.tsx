import { Form, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import { SIGNIN_FORM_FIELDS } from '../../constants';

import { Input } from '@/shared/components/ui/input';

const SignInForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form name='sign-in' action='/auth/sign-in' method='POST'>
      <div className='space-y-3'>
        {SIGNIN_FORM_FIELDS.map((formField, index) => {
          return (
            <div key={index}>
              <Input className='h-12' {...formField} disabled={isSubmitting} />
            </div>
          );
        })}
      </div>
      <div className='mt-5'>
        <LoadingButton
          disabled={isSubmitting}
          type='submit'
          className='w-full tracking-wider text-base '
        >
          Login
        </LoadingButton>
      </div>
    </Form>
  );
};

export { SignInForm };
