import { useUserSession } from '@/shared/hooks/useUserSession';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Choose } from '../Choose';
import { If } from '../If';

const RequireAuth = ({ children }: PropsWithChildren) => {
  const { user } = useUserSession();
  const isUserLoggedIn = Boolean(user?.id);
  return (
    <Choose>
      <If check={isUserLoggedIn}>{children}</If>
      <If check={!isUserLoggedIn}>
        <Navigate to='/auth/sign-in' replace />
      </If>
    </Choose>
  );
};

export { RequireAuth };
