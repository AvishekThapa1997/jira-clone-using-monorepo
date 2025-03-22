import { Suspense } from 'react';
import { LazyNavigation } from './LazyNavigation';
import { NavigationSkeleton } from './NavigationSkeleton';
import { Box } from '../ui/box';

const LargeDeviceNavigation = () => {
  return (
    <Suspense
      fallback={
        <Box className='px-4'>
          <NavigationSkeleton />
        </Box>
      }
    >
      <LazyNavigation />
    </Suspense>
  );
};

export { LargeDeviceNavigation };
