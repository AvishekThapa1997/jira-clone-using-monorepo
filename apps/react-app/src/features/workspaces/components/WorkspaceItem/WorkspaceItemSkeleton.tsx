import { AvatarWithLabelSkeleton } from '@/shared/components/AvatarWithLabel/AvatarWithLabelSkeleton';

interface WorkspaceItemSkeletonProps {
  noOfItem: number;
}

const WorkspaceItemSkeleton = ({ noOfItem }: WorkspaceItemSkeletonProps) => {
  return Array(noOfItem)
    .fill('')
    .map((_, index) => <AvatarWithLabelSkeleton key={index} />);
};

export { WorkspaceItemSkeleton };
