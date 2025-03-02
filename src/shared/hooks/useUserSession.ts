import { UserSessionContext } from '@/features/auth/provider/UserSessionProvider';
import { useContext } from 'react';

export const useUserSession = () => {
  const sessionResult = useContext(UserSessionContext);
  if (!sessionResult) {
    throw new Error('useUserSession must be used within UserSessionProvider');
  }
  return sessionResult;
};
