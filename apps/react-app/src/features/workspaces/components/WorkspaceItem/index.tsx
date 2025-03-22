import { AvatarItem } from '@/shared/components/AvatarItem';
import {
  Avatar,
  AvatarError,
  AvatarFallback,
  AvatarImage,
  AvatarLoading,
} from '@/shared/components/ui/avatar';
import { Text } from '@/shared/components/ui/text';

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
  const avatarFallbackText =
    workspaceName.length > 2 ? workspaceName.slice(0, 2) : workspaceName;
  return (
    <>
      <AvatarItem
        className={className}
        avatar={
          <Avatar className='flex-row-reverse'>
            <AvatarImage src={workspaceImageUrl} />
            <AvatarFallback>
              <AvatarLoading />
              <AvatarError>
                <Text asChild>
                  <span>{avatarFallbackText}</span>
                </Text>
              </AvatarError>
            </AvatarFallback>
          </Avatar>
        }
        text={workspaceName}
      />
    </>
  );
};

export { WorkspaceItem };
