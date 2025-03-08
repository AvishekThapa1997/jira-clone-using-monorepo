import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { lazy, Suspense } from 'react';

const TaskPageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.TaskPageContent,
  })),
);
const TaskPage = () => {
  return (
    <div>
      <p>Task Page</p>
      <LoadOnMount>
        <Suspense fallback={<p>Task page content loading...</p>}>
          <TaskPageContent />
        </Suspense>
      </LoadOnMount>
    </div>
  );
};

export { TaskPage };
