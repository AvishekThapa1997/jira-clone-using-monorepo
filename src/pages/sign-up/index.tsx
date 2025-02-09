import { Link } from 'react-router';
import { SignUpForm } from '../../features/auth/components';

import {
  Box,
  Heading,
  HStack,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';

const SignUpPage = () => {
  return (
    <Box>
      <Box textAlign='center'>
        <Heading size='4xl'> Welcome back!</Heading>
        <Text marginBlockStart={1} textStyle='sm' color='gray.500'>
          By signing up, you agree to our <Link to='/'>Privacy Policy</Link> and{' '}
          <Link to='/'>Terms of Service</Link>
        </Text>
      </Box>
      <Separator marginBlock={4} />
      <VStack alignItems='stretch' gap={4}>
        <SignUpForm />
        <HStack justifyContent='center'>
          <Text textAlign='center'>Already have an account?</Text>
          <Link className='underline' to='/auth/sign-in'>
            Sign in
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export { SignUpPage };
