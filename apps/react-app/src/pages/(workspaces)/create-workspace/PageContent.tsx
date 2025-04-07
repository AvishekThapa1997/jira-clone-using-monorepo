import { CreateWorkspaceForm } from '@/features/workspaces/components/CreateWorkspaceForm/CreateWorkspaceForm';
import { useNewWorkspaceSubscriber } from '@/features/workspaces/hooks/useNewWorkspaceSubscriber';
import { AppLogo } from '@/shared/components/AppLogo';
import { Box } from '@/shared/components/ui/box';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Text } from '@/shared/components/ui/text';
import type { WorkspaceCreatedEvent } from '@jira-clone/core/types';
import { useNavigate } from 'react-router';

const PageContent = () => {
  const navigate = useNavigate();
  const handleNewWorkspaceCreation = (event: WorkspaceCreatedEvent) => {
    const workspace = event.data?.name;
    if (workspace) {
      navigate(`/?workspace=${workspace}`, {
        replace: true,
      });
    }
  };
  useNewWorkspaceSubscriber({
    subscriber: handleNewWorkspaceCreation,
  });
  return (
    <Box className='h-svh p-4'>
      <AppLogo
        largeLogoClassname='hidden md:block'
        smallLogoClassname='block md:hidden'
      />
      <Card className='mt-10 max-w-lg  mx-auto px-2'>
        <CardContent className='space-y-4'>
          <Text asChild className='font-medium text-lg'>
            <h2>Create a new workspace</h2>
          </Text>
          <CreateWorkspaceForm />
        </CardContent>
      </Card>
    </Box>
  );
};

export { PageContent };
