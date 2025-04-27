import { useQuery } from '@tanstack/react-query';
import { getUserSession } from '../service';

export const useGetSession = () => {
  const result = useQuery({
    queryKey: ['session'],
    queryFn: () => getUserSession(),
  });
  return { ...result, user: result?.data?.data };
};
