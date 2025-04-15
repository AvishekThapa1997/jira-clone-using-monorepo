import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import { SettingsPageContent } from './PageContent';

const SettingsPage = () => {
  return (
    <Box className='space-y-4'>
      <Text>SettingsPage</Text>
      <SettingsPageContent />
    </Box>
  );
};

export { SettingsPage };
