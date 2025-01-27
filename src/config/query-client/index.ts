import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient;
export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
};
