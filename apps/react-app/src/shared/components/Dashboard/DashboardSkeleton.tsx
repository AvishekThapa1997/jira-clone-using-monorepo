import { WorkspaceSwitcherSkeleton } from '@/features/workspaces/components/WorkspaceSwitcherSection/WorkspaceSwitcherSkeleton';
import { NavigationSkeleton } from '../Navigation/NavigationSkeleton';
import { Skeleton } from '../ui/skeleton';
import { Dashboard, DashboardLeft, DashboardRight } from './Dashboard';
import { Box } from '../ui/box';

const DashboardSkeleton = () => {
  return (
    <Dashboard>
      <DashboardLeft>
        <DashboardLeftSkeleton />
      </DashboardLeft>
      <DashboardRight>
        <Box className='space-y-4'>
          <Skeleton className='w-full max-w-16 h-6 rounded-sm' />
          <Skeleton className='w-full max-w-80 h-5 rounded-sm' />
        </Box>
      </DashboardRight>
    </Dashboard>
  );
};

const DashboardLeftSkeleton = () => {
  return (
    <>
      <Box className='p-2 border-b'>
        <Skeleton className='h-10 max-w-40 mx-auto' />
      </Box>
      <Box className='p-4 hidden lg:block'>
        <WorkspaceSwitcherSkeleton />
      </Box>
      <Box className='px-4'>
        <NavigationSkeleton />
      </Box>
    </>
  );
};
export { DashboardSkeleton, DashboardLeftSkeleton };
