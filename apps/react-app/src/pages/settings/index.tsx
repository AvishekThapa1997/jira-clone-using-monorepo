import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import { lazy, Suspense } from 'react';

const SettingsPageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.SettingsPageContent,
  })),
);
const SettingsPage = () => {
  return (
    <Box>
      <Text>SettingsPage</Text>
      <LoadOnMount>
        <Suspense fallback={<p>settings page content loading...</p>}>
          <SettingsPageContent />
        </Suspense>
      </LoadOnMount>
    </Box>
  );
};

export { SettingsPage };
