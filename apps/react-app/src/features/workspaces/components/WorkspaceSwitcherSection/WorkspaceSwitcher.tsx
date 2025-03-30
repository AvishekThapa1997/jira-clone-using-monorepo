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

import { RenderList } from '@/shared/components/RenderList';
import { If } from '@/shared/components/If';
import { Box } from '@/shared/components/ui/box';
import { useDialog } from '@/shared/hooks/useDialog';
import type { WorkspaceCreatedEvent } from '@jira-clone/core/types';
import { cn } from '@jira-clone/core/utils';
import { useCreateWorkspaceDialog } from '../../hooks/useCreateWorkspaceDialog';
import { useGetWorkspaces } from '../../hooks/useGetWorkspaces';
import { useNewWorkspaceSubscriber } from '../../hooks/useNewWorkspaceSubscriber';
import { useSelectWorkspace } from '../../hooks/useSelectWorkspace';
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
  const { isFetching, workspaces } = useGetWorkspaces({
    enabled: isWorkspaceSwitcherOpen,
  });
  const { selectWorkspace, selectedWorkspace } = useSelectWorkspace();
  const onSuccessfulWorkspaceCreation = (event: WorkspaceCreatedEvent) => {
    if (event.data?.id) {
      closeCreateWorkspaceDialog();
      selectWorkspace(event.data);
    }
  };
  const isWorkspaceSelected = !!selectedWorkspace;

  const selectedItemStyle = {
    'bg-muted order-1': isWorkspaceSelected,
  };
  useNewWorkspaceSubscriber({
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
          <If check={!isWorkspaceSelected}>
            <Box className='min-h-10 flex items-center'>Select Workspace</Box>
          </If>
          <If check={isWorkspaceSelected}>
            <WorkspaceItem
              name={selectedWorkspace?.name}
              imageUrl={selectedWorkspace?.imageUrl}
            />
          </If>
          <ChevronsUpDownIcon size={20} className='text-muted-foreground' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('w-workspace-switcher', className)}>
          <DropdownMenuGroup className='max-h-56 flex flex-col overflow-auto'>
            <If check={isFetching && workspaces?.length === 0}>
              <WorkspaceItemSkeleton noOfItem={3} />
            </If>
            <If check={workspaces && workspaces.length > 0}>
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
            </If>
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
