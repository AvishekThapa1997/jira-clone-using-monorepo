import { Outlet } from 'react-router';
import { Toaster } from '../components/ui/toaster';
import { useAuthStatus } from '../hooks/useAuthStatus';

const RootLayout = () => {
  const { isLoading } = useAuthStatus();
  return (
    <div className='max-w-[1600px] mx-auto '>
      <Outlet />
      <Toaster />
    </div>
  );
};

export { RootLayout };
