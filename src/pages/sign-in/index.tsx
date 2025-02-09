import { Box, Divider, Stack, Typography } from '@mui/material';
import { SignInForm } from '../../features/auth/components';
import { Link } from 'react-router';

const SignInPage = () => {
  return (
    <Box>
      <Box textAlign='center' paddingBottom={2}>
        <Typography variant='h4' fontWeight='bold'>
          Welcome back!
        </Typography>
        <Typography variant='body2' marginTop={0.5} color='textSecondary'>
          Enter your email and password to sign in
        </Typography>
      </Box>
      <Divider />
      <Box className='py-6 space-y-2'>
        <SignInForm />
        <Stack
          direction='row'
          className='text-sm'
          justifyContent='center'
          alignItems='center'
          columnGap={0.5}
        >
          <Typography textAlign='center'>Don't have an account?</Typography>

          <Link className='underline' to='/auth/sign-up'>
            Sign up
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export { SignInPage };
