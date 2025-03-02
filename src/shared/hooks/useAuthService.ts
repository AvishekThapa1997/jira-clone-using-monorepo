import { useContext } from 'react';
import { AuthContext } from '../../features/auth/provider';

export const useAuthService = () => {
  const result = useContext(AuthContext);
  if (!result) {
    throw new Error('useAuth must be called within AuthProvider');
  }
  return result;
};
