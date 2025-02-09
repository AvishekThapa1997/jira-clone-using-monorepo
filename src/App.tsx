import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { routes } from './routes';
import { getQueryClient } from './config/query-client';
import { useState } from 'react';
import { CssBaseline } from '@mui/material';

const App = () => {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
};

export default App;
