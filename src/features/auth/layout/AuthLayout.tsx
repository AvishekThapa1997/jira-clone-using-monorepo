import { Outlet } from 'react-router';
import { OAuthButtonSection } from '../components';
import { Card, CardContent } from '@/shared/components/ui/card';

const AuthLayout = () => {
  return (
    <div className='h-svh grid grid-cols-12 px-4 items-center'>
      <div className='col-span-full sm:col-start-3 lg:col-start-4 lg:col-span-6 sm:col-span-8 xl:col-start-5 xl:col-span-4'>
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
