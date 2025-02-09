import { Button, VStack } from '@chakra-ui/react';
import { useAuth } from '../../../../shared/hooks/useAuth';

const OAuthButtonSection = () => {
  const { isAuthInProgress } = useAuth();
  ({ isAuthInProgress });
  return (
    <VStack alignItems='stretch' gap={3}>
      <Button
        variant='outline'
        size='xl'
        type='button'
        disabled={isAuthInProgress}
        letterSpacing={1}
      >
        Login with Google
      </Button>
      <Button
        variant='outline'
        size='xl'
        type='button'
        disabled={isAuthInProgress}
        letterSpacing={1}
      >
        Login with Github
      </Button>
    </VStack>
  );
};

export { OAuthButtonSection };
