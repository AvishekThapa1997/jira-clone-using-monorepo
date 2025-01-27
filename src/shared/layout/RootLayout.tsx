import { Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const RootLayout = () => {
  const { isLoading } = useAuth();
  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export { RootLayout };
