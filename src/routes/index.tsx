import { createBrowserRouter, Navigate } from 'react-router';

import { AuthLayout } from '@/features/auth/layout';
import { AuthServiceProvider } from '@/features/auth/provider';
import { AuthMiddlewareRoute } from '@/shared/components/AuthMiddlewareRoute';

import { RootLayout } from '@/shared/layout';

import { AuthErrorBoundary } from '@/features/auth/components';
import { AuthStatusProvider } from '@/features/auth/provider/AuthStatusProvider';

import { Dashboard } from '@/shared/components/Dashboard';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() =>
  import('@/pages/home').then((module) => ({
    default: module.HomePage,
  })),
);
const SignInPage = lazy(() =>
  import('@/pages').then(({ SignInPage }) => ({
    default: SignInPage,
  })),
);

const SignUpPage = lazy(() =>
  import('@/pages').then(({ SignUpPage }) => ({
    default: SignUpPage,
  })),
);

const TaskPage = lazy(() =>
  import('@/pages/tasks').then((module) => ({
    default: module.TaskPage,
  })),
);

const MembersPage = lazy(() =>
  import('@/pages/members').then((module) => ({
    default: module.MembersPage,
  })),
);

const SettingsPage = lazy(() =>
  import('@/pages/settings').then((module) => ({
    default: module.SettingsPage,
  })),
);
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
            <Dashboard />
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
                <Suspense fallback={<p>Home page loading...</p>}>
                  <HomePage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
          {
            path: '/tasks',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>task page loading...</p>}>
                  <TaskPage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
          {
            path: '/members',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>members page loading...</p>}>
                  <MembersPage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
          {
            path: '/settings',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>setting page loading...</p>}>
                  <SettingsPage />
                </Suspense>
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
            element: (
              <Suspense fallback={<p>Signin loading</p>}>
                <SignInPage />,
              </Suspense>
            ),
          },
          {
            path: '/auth/sign-up',
            element: (
              <Suspense fallback={<p>Signup loading</p>}>
                <SignUpPage />,
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export { routes };
