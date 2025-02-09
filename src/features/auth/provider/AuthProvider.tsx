import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';
import { UserDto } from '../../../types/types';
import { useNavigation } from 'react-router';

type AuthContext = {
  user?: UserDto | null;
  isLoading: boolean;
  signOut: () => ReturnType<typeof signOut>;
  isAuthInProgress: boolean;
};

export const AuthContext = createContext<AuthContext | null>(null);

const useAuthStatus = () => {
  const [user, setUser] = useState<Pick<AuthContext, 'user' | 'isLoading'>>({
    isLoading: true,
  });
  const navigation = useNavigation();
  const isAuthInProgress =
    navigation.state === 'submitting' &&
    ['/auth/sign-in', '/auth/sign-up'].includes(navigation.location.pathname);
  ({ navigation });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          user: {
            id: user.uid,
            email: user.email ?? '',
            name: user.displayName ?? '',
          },
          isLoading: false,
        });
      } else {
        setUser({ isLoading: false });
      }
    });
  }, []);
  return { ...user, isAuthInProgress };
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, isLoading, isAuthInProgress } = useAuthStatus();
  const signOutUser = () => {
    return signOut(auth);
  };
  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthInProgress, signOut: signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
