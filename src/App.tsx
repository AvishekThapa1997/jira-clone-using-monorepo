import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { routes } from './routes';
import { getQueryClient } from './config/query-client';
import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeWrapper } from './shared/components/ThemeWrapper';

const App = () => {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeWrapper>
    </QueryClientProvider>
  );
};

export default App;
