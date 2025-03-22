import { useLocation } from 'react-router';

export const useIsActiveRoute = (route: string) => {
  const { pathname } = useLocation();
  const isWorkspaceDetailsPage =
    route === '/dashboard' && pathname.includes('/dashboard/workspaces'); // if workspace details page then make home routes as active route
  return route === pathname || isWorkspaceDetailsPage;
};
