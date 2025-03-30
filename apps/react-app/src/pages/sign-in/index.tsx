import { SignInForm } from '../../features/auth/components/SignInForm';
import { Link } from 'react-router';
import { Separator } from '@/shared/components/ui/separator';
import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import RedirectToDashboard from '@/features/auth/components/RedirectToDashboard/RedirectToDashboard';

const SignInPage = () => {
  return (
    <RedirectToDashboard>
      <AuthLayout>
        <Box className='text-center'>
          <Text asChild className='text-2xl font-medium'>
            <h2>Welcome back!</h2>
          </Text>
          <Text className='text-muted-foreground text-sm'>
            Enter your email and password to sign in
          </Text>
        </Box>
        <Separator />
        <Box className='space-y-4 text-sm'>
          <SignInForm />
          <Box className='flex items-center gap-2 justify-center'>
            <Text asChild>
              <span>Don't have an account?</span>
            </Text>
            <Link
              className='underline font-medium text-primary'
              to='/auth/sign-up'
            >
              Sign up
            </Link>
          </Box>
        </Box>
      </AuthLayout>
    </RedirectToDashboard>
  );
};

export { SignInPage };
