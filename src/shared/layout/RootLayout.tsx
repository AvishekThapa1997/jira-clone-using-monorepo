import { Outlet } from 'react-router';
import { Toaster } from '../components/ui/toaster';
import { useAuthStatus } from '../hooks';

const RootLayout = () => {
  const { isLoading } = useAuthStatus();
  return (
    <div className='max-w-[1600px] mx-auto '>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Outlet />
        </>
      )}
      <Toaster />
    </div>
  );
};

export { RootLayout };
