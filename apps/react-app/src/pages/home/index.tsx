import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { PageHeader } from '@/shared/components/PageHeader';
import { Box } from '@/shared/components/ui/box';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { lazy, Suspense } from 'react';
const PageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.PageContent,
  })),
);

const HomePage = () => {
  const { isExtraLargeDevice, isLargeDevice, isMediumDevice, isSmallDevice } =
    useScreenSize();
  console.log({
    isExtraLargeDevice,
    isLargeDevice,
    isMediumDevice,
    isSmallDevice,
  });
  return (
    <Box>
      <PageHeader
        title='Home'
        description='Monitor all of your projects and tasks here.'
      />
      <LoadOnMount>
        <Suspense fallback={<p>Home page content loading.......</p>}>
          <PageContent />
        </Suspense>
      </LoadOnMount>
    </Box>
  );
};

export { HomePage };
