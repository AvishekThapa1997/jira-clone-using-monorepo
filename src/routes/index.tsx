import { createBrowserRouter, Navigate } from 'react-router';

import { AuthLayout } from '@/features/auth/layout';
import { AuthServiceProvider } from '@/features/auth/provider';
import { AuthMiddlewareRoute } from '@/shared/components/AuthMiddlewareRoute';

import { RootLayout } from '@/shared/layout';

import { SignInPage, SignUpPage } from '@/pages';
import { AuthErrorBoundary } from '@/features/auth/components';
import { HomePage } from '@/pages/home';
import { AuthStatusProvider } from '@/features/auth/provider/AuthStatusProvider';
import { DashboardLayout } from '@/shared/components/Dashboard';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthErrorBoundary>
        <AuthStatusProvider>
          <RootLayout />
        </AuthStatusProvider>
      </AuthErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: (
          <AuthMiddlewareRoute>
            <DashboardLayout />
          </AuthMiddlewareRoute>
        ),
        children: [
          {
            path: '/',
            element: <Navigate to='/dashboard' replace={true} />,
          },
          {
            path: '/dashboard/',
            element: (
              <AuthMiddlewareRoute>
                <HomePage />
              </AuthMiddlewareRoute>
            ),
          },
        ],
      },
      {
        element: (
          <AuthMiddlewareRoute>
            <AuthServiceProvider>
              <AuthLayout />
            </AuthServiceProvider>
          </AuthMiddlewareRoute>
        ),
        children: [
          {
            path: '/auth/sign-in',
            element: <SignInPage />,
          },
          {
            path: '/auth/sign-up',
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
]);

export { routes };
