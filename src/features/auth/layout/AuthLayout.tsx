import { Outlet } from 'react-router';
import { OAuthButtonSection } from '../components/OAuthButtonSection';
import { Card, CardContent } from '@/shared/components/ui/card';
import { AuthServiceProvider } from '@/features/auth/provider/AuthServiceProvider';

const AuthLayout = () => {
  return (
    <AuthServiceProvider>
      <div className='h-svh flex justify-center px-4 items-center'>
        <div className='basis-96'>
          <Card>
            <CardContent className='p-4 space-y-4'>
              <Outlet />
              <OAuthButtonSection />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthServiceProvider>
  );
};

export { AuthLayout };
