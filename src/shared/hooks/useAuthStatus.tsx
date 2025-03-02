import { AuthStatusContext } from '@/features/auth/provider/AuthStatusProvider';
import { useContext } from 'react';

export const useAuthStatus = () => {
  const authStatusResult = useContext(AuthStatusContext);
  if (!authStatusResult) {
    throw new Error('useAuthStatus must be used with AuthStatusProvider');
  }
  return authStatusResult;
};
