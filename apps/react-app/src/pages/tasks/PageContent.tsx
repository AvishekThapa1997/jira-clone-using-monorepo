import { useSelectWorkspace } from '@/features/workspaces/hooks/useSelectWorkspace';
import { Box } from '@/shared/components/ui/box';

const TaskPageContent = () => {
  const { selectedWorkspace } = useSelectWorkspace();
  return <Box>TaskPageContent - {selectedWorkspace.id}</Box>;
};

export { TaskPageContent };
