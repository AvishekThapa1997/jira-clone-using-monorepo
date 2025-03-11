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
import { CUSTOM_EVENT } from '@jira-clone/core/constants/shared';

import { useDialog } from '@/shared/hooks/useDialog';
import { useCustomEvent } from '@/shared/hooks/useCustomEvent';
import { cn } from '@jira-clone/core/utils';
import { useGetWorkspaces } from '../../hooks';
import { useCreateWorkspaceDialog } from '../../hooks/useCreateWorkspaceDialog';
import { CreateWorkspaceFormDialog } from '../CreateWorkspaceForm/CreateWorkspaceFormDialog';
import { WorkspaceItem } from '../WorkspaceItem';
import { WorkspaceItemSkeleton } from '../WorkspaceItem/WorkspaceItemSkeleton';

interface WorkspaceSwitcherProps {
  className?: string;
}

const WorkspaceSwitcher = ({ className }: WorkspaceSwitcherProps) => {
  const {
    isOpen: isWorkspaceSwitcherOpen,
    handleOpenChange: handleWorkspaceSwitcherOpenChange,
  } = useDialog();
  const {
    isCreateWorkspaceDialogOpen,
    handleCreateWorkspaceDialogCancel,
    handleCreateWorkspaceDialogOpenChange,
    closeCreateWorkspaceDialog,
  } = useCreateWorkspaceDialog();
  const { isFetching, workspaces } = useGetWorkspaces(
    /*enabled*/ !!isWorkspaceSwitcherOpen,
  );
  const onSuccessfulWorkspaceCreation = (isCreatedSuccessfully: boolean) => {
    if (isCreatedSuccessfully) {
      closeCreateWorkspaceDialog();
    }
  };
  useCustomEvent<boolean>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
    listenOnMount: true,
    onListen: onSuccessfulWorkspaceCreation,
  });
  return (
    <>
      <DropdownMenu
        open={isWorkspaceSwitcherOpen}
        onOpenChange={handleWorkspaceSwitcherOpenChange}
      >
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
                        name={workspace.name}
                        imageUrl={workspace.imageUrl}
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
              open={isCreateWorkspaceDialogOpen}
              onOpenChange={handleCreateWorkspaceDialogOpenChange}
              handleCancel={handleCreateWorkspaceDialogCancel}
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
