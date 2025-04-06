import { getQueryClient } from '@/config/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export { ReactQueryClientProvider };
