import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { SignUpForm } from '../../features/auth/components';
import { Link } from 'react-router';

const SignUpPage = () => {
  return (
    <Box>
      <Box className='text-center border-b pb-6'>
        <Heading className='mb-1'>Sign Up</Heading>
        <Text align='left' className='text-gray-500 text-[13px]'>
          By signing up, you agree to our <Link to='/'>Privacy Policy</Link> and{' '}
          <Link to='/'>Terms of Service</Link>
        </Text>
      </Box>
      <Box className='py-6 space-y-2'>
        <SignUpForm />
        <Flex className='text-sm' justify='center' gap='2'>
          <Text align='center' className='text-sm'>
            Already have an account?
          </Text>
          <Link className='underline' to='/auth/sign-in'>
            Sign in
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export { SignUpPage };
