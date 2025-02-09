import { Outlet } from 'react-router';
import { OAuthButtonSection } from '../components';
import { Box, Container, Paper, Stack } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box minHeight='100svh'>
      <Stack
        height='100%'
        direction='column'
        alignItems='center'
        justifyContent='center'
        paddingY={4}
        paddingX={2}
      >
        <Container maxWidth='sm'>
          <Paper>
            <Box padding={4}>
              <Outlet />
              <Box>
                <OAuthButtonSection />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Stack>
    </Box>
  );
};

export { AuthLayout };
