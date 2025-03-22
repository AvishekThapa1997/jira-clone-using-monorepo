import { Skeleton } from '../ui/skeleton';

const AvatarWithLabelSkeleton = () => {
  return (
    <div className='flex gap-4 px-4 py-2 items-center'>
      <Skeleton className='size-8 aspect-square rounded-full' />
      <Skeleton className='h-3 w-full' />
    </div>
  );
};

export { AvatarWithLabelSkeleton };
