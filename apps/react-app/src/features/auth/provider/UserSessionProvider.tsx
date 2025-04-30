import { Choose } from '@/shared/components/Choose';
import { DashboardSkeleton } from '@/shared/components/Dashboard/DashboardSkeleton';
import { If } from '@/shared/components/If';
import type { UserDto } from '@jira-clone/core/types';
import { getAuth } from '@jira-clone/firebase/auth';
import { handleAuth } from '@jira-clone/firebase/utils';
import { type PropsWithChildren, createContext } from 'react';

import { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';

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
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
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
            setAuthStatus({
              isLoading: false,
              user: userDto,
            });
          },
        });
        unsuscribe = onAuthStateChanged(auth, authStatus);
      } catch (err) {
        console.error(err);
        setAuthStatus({ isLoading: false });
      }
    }
    loadFirebaseAuth();
    return () => {
      unsuscribe?.();
    };
  }, []);
  return { ...authStatus };
};

type UserSession = {
  user: UserDto;
};
export const UserSessionContext = createContext<UserSession | null>(null);

interface UserSessionProviderProps extends PropsWithChildren {}

export const UserSessionProvider = ({ children }: UserSessionProviderProps) => {
  const { isFetching, user } = useSession();
  return (
    <Choose>
      <If check={isFetching}>
        <DashboardSkeleton />
      </If>
      <If check={!isFetching}>
        <UserSessionContext.Provider
          value={{
            user,
          }}
        >
          {children}
        </UserSessionContext.Provider>
      </If>
    </Choose>
  );
};
