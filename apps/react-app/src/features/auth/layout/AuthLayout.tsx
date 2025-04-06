import { AuthServiceProvider } from '@/features/auth/provider/AuthServiceProvider';
import { Card, CardContent } from '@/shared/components/ui/card';
import { PropsWithChildren } from 'react';
import { OAuthButtonSection } from '../components/OAuthButtonSection';
import { Box } from '@/shared/components/ui/box';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box className='h-svh flex justify-center px-4 items-center'>
      <Box className='basis-96'>
        <Card>
          <CardContent className='p-4 space-y-4'>
            <AuthServiceProvider>
              {children}
              <OAuthButtonSection />
            </AuthServiceProvider>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export { AuthLayout };
