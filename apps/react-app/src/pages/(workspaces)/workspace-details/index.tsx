import React, { lazy, Suspense } from 'react';

const PageContent = lazy(() =>
  import('./PageContent').then(({ PageContent }) => ({
    default: PageContent,
  })),
);

const WorkspacePage = () => {
  return (
    <div>
      <h2>WorkspacePage</h2>
      <Suspense fallback={<p>Workspace loading...</p>}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export { WorkspacePage };
