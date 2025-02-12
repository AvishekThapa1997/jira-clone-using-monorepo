import { Button } from '@/shared/components/ui/button';
import { useAuth } from '../../../../shared/hooks/useAuth';

const OAuthButtonSection = () => {
  const { isAuthInProgress } = useAuth();
  ({ isAuthInProgress });
  return (
    <div className='space-y-3 flex flex-col'>
      <Button
        variant='outline'
        size='lg'
        type='button'
        disabled={isAuthInProgress}
        className='text-base tracking-wider'
      >
        Login with Google
      </Button>
      <Button
        variant='outline'
        size='lg'
        type='button'
        disabled={isAuthInProgress}
        className='text-base tracking-wider'
      >
        Login with Github
      </Button>
    </div>
  );
};

export { OAuthButtonSection };
