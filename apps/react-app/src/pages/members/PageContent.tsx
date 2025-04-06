import { useSelectWorkspace } from '@/features/workspaces/hooks/useSelectWorkspace';
import { Box } from '@/shared/components/ui/box';

const MembersPageContent = () => {
  const { selectedWorkspace } = useSelectWorkspace();
  return <Box>MembersPageContent - {selectedWorkspace.id}</Box>;
};

export { MembersPageContent };
