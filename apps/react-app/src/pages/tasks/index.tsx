import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import { lazy, Suspense } from 'react';

const TaskPageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.TaskPageContent,
  })),
);
const TaskPage = () => {
  return (
    <Box>
      <Text>Task Page</Text>
      <LoadOnMount>
        <Suspense fallback={<p>Task page content loading...</p>}>
          <TaskPageContent />
        </Suspense>
      </LoadOnMount>
    </Box>
  );
};

export { TaskPage };
