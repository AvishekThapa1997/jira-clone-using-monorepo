import { Button, Flex } from '@radix-ui/themes';

const OAuthButtonSection = () => {
  return (
    <Flex direction='column' gap='3'>
      <Button
        className='cursor-pointer text-sm  ring-1 tracking-wide ring-gray-200 text-gray-600'
        variant='outline'
        type='button'
        size='3'
      >
        Login With Google
      </Button>
      <Button
        className='cursor-pointer text-sm ring-1 tracking-wide ring-gray-200 text-gray-600'
        variant='outline'
        type='button'
        size='3'
      >
        Login with Github
      </Button>
    </Flex>
  );
};

export { OAuthButtonSection };
