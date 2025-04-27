import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@/shared/layout';

import { AuthErrorBoundary } from '@/features/auth/components/AuthErrorBoundary';

import RedirectToDashboard from '@/features/auth/components/RedirectToDashboard/RedirectToDashboard';
import { dashboardLoader } from '@/shared/components/Dashboard/dashboard-loader';
import { DashboardSkeleton } from '@/shared/components/Dashboard/DashboardSkeleton';
import { SuspenseWrapper } from '@/shared/components/SuspenseWrapper';
import { lazy } from 'react';

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

const RequireAuth = lazy(() =>
  import('@/shared/components/RequireAuth').then((module) => ({
    default: module.RequireAuth,
  })),
);

const WorkspaceMembershipCheck = lazy(() =>
  import('@/shared/components/RouteMiddleware/WorkspaceMembershipCheck').then(
    (module) => ({ default: module.WorkspaceMembershipCheck }),
  ),
);

/**
 * Defines the application's routing structure using `createBrowserRouter`.
 *
 * The routes are organized into the following categories:
 *
 * - **Protected Routes**: These routes are accessible only to authenticated users.
 *   - `/`: The root route containing the main layout and dashboard.
 *     - `HomePage`: The default page under the dashboard.
 *     - `/tasks`: Displays the TaskPage.
 *     - `/members`: Displays the MembersPage (currently reuses TaskPage).
 *     - `/settings`: Displays the SettingsPage.
 *   - `/workspaces/create`: A route for creating a new workspace.
 *
 * - **Authentication Pages**: These routes are for user authentication.
 *   - `/auth/sign-in`: The sign-in page, redirects to the dashboard if already authenticated.
 *   - `/auth/sign-up`: The sign-up page, redirects to the dashboard if already authenticated.
 *
 * Each route is wrapped with appropriate components for functionality:
 * - `AuthErrorBoundary`: Handles authentication-related errors.
 * - `SuspenseWrapper`: Provides fallback UI while components are loading.
 * - `ProtectedRoute`: Ensures the route is accessible only to authenticated users.
 * - `RedirectToDashboard`: Redirects authenticated users away from authentication pages.
 */
export const routes = createBrowserRouter([
  {
    element: (
      <AuthErrorBoundary>
        <RootLayout />
      </AuthErrorBoundary>
    ),
    /*PROTECTED ROUTES STARTS*/
    children: [
      {
        element: (
          <SuspenseWrapper fallback={<DashboardSkeleton />}>
            <RequireAuth>
              <WorkspaceMembershipCheck>
                <Dashboard />
              </WorkspaceMembershipCheck>
            </RequireAuth>
          </SuspenseWrapper>
        ),
        HydrateFallback: DashboardSkeleton,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper fallback={<p>Home page loading...</p>}>
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'tasks',
            element: (
              <SuspenseWrapper fallback={<p>Task page loading...</p>}>
                <RequireAuth>
                  <TaskPage />
                </RequireAuth>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'members',
            element: (
              <SuspenseWrapper fallback={<p>Members page loading...</p>}>
                <RequireAuth>
                  <MembersPage />
                </RequireAuth>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'settings',
            element: (
              <SuspenseWrapper fallback={<p>Settings page loading...</p>}>
                <RequireAuth>
                  <SettingsPage />
                </RequireAuth>
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        children: [
          {
            path: '/workspaces/create',
            element: (
              <SuspenseWrapper fallback={<DashboardSkeleton />}>
                <RequireAuth>
                  <CreateWorkspacePage />
                </RequireAuth>
              </SuspenseWrapper>
            ),
          },
        ],
      },
      /*PROTECTED ROUTES END*/
      /*AUTH PAGES*/
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            element: (
              <SuspenseWrapper fallback={<DashboardSkeleton />}>
                <RedirectToDashboard>
                  <SignInPage />
                </RedirectToDashboard>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'sign-up',
            element: (
              <SuspenseWrapper fallback={<DashboardSkeleton />}>
                <RedirectToDashboard>
                  <SignUpPage />
                </RedirectToDashboard>
              </SuspenseWrapper>
            ),
          },
        ],
      },
      /*AUTH PAGES*/
    ],
  },
]);
