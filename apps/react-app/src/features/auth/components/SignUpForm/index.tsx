import { Input } from '@/shared/components/ui/input';
import { useAuthService } from '@/shared/hooks/useAuthService';
import { LoadingButton } from '../../../../shared/components/ui/LoadingButton';
import { SIGNUP_FORM_FIELDS } from '@jira-clone/core/constants/auth';

const SignUpForm = () => {
  const { signUpAction } = useAuthService();
  const { isPending, operation } = signUpAction;
  return (
    <form action={operation}>
      <div className='space-y-3'>
        {SIGNUP_FORM_FIELDS.map(({ ...formField }, index) => {
          return (
            <div key={index}>
              <Input className='h-10 px-4' {...formField} />
            </div>
          );
        })}
      </div>
      <div className='mt-5'>
        <LoadingButton
          type='submit'
          disabled={isPending}
          className='w-full tracking-wider text-base'
        >
          Register
        </LoadingButton>
      </div>
    </form>
  );
};

export { SignUpForm };
