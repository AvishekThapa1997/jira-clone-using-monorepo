import { getQueryClient } from '@/config/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { ReactQueryClientProvider };
