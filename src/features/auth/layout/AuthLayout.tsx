import { Outlet } from 'react-router';
import { OAuthButtonSection } from '../components';
import { Card, CardContent } from '@/shared/components/ui/card';

const AuthLayout = () => {
  return (
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
  );
};

export { AuthLayout };
