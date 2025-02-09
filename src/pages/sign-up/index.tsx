import { Box, Divider, Stack, Typography } from '@mui/material';
import { SignUpForm } from '../../features/auth/components';
import { Link } from 'react-router';

const SignUpPage = () => {
  return (
    <Box>
      <Box textAlign='center' paddingBottom={2}>
        <Typography variant='h4' fontWeight='bold'>
          Welcome back!
        </Typography>
        <Typography variant='body2' marginTop={0.5} color='textSecondary'>
          By signing up, you agree to our <Link to='/'>Privacy Policy</Link> and{' '}
          <Link to='/'>Terms of Service</Link>
        </Typography>
      </Box>
      <Divider />
      <Box className='py-6 space-y-2'>
        <SignUpForm />
        <Stack direction='row' justifyContent='center' columnGap={0.5}>
          <Typography alignItems='center'>Already have an account?</Typography>
          <Link className='underline' to='/auth/sign-in'>
            Sign in
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export { SignUpPage };
