import { LoadingButton } from '../../../../shared/components/ui/LoadingButton';
import { SIGNIN_FORM_FIELDS } from '@jira-clone/core/constants/auth';

import { Input } from '@/shared/components/ui/input';
import { useAuthService } from '@/shared/hooks/useAuthService';

const SignInForm = () => {
  const { signInAction } = useAuthService();
  const { data, isPending, operation } = signInAction;
  console.log({ data });
  return (
    // <Form name='sign-in' action='/auth/sign-in' method='POST'>
    <form action={operation}>
      <div className='space-y-3'>
        {SIGNIN_FORM_FIELDS.map((formField, index) => {
          return (
            <div key={index}>
              <Input
                className='h-10 px-4'
                {...formField}
                disabled={isPending}
              />
            </div>
          );
        })}
      </div>
      <div className='mt-5'>
        <LoadingButton
          disabled={isPending}
          type='submit'
          className='w-full tracking-wider text-sm'
        >
          Login
        </LoadingButton>
      </div>
    </form>
    // </Form>
  );
};

export { SignInForm };
