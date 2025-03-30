import { createBrowserRouter, Navigate } from 'react-router';

import { RootLayout } from '@/shared/layout';

import { AuthErrorBoundary } from '@/features/auth/components/AuthErrorBoundary';

import { DashboardSkeleton } from '@/shared/components/Dashboard/DashboardSkeleton';
import { lazy, Suspense } from 'react';

const AuthMiddlewareRoute = lazy(() =>
  import('@/shared/components/RouteMiddleware').then((module) => ({
    default: module.RouteMiddleware,
  })),
);

const Dashboard = lazy(async () =>
  import('@/shared/components/Dashboard').then((module) => ({
    default: module.DashboardRootLayout,
  })),
);

const HomePage = lazy(() =>
  import('@/pages/home').then((module) => ({
    default: module.HomePage,
  })),
);

const WorkspacePage = lazy(() =>
  import('@/pages/(workspaces)/workspace-details').then(
    ({ WorkspacePage }) => ({
      default: WorkspacePage,
    }),
  ),
);

const CreateWorkspacePage = lazy(() =>
  import('@/pages/(workspaces)/create-workspace').then(
    ({ CreateWorkspace }) => ({
      default: CreateWorkspace,
    }),
  ),
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
        <RootLayout />
      </AuthErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' replace={true} />,
      },
      {
        path: '/workspaces/create',
        element: (
          <AuthMiddlewareRoute>
            <Suspense fallback={<p>loading...</p>}>
              <CreateWorkspacePage />
            </Suspense>
          </AuthMiddlewareRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <AuthMiddlewareRoute>
            <Dashboard />
          </AuthMiddlewareRoute>
        ),
        children: [
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
            path: '/dashboard/tasks',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>task page loading...</p>}>
                  <TaskPage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
          {
            path: '/dashboard/members',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>members page loading...</p>}>
                  <MembersPage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
          {
            path: '/dashboard/settings',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>setting page loading...</p>}>
                  <SettingsPage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
          {
            path: '/dashboard/workspaces/:workspaceId',
            element: (
              <AuthMiddlewareRoute>
                <Suspense fallback={<p>workspace page loading...</p>}>
                  <WorkspacePage />
                </Suspense>
              </AuthMiddlewareRoute>
            ),
          },
        ],
      },
      {
        path: '/auth/sign-in',
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <SignInPage />,
          </Suspense>
        ),
      },
      {
        path: '/auth/sign-up',
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <SignUpPage />,
          </Suspense>
        ),
      },
    ],
  },
]);

export { routes };
