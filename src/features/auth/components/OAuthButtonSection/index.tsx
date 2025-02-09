import { useAuth } from '../../../../shared/hooks/useAuth';
import { Button, Stack } from '@mui/material';

const OAuthButtonSection = () => {
  const { isAuthInProgress } = useAuth();
  ({ isAuthInProgress });
  return (
    <Stack direction='column' rowGap={1.5}>
      <Button
        variant='outlined'
        size='large'
        type='button'
        disabled={isAuthInProgress}
        sx={{
          color: 'GrayText',
          borderColor: 'gray',
          textTransform: 'none',
        }}
      >
        Login With Google
      </Button>
      <Button
        size='large'
        variant='outlined'
        disabled={isAuthInProgress}
        type='button'
        sx={{
          color: 'GrayText',
          borderColor: 'gray',
          fontWeight: 'medium',
          textTransform: 'none',
        }}
      >
        Login with Github
      </Button>
    </Stack>
  );
};

export { OAuthButtonSection };
