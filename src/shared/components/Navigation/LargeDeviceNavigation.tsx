import { Suspense } from 'react';
import { LazyNavigation } from './LazyNavigation';
import { NavigationSkeleton } from './NavigationSkeleton';

const LargeDeviceNavigation = () => {
  return (
    <Suspense>
      <LazyNavigation
        className='hidden md:block'
        navItemClassName='gap-4 lg:gap-3 py-3 lg:p-4  max-lg:justify-center'
      />
    </Suspense>
  );
};

export { LargeDeviceNavigation };
