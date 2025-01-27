import { Button, Flex } from '@radix-ui/themes';
import { useAuth } from '../../../../shared/hooks/useAuth';

const OAuthButtonSection = () => {
  const { isAuthInProgress } = useAuth();
  console.log({ isAuthInProgress });
  return (
    <Flex direction='column' gap='3'>
      <Button
        className='cursor-pointer text-sm  ring-1 tracking-wide ring-gray-200 text-gray-600'
        variant='outline'
        type='button'
        disabled={isAuthInProgress}
        size='3'
      >
        Login With Google
      </Button>
      <Button
        className='cursor-pointer text-sm ring-1 tracking-wide ring-gray-200 text-gray-600'
        variant='outline'
        disabled={isAuthInProgress}
        type='button'
        size='3'
      >
        Login with Github
      </Button>
    </Flex>
  );
};

export { OAuthButtonSection };
