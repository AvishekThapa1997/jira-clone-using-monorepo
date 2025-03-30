import { Outlet } from 'react-router';
import { Toaster } from '../components/ui/toaster';
import { ReactQueryClientProvider } from '../provider/ReactQueryClientProvider';
import { UserSessionProvider } from '@/features/auth/provider/UserSessionProvider';

const RootLayout = () => {
  return (
    <div className='max-w-[1600px] mx-auto '>
      <UserSessionProvider>
        <ReactQueryClientProvider>
          <Outlet />
        </ReactQueryClientProvider>
        <Toaster />
      </UserSessionProvider>
    </div>
  );
};

export { RootLayout };
