import { cn } from '@/shared/util/class';

import { AvatarWithText } from '@/shared/components/AvatarWithText';
import { AvatarProps } from '@/shared/components/ui/avatar';

interface WorkspaceItemProps {
  className?: string;
  avatarProps?: AvatarProps;
  workspaceName: string;
  workspaceImageUrl?: string;
}

const WorkspaceItem = ({
  className,
  workspaceName,
  workspaceImageUrl,
  avatarProps,
}: WorkspaceItemProps) => {
  return (
    <AvatarWithText
      src={workspaceImageUrl}
      text={workspaceName}
      avatarProps={avatarProps}
      className={cn('px-2', className)}
    />
  );
};

export { WorkspaceItem };
