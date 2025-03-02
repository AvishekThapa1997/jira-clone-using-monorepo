import { cn } from '@/shared/util/class';
import { WorkspaceDto } from '../../dto/workspace-dto';

import { AvatarProps } from '@/shared/components/ui/avatar';
import { AvatarWithText } from '@/shared/components/AvatarWithText';

interface WorkspaceItemProps {
  className?: string;
  avatarProps?: AvatarProps;
  workspace: WorkspaceDto;
}

const WorkspaceItem = ({
  className,
  workspace,
  avatarProps,
}: WorkspaceItemProps) => {
  return (
    <AvatarWithText
      src={workspace.imageUrl}
      text={workspace.name}
      avatarProps={avatarProps}
      className={cn('px-2', className)}
    />
  );
};

export { WorkspaceItem };
