import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const AuthMiddlewareRoute = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const isAuthPage =
    pathname.includes('/auth/sign-in') || pathname.includes('/auth/sign-up');
  const isUserLoggedIn = user && !isLoading;
  if (!isUserLoggedIn) {
    if (isAuthPage) {
      return children;
    }
    return <Navigate to='/auth/sign-in' replace={true} />;
  }

  if (pathname === '/' || isAuthPage) {
    return <Navigate to='/dashboard' replace={true} />;
  }
  return children;
};
