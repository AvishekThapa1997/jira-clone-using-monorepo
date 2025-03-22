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

import { RenderList } from '@/shared/components/RenderList';
import { Show } from '@/shared/components/Show';
import { useDialog } from '@/shared/hooks/useDialog';
import { useEventSuscriber } from '@/shared/hooks/useEventSubscriber';
import { cn } from '@jira-clone/core/utils';
import { useCreateWorkspaceDialog } from '../../hooks/useCreateWorkspaceDialog';
import { useGetWorkspaces } from '../../hooks/useGetWorkspaces';
import { useSelectWorkspace } from '../../hooks/useSelectWorkspace';
import { CreateWorkspaceFormDialog } from '../CreateWorkspaceForm/CreateWorkspaceFormDialog';
import { WorkspaceItem } from '../WorkspaceItem';
import { WorkspaceItemSkeleton } from '../WorkspaceItem/WorkspaceItemSkeleton';
import { Box } from '@/shared/components/ui/box';
import { ResponsiveDialog } from '@/shared/components/ResponsiveDialog/ResponsiveDialog';

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
  const { selectWorkspace, selectedWorkspace } = useSelectWorkspace();
  const onSuccessfulWorkspaceCreation = (isCreatedSuccessfully: boolean) => {
    if (isCreatedSuccessfully) {
      closeCreateWorkspaceDialog();
    }
  };
  const isWorkspaceSelected = !!selectedWorkspace;

  const selectedItemStyle = {
    'bg-muted order-1': isWorkspaceSelected,
  };
  useEventSuscriber<boolean>({
    eventName: CUSTOM_EVENT.WORKSPACE_CREATED,
    subscriber: onSuccessfulWorkspaceCreation,
  });

  return (
    <>
      <DropdownMenu
        open={isWorkspaceSwitcherOpen}
        onOpenChange={handleWorkspaceSwitcherOpenChange}
      >
        <DropdownMenuTrigger
          className={cn(
            'w-full outline-none focus-visible:ring-transparent px-3 py-1.5  flex border rounded-md items-center justify-between',
          )}
        >
          <Show show={!isWorkspaceSelected}>
            <Box className='min-h-10 flex items-center'>Select Workspace</Box>
          </Show>
          <Show show={isWorkspaceSelected}>
            <WorkspaceItem
              name={selectedWorkspace?.name}
              imageUrl={selectedWorkspace?.imageUrl}
            />
          </Show>
          <ChevronsUpDownIcon size={20} className='text-muted-foreground' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('w-workspace-switcher', className)}>
          <DropdownMenuGroup className='max-h-56 flex flex-col overflow-auto'>
            <Show show={isFetching}>
              <WorkspaceItemSkeleton noOfItem={3} />
            </Show>
            <Show show={workspaces && workspaces.length > 0}>
              <RenderList
                data={workspaces}
                render={(workspace) => {
                  const isSelectedWorkspace =
                    workspace.id === selectedWorkspace?.id;
                  return (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        console.log(e);
                      }}
                      key={workspace.id}
                      className={cn(
                        'cursor-pointer order-2',
                        isSelectedWorkspace ? selectedItemStyle : '',
                      )}
                      onClick={() => selectWorkspace(workspace)}
                      asChild
                    >
                      <Box>
                        <WorkspaceItem
                          name={workspace.name}
                          imageUrl={workspace.imageUrl}
                        />
                      </Box>
                    </DropdownMenuItem>
                  );
                }}
              />
            </Show>
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
