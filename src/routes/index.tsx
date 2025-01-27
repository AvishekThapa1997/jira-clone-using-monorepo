import { createBrowserRouter } from 'react-router';
import { signInAction, signUpAction } from '../features/auth/action';
import { AuthLayout } from '../features/auth/layout';
import { DashboardLayout } from '../features/dashboard/layout/DashboardLayout';
import { SignInPage, SignUpPage } from '../pages';
import { HomePage } from '../pages/home';
import { AuthMiddlewareRoute } from '../shared/components/AuthMiddlewareRoute';
import { RootLayout } from '../shared/layout';
import { AuthProvider } from '../features/auth/provider';
const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <AuthMiddlewareRoute />,
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
            <AuthLayout />
          </AuthMiddlewareRoute>
        ),
        children: [
          {
            path: '/auth/sign-in',
            element: <SignInPage />,
            action: signInAction,
          },
          {
            path: '/auth/sign-up',
            element: <SignUpPage />,
            action: signUpAction,
          },
        ],
      },
    ],
  },
]);

export { routes };
