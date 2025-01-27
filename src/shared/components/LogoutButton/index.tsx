import { useSignOut } from '../../../features/auth/hooks/useSignOut';
import { cn } from '../../util/class';
import { LoadingButton } from '../ui';

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
      loading={isPending}
      disabled={isPending}
      className={cn(className)}
      onClick={handleClick}
    >
      Logout
    </LoadingButton>
  );
};

export { LogoutButton };
