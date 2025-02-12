import { Form, useActionData, useNavigation } from 'react-router';
import { LoadingButton } from '../../../../shared/components/ui';
import type { SignUpAction } from '../../action';
import { SIGNUP_FORM_FIELDS } from '../../constants';
import { Input } from '@/shared/components/ui/input';

const SignUpForm = () => {
  const result = useActionData<SignUpAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  ({ result });
  console.log({ isSubmitting });
  return (
    <Form method='post' action='/auth/sign-up'>
      <div className='space-y-3'>
        {SIGNUP_FORM_FIELDS.map(({ ...formField }, index) => {
          return (
            <div key={index}>
              <Input className='h-12' {...formField} />
            </div>
          );
        })}
      </div>
      <div className='mt-5'>
        <LoadingButton
          type='submit'
          disabled={isSubmitting}
          className='w-full tracking-wider text-base'
        >
          Register
        </LoadingButton>
      </div>
    </Form>
  );
};

export { SignUpForm };
