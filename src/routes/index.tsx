import { createBrowserRouter } from 'react-router';
import { SignInPage, SignUpPage } from '../pages';
import { RootLayout } from '../shared/layout';
import { AuthLayout } from '../features/auth/layout';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
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
