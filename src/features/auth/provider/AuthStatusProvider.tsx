import { getAuth } from '@jira-clone/firebase';
import { handleAuth } from '@jira-clone/firebase/utils';
import type { UserDto } from '@jira-clone/core/types';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type AuthStatus = {
  user?: UserDto;
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

  useEffect(() => {
    let unsuscribe: Function | undefined;
    async function loadFirebaseAuth() {
      try {
        const { auth, onAuthStateChanged } = await getAuth();
        const authStatus = handleAuth({
          onAuthStatusChanged: (user) => {
            let userDto: UserDto | undefined;
            if (user) {
              userDto = {
                id: user.uid,
                email: user.email,
                name: user.displayName,
              };
            }
            setUser({
              isLoading: false,
              user: userDto,
            });
          },
        });
        unsuscribe = onAuthStateChanged(auth, authStatus);
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
        user: user,
      }}
    >
      {children}
    </AuthStatusContext.Provider>
  );
};
