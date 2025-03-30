import React, { PropsWithChildren, useEffect } from 'react';
import { useGetWorkspaces } from '../../../features/workspaces/hooks/useGetWorkspaces';
import { If } from '@/shared/components/If';
import { Navigate, useLocation } from 'react-router';

const WorkspaceMembershipCheck: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isFetching, workspaces } = useGetWorkspaces();
  const { pathname } = useLocation();

  if (isFetching && !workspaces) {
    return <p>Fetching workspaces...</p>;
  }

  const canProceed = Boolean(
    workspaces?.length > 0 || pathname.includes('/workspaces/create'),
  );
  console.log({ workspaces });
  // Need to creat CheckWorkspacePermission that will check if user is member of that workspace or not while navigating to the workspace page
  return (
    <>
      <If check={canProceed}>{children}</If>
      <If check={!canProceed}>
        <Navigate to='/workspaces/create' replace />
      </If>
    </>
  );
};

export { WorkspaceMembershipCheck };
