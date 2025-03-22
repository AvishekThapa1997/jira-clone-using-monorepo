import { SignInForm } from '../../features/auth/components/SignInForm';
import { Link } from 'react-router';
import { Separator } from '@/shared/components/ui/separator';

const SignInPage = () => {
  return (
    <div>
      <div className='text-center'>
        <h2 className='text-2xl font-medium'>Welcome back!</h2>
        <p className='text-muted-foreground text-sm'>
          Enter your email and password to sign in
        </p>
      </div>
      <Separator />
      <div className='space-y-4 text-sm'>
        <SignInForm />
        <div className='flex items-center gap-2 justify-center'>
          <p>Don't have an account?</p>
          <Link
            className='underline font-medium text-primary'
            to='/auth/sign-up'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SignInPage };
