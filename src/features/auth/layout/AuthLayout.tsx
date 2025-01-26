import { Box, Card, Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router';
import { OAuthButtonSection } from '../components';

const AuthLayout = () => {
  return (
    <main className='h-svh'>
      <Flex className='h-full' align='center' justify='center'>
        <Box className='basis-full max-w-md mx-auto'>
          <Card size='3' className='p-6'>
            <Outlet />
            <Box className='pt-6 border-t'>
              <OAuthButtonSection />
            </Box>
          </Card>
        </Box>
      </Flex>
    </main>
  );
};

export { AuthLayout };
