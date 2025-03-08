import { getAuth } from '@/config/firebase';
import { UserDto } from '@/types/types';

import {
  //getIdTokenResult,
  type Unsubscribe,
  type NextOrObserver,
  type User,
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
    let unsuscribe: Unsubscribe | undefined;
    async function loadFirebaseAuth() {
      try {
        const { auth, onAuthStateChanged } = await getAuth();
        unsuscribe = onAuthStateChanged(auth, handleAuth);
      } catch (err) {
        console.error(err);
        setUser({ isLoading: false });
      }
    }
    loadFirebaseAuth();
    return () => {
      unsuscribe?.();
    };
  }, []);
  return { ...user };
};

// const useGetToken = (user?: User) => {
//   return useQuery({
//     queryKey: ['fetch token'],
//     queryFn: () => getIdTokenResult(user!),
//     enabled: !!user?.uid,
//   });
// };
export const AuthStatusProvider = ({ children }: PropsWithChildren) => {
  const { isLoading, user } = useAuth();
  //const { data, isFetching: isFetchingToken } = useGetToken(user);
  // console.log({ data, isFetchingToken, isLoading });
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
