import { createBrowserRouter, Navigate } from 'react-router';

import { AuthMiddlewareRoute } from '@/shared/components/AuthMiddlewareRoute';

import { RootLayout } from '@/shared/layout';

import { AuthErrorBoundary } from '@/features/auth/components/AuthErrorBoundary';
import { AuthStatusProvider } from '@/features/auth/provider/AuthStatusProvider';

import { lazy, Suspense } from 'react';

const Dashboard = lazy(() =>
  import('@/shared/components/Dashboard').then((module) => ({
    default: module.Dashboard,
  })),
);

const HomePage = lazy(() =>
  import('@/pages/home').then((module) => ({
    default: module.HomePage,
  })),
);

const AuthLayout = lazy(() =>
  import('@/features/auth/layout/AuthLayout').then((module) => ({
    default: module.AuthLayout,
  })),
);

const SignInPage = lazy(() =>
  import('@/pages/sign-in').then(({ SignInPage }) => ({
    default: SignInPage,
  })),
);

const SignUpPage = lazy(() =>
  import('@/pages/sign-up').then(({ SignUpPage }) => ({
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
            <Suspense fallback={<p>Dashboard loading....</p>}>
              <Dashboard />
            </Suspense>
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
        path: '/auth',
        element: (
          <AuthMiddlewareRoute>
            <Suspense fallback={<p>Auth layout loading..</p>}>
              <AuthLayout />
            </Suspense>
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
