import { WorkspaceSwitcherSkeleton } from '@/features/workspaces/components/WorkspaceSwitcherSection/WorkspaceSwitcherSkeleton';
import { NavigationSkeleton } from '../Navigation/NavigationSkeleton';
import { Skeleton } from '../ui/skeleton';
import {
  DashboardLayout,
  DashboardLeft,
  DashboardRight,
} from './DashboardLayout';

const DashboardSkeleton = () => {
  return (
    <DashboardLayout>
      <DashboardLeft>
        <DashboardLeftSkeleton />
      </DashboardLeft>
      <DashboardRight>
        <div className='space-y-4'>
          <Skeleton className='w-full max-w-16 h-6 rounded-sm' />
          <Skeleton className='w-full max-w-80 h-5 rounded-sm' />
        </div>
      </DashboardRight>
    </DashboardLayout>
  );
};

const DashboardLeftSkeleton = () => {
  return (
    <>
      <div className='p-2 border-b'>
        <Skeleton className='h-12 max-w-40 mx-auto' />
      </div>
      <div className='p-4 hidden lg:block'>
        <WorkspaceSwitcherSkeleton />
      </div>
      <div className='px-4'>
        <NavigationSkeleton />
      </div>
    </>
  );
};
export { DashboardSkeleton, DashboardLeftSkeleton };
