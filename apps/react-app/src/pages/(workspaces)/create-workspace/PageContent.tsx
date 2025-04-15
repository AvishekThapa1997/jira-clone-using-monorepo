import { CreateWorkspaceForm } from '@/features/workspaces/components/WorkspaceForm/CreateWorkspaceForm';
import { WorkspaceFormCardWrapper } from '@/features/workspaces/components/WorkspaceForm/WorkspaceFormCardWrapper';
import { AppLogo } from '@/shared/components/AppLogo';
import { Box } from '@/shared/components/ui/box';
import type { WorkspaceDto } from '@jira-clone/core/types';
import { useNavigate } from 'react-router';

const PageContent = () => {
  const navigate = useNavigate();
  // const handleNewWorkspaceCreation = (event: WorkspaceEvent) => {
  //   const workspace = event.data?.name;
  //   if (workspace) {
  //     navigate(`/?workspace=${workspace}`, {
  //       replace: true,
  //     });
  //   }
  // };
  const handleNewWorkspaceCreation = (workspace: WorkspaceDto) => {
    if (workspace) {
      navigate(
        `/?workspace=${encodeURIComponent(workspace.name)}&workspaceId=${encodeURIComponent(workspace.id)}`,
        {
          replace: true,
        },
      );
    }
  };

  return (
    <Box className='h-svh p-4'>
      <AppLogo
        largeLogoClassname='hidden md:block'
        smallLogoClassname='block md:hidden'
      />
      <Box className='max-w-lg mx-auto'>
        <WorkspaceFormCardWrapper title='Create a new workspace'>
          <CreateWorkspaceForm
            onWorkspaceCreated={handleNewWorkspaceCreation}
          />
        </WorkspaceFormCardWrapper>
      </Box>
    </Box>
  );
};

export { PageContent };
