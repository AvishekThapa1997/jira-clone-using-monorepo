import { auth } from '@/config/firebase';
import { UserDto } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import {
  getIdTokenResult,
  NextOrObserver,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type AuthStatus = {
  user?: User;
  isLoading: boolean;
};

type AuthContext = {
  isLoading: boolean;
  user?: UserDto;
};

export const AuthStatusContext = createContext<AuthContext>({
  isLoading: true,
});

const useAuth = () => {
  const [user, setUser] = useState<AuthStatus>({
    isLoading: true,
  });

  const handleAuth: NextOrObserver<User> = (user) => {
    if (user) {
      setUser({ user, isLoading: false });
    } else {
      setUser({ isLoading: false });
    }
  };
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, handleAuth);
    return () => {
      unsuscribe();
    };
  }, []);
  return { ...user };
};

const useGetToken = (user?: User) => {
  return useQuery({
    queryKey: ['fetch token'],
    queryFn: () => getIdTokenResult(user!),
    enabled: !!user?.uid,
  });
};
export const AuthStatusProvider = ({ children }: PropsWithChildren) => {
  const { isLoading, user } = useAuth();
  const { data, isFetching: isFetchingToken } = useGetToken(user);
  console.log({ data, isFetchingToken, isLoading });
  return (
    <AuthStatusContext.Provider
      value={{
        isLoading,
        user: user
          ? {
              email: user.email ?? '',
              id: user.uid,
              name: user.displayName ?? '',
            }
          : undefined,
      }}
    >
      {children}
    </AuthStatusContext.Provider>
  );
};
