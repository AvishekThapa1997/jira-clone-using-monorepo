import { EditWorkspaceForm } from '@/features/workspaces/components/WorkspaceForm/EditWorkspaceForm';
import { WorkspaceFormCardWrapper } from '@/features/workspaces/components/WorkspaceForm/WorkspaceFormCardWrapper';
import { WorkspaceStandaloneLayout } from '@/features/workspaces/components/WorkspaceStandaloneLayout';
import { useSelectWorkspace } from '@/features/workspaces/hooks/useSelectWorkspace';
import { If } from '@/shared/components/If';
import { Box } from '@/shared/components/ui/box';

const SettingsPageContent = () => {
  const { selectedWorkspace } = useSelectWorkspace();
  return (
    <Box className='max-w-lg mx-auto'>
      <If check={!!selectedWorkspace?.id}>
        <WorkspaceFormCardWrapper title={selectedWorkspace.name}>
          <EditWorkspaceForm selectedWorkspace={selectedWorkspace} />
        </WorkspaceFormCardWrapper>
      </If>
    </Box>
  );
};

export { SettingsPageContent };
