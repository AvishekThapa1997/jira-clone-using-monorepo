import { useSelectWorkspace } from '@/features/workspaces/hooks/useSelectWorkspace';
import { Box } from '@/shared/components/ui/box';

const SettingsPageContent = () => {
  const { selectedWorkspace } = useSelectWorkspace();
  return <Box>SettingsPageContent - {selectedWorkspace.id}</Box>;
};

export { SettingsPageContent };
