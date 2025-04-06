import { WorkspaceMembershipCheck } from '@/shared/components/RouteMiddleware/WorkspaceMembershipCheck';
import { useUserSession } from '@/shared/hooks/useUserSession';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

const AUTH_PAGES = ['/auth/sign-in', '/auth/sign-up'];
export const RouteMiddleware = ({ children }: PropsWithChildren) => {
  const { user } = useUserSession();
  const { pathname } = useLocation();
  const isAuthPage = AUTH_PAGES.some((path) => pathname.includes(path));
  const isUserLoggedIn = Boolean(user);
  if (!isUserLoggedIn) {
    return isAuthPage ? children : <Navigate to='/auth/sign-in' replace />;
  }
  const shouldRedirectToDashboard = pathname === '/' || isAuthPage;
  if (shouldRedirectToDashboard) {
    return <Navigate to='/' replace />;
  }
  return <WorkspaceMembershipCheck>{children}</WorkspaceMembershipCheck>;
};
