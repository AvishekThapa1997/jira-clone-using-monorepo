import { Box } from '@/shared/components/ui/box';
import { Card, CardContent } from '@/shared/components/ui/card';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box className='h-svh flex justify-center px-4 items-center'>
      <Box className='basis-96'>
        <Card>
          <CardContent className='p-4 space-y-4'>{children}</CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export { AuthLayout };
