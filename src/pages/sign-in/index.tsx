import { SignInForm } from '../../features/auth/components';
import { Link } from 'react-router';
import {
  Box,
  Heading,
  HStack,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';

const SignInPage = () => {
  return (
    <Box>
      <Box textAlign='center'>
        <Heading size='4xl'> Welcome back!</Heading>
        <Text marginBlockStart={1} textStyle='sm' color='gray.500'>
          Enter your email and password to sign in
        </Text>
      </Box>
      <Separator marginBlock={4} />
      <VStack alignItems='stretch' gap={4}>
        <SignInForm />
        <HStack justifyContent='center'>
          <Text textAlign='center'>Don't have an account?</Text>
          <Link className='underline' to='/auth/sign-up'>
            Sign up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export { SignInPage };
