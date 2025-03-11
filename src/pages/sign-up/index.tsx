import { Link } from 'react-router';
import { SignUpForm } from '../../features/auth/components/SignUpForm';
import { Separator } from '@/shared/components/ui/separator';

const SignUpPage = () => {
  return (
    <div>
      <div className='text-center'>
        <h2 className='text-2xl font-medium'>Welcome back!</h2>
        <p className='mt-1 text-muted-foreground text-xs'>
          By signing up, you agree to our <Link to='/'>Privacy Policy</Link> and{' '}
          <Link to='/'>Terms of Service</Link>
        </p>
      </div>
      <Separator />
      <div className='space-y-4'>
        <SignUpForm />
        <div className='flex text-sm items-center gap-2 justify-center'>
          <p className='text-center'>Already have an account?</p>
          <Link
            className='underline font-medium text-primary'
            to='/auth/sign-in'
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
