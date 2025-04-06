import { Choose } from '@/shared/components/Choose';
import { If } from '@/shared/components/If';
import { useUserSession } from '@/shared/hooks/useUserSession';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

const RedirectToDashboard = ({ children }: PropsWithChildren) => {
  const { user } = useUserSession();

  return (
    <Choose>
      <If check={Boolean(user?.id)}>
        <Navigate to='/' replace />
      </If>
      <If check={Boolean(!user?.id)}>{children}</If>
    </Choose>
  );
};

export default RedirectToDashboard;
