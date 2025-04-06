import React, { PropsWithChildren, useEffect } from 'react';
import { useGetWorkspaces } from '../../../features/workspaces/hooks/useGetWorkspaces';
import { If } from '@/shared/components/If';
import { Navigate, useLocation } from 'react-router';
import { Choose } from '../Choose';

const WorkspaceMembershipCheck: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isFetching, workspaceResult } = useGetWorkspaces();
  const { pathname } = useLocation();

  if (isFetching && !workspaceResult) {
    return <p>Fetching workspaces...</p>;
  }

  const canProceed = Boolean(
    workspaceResult?.allIds?.length > 0 ||
      pathname.includes('/workspaces/create'),
  );

  // Need to creat CheckWorkspacePermission that will check if user is member of that workspace or not while navigating to the workspace page
  return (
    <Choose>
      <If check={canProceed}>{children}</If>
      <If check={!canProceed}>
        <Navigate to='/workspaces/create' replace />
      </If>
    </Choose>
  );
};

export { WorkspaceMembershipCheck };
