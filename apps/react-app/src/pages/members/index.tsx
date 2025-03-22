import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { lazy, Suspense } from 'react';

const MembersPageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.MembersPageContent,
  })),
);
const MembersPage = () => {
  return (
    <div>
      <p>Members Page</p>
      <LoadOnMount>
        <Suspense fallback={<p>Member page content loading...</p>}>
          <MembersPageContent />
        </Suspense>
      </LoadOnMount>
    </div>
  );
};

export { MembersPage };
