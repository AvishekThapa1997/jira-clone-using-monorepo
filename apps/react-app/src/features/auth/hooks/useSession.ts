import { useQuery } from '@tanstack/react-query';
import { getUserSession } from '../service';
import { AUTH_QUERY_KEY } from '@jira-clone/core/keys/auth';
export const useSession = () => {
  const result = useQuery({
    queryKey: AUTH_QUERY_KEY.USER_SESSION,
    queryFn: () => getUserSession(),
    retry: false,
  });
  console.log({ result });
  return { ...result, user: result?.data?.data };
};
