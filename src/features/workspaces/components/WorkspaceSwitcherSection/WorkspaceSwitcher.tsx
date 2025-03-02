import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { CUSTOM_EVENT } from '@/shared/constants';
import { useCustomEvent } from '@/shared/hooks';
import { useToggle } from '@/shared/hooks/useToggle';
import { cn } from '@/shared/util/class';
import { useCallback } from 'react';
import { WorkspaceDto } from '../../dto/workspace-dto';
import { CreateWorkspaceFormDialog } from '../CreateWorkspaceForm/CreateWorkspaceFormDialog';
import { WorkspaceItem } from '../WorkspaceItem';
import { WorkspaceItemSkeleton } from '../WorkspaceItem/WorkspaceItemSkeleton';

interface WorkspaceSwitcherProps {
  className?: string;
  handleOpenChange: (open: boolean) => void;
  workspaces?: WorkspaceDto[];
  isFetching: boolean;
}

const WorkspaceSwitcher = ({
  className,
  handleOpenChange,
  workspaces,
  isFetching,
}: WorkspaceSwitcherProps) => {
  const { toggle, toggleValue } = useToggle();

  const hanldeWorkspaceDialogOpenChange = (open: boolean) => {
    toggle(open);
  };
  const handleWorkspaceDialogCancel = () => {
    toggle(false);
  };
  const onSuccessfulWorkspaceCreation = useCallback(
    (isCreatedSuccessfully: boolean) => {
      if (isCreatedSuccessfully) {
        toggle(false);
      }
    },
    [toggle],
  );
  useCustomEvent<boolean>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
    listenOnMount: true,
    onListen: onSuccessfulWorkspaceCreation,
  });
  return (
    <>
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger className='w-full outline-none  focus-visible:ring-transparent flex py-3 px-2 border rounded-md items-center justify-between'>
          <span>Select Workspace</span>
          <ChevronsUpDownIcon size={20} className='text-muted-foreground' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('w-workspace-switcher', className)}>
          <DropdownMenuGroup className='max-h-56 overflow-auto'>
            {isFetching && <WorkspaceItemSkeleton noOfItem={3} />}
            {workspaces && workspaces.length > 0 ? (
              <>
                {workspaces.map((workspace) => {
                  return (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        console.log(e);
                      }}
                      key={workspace.id}
                      className='cursor-pointer'
                    >
                      <WorkspaceItem
                        workspaceName={workspace.name}
                        workspaceImageUrl={workspace.imageUrl}
                      />
                    </DropdownMenuItem>
                  );
                })}
              </>
            ) : null}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <CreateWorkspaceFormDialog
              open={toggleValue}
              onOpenChange={hanldeWorkspaceDialogOpenChange}
              handleCancel={handleWorkspaceDialogCancel}
              trigger={
                <Button variant='ghost' className='w-full'>
                  <PlusCircleIcon className='text-muted-foreground' />
                  <span>Create Workspace</span>
                </Button>
              }
              triggerAsChild
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { WorkspaceSwitcher };
