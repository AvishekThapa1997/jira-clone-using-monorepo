import { useUserSession } from '@/shared/hooks/useUserSession';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';
import { If } from '../If';

const AuthCheck = ({ children }: PropsWithChildren) => {
  const { user } = useUserSession();
  const { pathname } = useLocation();
  const isUserLoggedIn = Boolean(user?.id);
  const shouldRedirectToDashboard = pathname === '/';
  return (
    <>
      <If check={isUserLoggedIn}>
        <If check={shouldRedirectToDashboard}>
          <Navigate to='/dashboard' replace />
        </If>
        <If check={!shouldRedirectToDashboard}>{children}</If>
      </If>
      <If check={!isUserLoggedIn}>
        <Navigate to='/auth/sign-in' />
      </If>
    </>
  );
};

export { AuthCheck };
