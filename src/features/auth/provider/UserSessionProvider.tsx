import type { UserDto } from '@jira-clone/core/types';
import { type PropsWithChildren, createContext } from 'react';

type UserSession = {
  user: UserDto;
};
export const UserSessionContext = createContext<UserSession | null>(null);

interface UserSessionProviderProps extends PropsWithChildren {
  user: UserDto;
}

export const UserSessionProvider = ({
  children,
  user,
}: UserSessionProviderProps) => {
  return (
    <UserSessionContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};
