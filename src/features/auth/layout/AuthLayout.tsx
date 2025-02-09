import { Outlet } from 'react-router';
import { OAuthButtonSection } from '../components';

import { Box, Card, Container, VStack } from '@chakra-ui/react';

const AuthLayout = () => {
  return (
    <Box>
      <VStack minHeight='svh' justifyContent='center'>
        <Container maxW='xl'>
          <Card.Root>
            <Card.Body>
              <VStack gap={3} alignItems='stretch'>
                <Outlet />
                <OAuthButtonSection />
              </VStack>
            </Card.Body>
          </Card.Root>
        </Container>
      </VStack>
    </Box>
  );
};

export { AuthLayout };
