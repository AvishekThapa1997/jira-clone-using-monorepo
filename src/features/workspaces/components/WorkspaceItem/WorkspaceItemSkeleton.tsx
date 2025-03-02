import { AvatarWithTextSkeleton } from '@/shared/components/AvatarWithText/AvatarWithTextSkeleton';

interface WorkspaceItemSkeletonProps {
  noOfItem: number;
}

const WorkspaceItemSkeleton = ({ noOfItem }: WorkspaceItemSkeletonProps) => {
  return Array(noOfItem)
    .fill('')
    .map((_, index) => <AvatarWithTextSkeleton key={index} />);
};

export { WorkspaceItemSkeleton };
