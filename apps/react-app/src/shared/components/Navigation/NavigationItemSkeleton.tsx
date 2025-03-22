import { Skeleton } from '../ui/skeleton';

const NavigationItemSkeleton = () => {
  return (
    <div className='flex py-2 lg:py-4 items-center gap-4'>
      <Skeleton className='size-full lg:size-6 aspect-square lg:aspect-auto lg:rounded-full' />
      <Skeleton className='max-w-40 h-3 w-full hidden lg:block'></Skeleton>
    </div>
  );
};

export { NavigationItemSkeleton };
