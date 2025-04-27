import { Box } from '@/shared/components/ui/box';
import { Skeleton } from '@/shared/components/ui/skeleton';

const WorkspaceSwitcherSkeleton = () => {
  return (
    <Box className='hidden lg:flex  items-center rounded-md gap-4 border px-2 py-3 ring-0 '>
      <Box>
        <Skeleton className='size-6 rounded-full' />
      </Box>
      <Skeleton className='h-4 w-full' />
    </Box>
  );
};

export { WorkspaceSwitcherSkeleton };
