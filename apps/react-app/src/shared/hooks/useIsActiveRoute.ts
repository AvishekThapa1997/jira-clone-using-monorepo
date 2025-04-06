import { useLocation, useMatch, useMatches } from 'react-router';

export const useIsActiveRoute = (route: string) => {
  const { pathname, ...location } = useLocation();
  const currentRoute = new URL(route, window.location.origin);
  return currentRoute.pathname === pathname;
};
