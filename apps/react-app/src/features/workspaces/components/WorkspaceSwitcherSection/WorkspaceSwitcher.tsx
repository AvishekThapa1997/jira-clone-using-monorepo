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

import { Choose } from '@/shared/components/Choose';
import { If } from '@/shared/components/If';
import { RenderList } from '@/shared/components/RenderList';
import { Box } from '@/shared/components/ui/box';
import { useDialog } from '@/shared/hooks/useDialog';
import type { WorkspaceDto } from '@jira-clone/core/types';
import { cn } from '@jira-clone/core/utils';
import { startTransition, useCallback, useMemo } from 'react';
import { useCreateWorkspaceDialog } from '../../hooks/useCreateWorkspaceDialog';
import { useGetWorkspaces } from '../../hooks/useGetWorkspaces';
import { useSelectWorkspace } from '../../hooks/useSelectWorkspace';
import { WorkspaceItem } from '../Workspace';
import { WorkspaceSkeleton } from '../Workspace/WorkspaceSkeleton';
import { CreateWorkspaceFormDialog } from '../WorkspaceForm/CreateWorkspaceFormDialog';
import { useNewWorkspaceCreatedEventSubscriber } from '../../hooks/useWorkspacEvents';

interface WorkspaceSwitcherProps {
  className?: string;
}

const useWorkspaceSwitcherDropdownHandler = () => {
  const {
    isOpen: isWorkspaceSwitcherOpen,
    handleOpenChange: handleWorkspaceSwitcherOpenChange,
    close,
  } = useDialog();
  return { isWorkspaceSwitcherOpen, handleWorkspaceSwitcherOpenChange, close };
};

const WorkspaceSwitcher = ({ className }: WorkspaceSwitcherProps) => {
  const { isWorkspaceSwitcherOpen, handleWorkspaceSwitcherOpenChange, close } =
    useWorkspaceSwitcherDropdownHandler();
  const {
    isCreateWorkspaceDialogOpen,
    handleCreateWorkspaceDialogCancel,
    handleCreateWorkspaceDialogOpenChange,
    closeCreateWorkspaceDialog,
  } = useCreateWorkspaceDialog();
  const { isFetching, workspaceResult } = useGetWorkspaces({
    enabled: isWorkspaceSwitcherOpen,
  });
  const { selectWorkspace, selectedWorkspace } = useSelectWorkspace();

  // useNewWorkspaceCreatedEventSubscriber({
  //   onWorkspaceCreated(event) {
  //     alert('WORKSPACE CREATED');
  //   },
  // });

  const handleNewWorkspaceCreation = useCallback((workspace: WorkspaceDto) => {
    selectWorkspace(workspace);
    startTransition(() => {
      closeCreateWorkspaceDialog();
      close();
    });
  }, []);

  const isWorkspaceSelected = !!selectedWorkspace?.id;

  const renderedWorkspaces = useMemo(() => {
    return (
      <RenderWorkspaces
        workspaces={Object.values(workspaceResult?.data)}
        selectWorkspace={selectWorkspace}
        selectedWorkspaceId={selectedWorkspace?.id}
      />
    );
  }, [workspaceResult?.data, selectedWorkspace?.id]);

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
          <Choose>
            <If check={!isWorkspaceSelected}>
              <Box className='min-h-10 flex items-center'>Select Workspace</Box>
            </If>
            <If check={isWorkspaceSelected}>
              <WorkspaceItem
                name={selectedWorkspace?.name}
                imageUrl={selectedWorkspace?.imageUrl}
              />
            </If>
          </Choose>
          <ChevronsUpDownIcon size={20} className='text-muted-foreground' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('w-workspace-switcher', className)}>
          <DropdownMenuGroup className='max-h-56 flex flex-col overflow-auto'>
            <Choose>
              <If check={isFetching && workspaceResult?.allIds?.length === 0}>
                <WorkspaceSkeleton noOfItem={3} />
              </If>
              <If check={workspaceResult?.allIds?.length > 0}>
                {renderedWorkspaces}
              </If>
            </Choose>
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
              onWorkspacedCreated={handleNewWorkspaceCreation}
              triggerAsChild
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

type RenderWorkspaces = {
  workspaces: WorkspaceDto[];
  selectWorkspace: (workspace: WorkspaceDto) => void;
  selectedWorkspaceId?: string;
};

const RenderWorkspaces = ({
  workspaces,
  selectWorkspace,
  selectedWorkspaceId,
}: RenderWorkspaces) => {
  const selectedItemStyle = {
    'bg-muted order-1': !!selectedWorkspaceId,
  };
  return (
    <RenderList
      data={workspaces}
      render={(workspace) => {
        const isSelectedWorkspace = workspace.id === selectedWorkspaceId;
        return (
          <DropdownMenuItem
            key={workspace.id}
            className={cn(
              'cursor-pointer order-2',
              isSelectedWorkspace ? selectedItemStyle : '',
            )}
            onSelect={selectWorkspace.bind(null, workspace)}
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
  );
};
export { WorkspaceSwitcher };
