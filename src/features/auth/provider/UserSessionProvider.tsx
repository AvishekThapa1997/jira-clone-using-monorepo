import { UserDto } from '@/types/types';
import React, { PropsWithChildren } from 'react';

type UserSession = {
  user: UserDto;
};
export const UserSessionContext = React.createContext<UserSession | null>(null);

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
