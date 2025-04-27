import { Link } from 'react-router';
import { SignUpFormSection } from '../../features/auth/components/SignUpForm';
import { Separator } from '@/shared/components/ui/separator';
import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import RedirectToDashboard from '@/features/auth/components/RedirectToDashboard/RedirectToDashboard';

const SignUpPage = () => {
  return (
    <RedirectToDashboard>
      <AuthLayout>
        <Box className='text-center'>
          <Text asChild className='text-2xl font-medium'>
            <h2>Welcome back!</h2>
          </Text>
          <Text asChild className='mt-1 text-muted-foreground text-xs'>
            <p>
              By signing up, you agree to our <Link to='/'>Privacy Policy</Link>{' '}
              and <Link to='/'>Terms of Service</Link>
            </p>
          </Text>
        </Box>
        <Separator />
        <Box className='space-y-4'>
          <SignUpFormSection />
          <Box className='flex text-sm items-center gap-2 justify-center'>
            <Text className='text-center'>Already have an account?</Text>
            <Link
              className='underline font-medium text-primary'
              to='/auth/sign-in'
            >
              Sign in
            </Link>
          </Box>
        </Box>
      </AuthLayout>
    </RedirectToDashboard>
  );
};

export { SignUpPage };
