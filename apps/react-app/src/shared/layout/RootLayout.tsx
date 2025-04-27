import { UserSessionProvider } from '@/features/auth/provider/UserSessionProvider';
import { Outlet } from 'react-router';
import { Box } from '../components/ui/box';
import { Toaster } from '../components/ui/toaster';
import { ReactQueryClientProvider } from '../provider/ReactQueryClientProvider';

const RootLayout = () => {
  return (
    <Box className='max-w-[1600px] mx-auto '>
      <ReactQueryClientProvider>
        <UserSessionProvider>
          <Outlet />
          <Toaster />
        </UserSessionProvider>
      </ReactQueryClientProvider>
    </Box>
  );
};

export { RootLayout };
