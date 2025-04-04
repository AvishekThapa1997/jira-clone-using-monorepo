import { Button } from '@/shared/components/ui/button';
import { useAuthService } from '@/shared/hooks/useAuthService';

const OAuthButtonSection = () => {
  const { isAuthInProgress } = useAuthService();

  return (
    <div className='space-y-3 flex flex-col'>
      <Button
        variant='outline'
        type='button'
        disabled={isAuthInProgress}
        className='tracking-wider'
      >
        Login with Google
      </Button>
      <Button
        variant='outline'
        type='button'
        disabled={isAuthInProgress}
        className='tracking-wider'
      >
        Login with Github
      </Button>
    </div>
  );
};

export { OAuthButtonSection };
