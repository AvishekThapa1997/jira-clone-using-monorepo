import { AvatarWithLabelSkeleton } from '@/shared/components/AvatarWithLabel/AvatarWithLabelSkeleton';

interface WorkspaceSkeletonProps {
  noOfItem: number;
}

const WorkspaceSkeleton = ({ noOfItem }: WorkspaceSkeletonProps) => {
  return Array(noOfItem)
    .fill('')
    .map((_, index) => <AvatarWithLabelSkeleton key={index} />);
};

export { WorkspaceSkeleton };
