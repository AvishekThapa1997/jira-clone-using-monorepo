import { Skeleton } from '@/shared/components/ui/skeleton';

const WorkspaceSwitcherSkeleton = () => {
  return (
    <div className='flex items-center rounded-md gap-4 border px-2 py-3 ring-0 '>
      <div>
        <Skeleton className='size-6 rounded-full' />
      </div>
      <Skeleton className='h-4 w-full' />
    </div>
  );
};

export { WorkspaceSwitcherSkeleton };
