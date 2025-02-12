import { Link } from 'react-router';
import { SignUpForm } from '../../features/auth/components';
import { Separator } from '@/shared/components/ui/separator';

const SignUpPage = () => {
  return (
    <div>
      <div className='text-center'>
        <h2 className='text-3xl'>Welcome back!</h2>
        <p className='mt-1 text-muted-foreground text-sm'>
          By signing up, you agree to our <Link to='/'>Privacy Policy</Link> and{' '}
          <Link to='/'>Terms of Service</Link>
        </p>
      </div>
      <Separator />
      <div className='space-y-4'>
        <SignUpForm />
        <div className='flex items-center gap-2 justify-center'>
          <p className='text-center'>Already have an account?</p>
          <Link className='underline' to='/auth/sign-in'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
