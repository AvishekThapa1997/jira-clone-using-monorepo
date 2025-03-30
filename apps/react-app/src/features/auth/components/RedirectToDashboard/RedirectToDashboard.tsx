import { If } from '@/shared/components/If';
import { useUserSession } from '@/shared/hooks/useUserSession';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

const RedirectToDashboard = ({ children }: PropsWithChildren) => {
  const { user } = useUserSession();

  return (
    <>
      <If check={Boolean(user?.id)}>
        <Navigate to='/dashboard' replace />
      </If>
      <If check={Boolean(!user?.id)}>{children}</If>
    </>
  );
};

export default RedirectToDashboard;
