import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { SignInForm } from '../../features/auth/components';
import { Link } from 'react-router';

const SignInPage = () => {
  return (
    <Box>
      <input />
      <Box className='text-center border-b pb-6'>
        <Heading className='mb-1'>Welcome back!</Heading>
        <Text className='text-gray-500 text-[13px]'>
          Enter your email and password to sign in
        </Text>
      </Box>
      <Box className='py-6 space-y-2'>
        <SignInForm />
        <Flex className='text-sm' justify='center' gap='2'>
          <Text align='center' className='text-sm'>
            Don't have an account?
          </Text>
          <Link className='underline' to='/auth/sign-up'>
            Sign up
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export { SignInPage };
