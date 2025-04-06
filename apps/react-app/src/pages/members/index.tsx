import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import { lazy, Suspense } from 'react';

const MembersPageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.MembersPageContent,
  })),
);
const MembersPage = () => {
  return (
    <Box>
      <Text>Members Page</Text>
      <LoadOnMount>
        <Suspense fallback={<p>Member page content loading...</p>}>
          <MembersPageContent />
        </Suspense>
      </LoadOnMount>
    </Box>
  );
};

export { MembersPage };
