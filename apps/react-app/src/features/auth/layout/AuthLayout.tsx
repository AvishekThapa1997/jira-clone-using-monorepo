import { AuthServiceProvider } from '@/features/auth/provider/AuthServiceProvider';
import { Card, CardContent } from '@/shared/components/ui/card';
import { PropsWithChildren } from 'react';
import { OAuthButtonSection } from '../components/OAuthButtonSection';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-svh flex justify-center px-4 items-center'>
      <div className='basis-96'>
        <Card>
          <CardContent className='p-4 space-y-4'>
            <AuthServiceProvider>
              {children}
              <OAuthButtonSection />
            </AuthServiceProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { AuthLayout };
