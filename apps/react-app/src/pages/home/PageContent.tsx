import { WorkspaceSwitchSection } from '@/features/workspaces/components/WorkspaceSwitcherSection';
import { Box } from '@/shared/components/ui/box';

const PageContent = () => {
  return (
    <Box className='p-2'>
      <Box className='max-w-64 lg:hidden'>
        <WorkspaceSwitchSection />
      </Box>
    </Box>
  );
};

export { PageContent };
