import { LoadingButton } from '../../../../shared/components/ui/LoadingButton';
import { SIGNIN_FORM_FIELDS } from '@jira-clone/core/constants/auth';

import { Input } from '@/shared/components/ui/input';
import { useAuthService } from '@/shared/hooks/useAuthService';
import { Box } from '@/shared/components/ui/box';

const SignInForm = () => {
  const { signInAction } = useAuthService();
  const { isPending, operation } = signInAction;
  return (
    <form action={operation}>
      <Box className='space-y-3'>
        {SIGNIN_FORM_FIELDS.map((formField, index) => {
          return (
            <Box key={index}>
              <Input
                className='h-10 px-4'
                {...formField}
                disabled={isPending}
                autoComplete='on'
              />
            </Box>
          );
        })}
      </Box>
      <Box className='mt-5'>
        <LoadingButton
          disabled={isPending}
          type='submit'
          className='w-full tracking-wider text-sm'
        >
          Login
        </LoadingButton>
      </Box>
    </form>
    // </Form>
  );
};

export { SignInForm };
