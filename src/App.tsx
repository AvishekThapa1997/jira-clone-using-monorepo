import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react';
import { getQueryClient } from './config/query-client';
import { routes } from './routes';

const App = () => {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
};

export default App;
