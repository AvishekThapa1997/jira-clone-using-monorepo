import { cn } from '@jira-clone/core/utils';

import {
  AvatarLabel,
  AvatarWithLabel,
} from '@/shared/components/AvatarWithLabel';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
  AvatarTextInitial,
} from '@/shared/components/ui/avatar';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface WorkspaceItemProps {
  className?: string;
  name: string;
  imageUrl?: string;
}

const WorkspaceItem = ({
  className,
  name: workspaceName,
  imageUrl: workspaceImageUrl,
}: WorkspaceItemProps) => {
  return (
    <AvatarWithLabel className={cn(className)}>
      <Avatar className='flex-row-reverse'>
        <AvatarImage src={workspaceImageUrl} />
        <AvatarFallback
          render={(status) => {
            if (status === 'loading') {
              return <Skeleton className='h-full w-full' />;
            }
            if (status === 'error') {
              return <AvatarTextInitial text={workspaceName} />;
            }
          }}
        />
      </Avatar>
      <AvatarLabel>{workspaceName}</AvatarLabel>
    </AvatarWithLabel>
  );
};

export { WorkspaceItem };
