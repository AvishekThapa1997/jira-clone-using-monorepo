import { useSignOut } from '../../../features/auth/hooks/useSignOut';
import { cn } from '@jira-clone/core/utils';
import { LoadingButton } from '../ui/LoadingButton';

export interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { isPending, mutate } = useSignOut();
  const handleClick = () => {
    mutate();
  };
  return (
    <LoadingButton
      type='button'
      disabled={isPending}
      className={cn(className)}
      onClick={handleClick}
    >
      Logout
    </LoadingButton>
  );
};

export { LogoutButton };
