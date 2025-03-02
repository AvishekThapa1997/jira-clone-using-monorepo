import { PageHeader } from '@/shared/components/PageHeader';

import { lazy, Suspense } from 'react';
const PageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.PageContent,
  })),
);

const HomePage = () => {
  return (
    <div className='space-y-4'>
      <PageHeader
        title='Home'
        description='Monitor all of your projects and tasks here.'
      />
      <Suspense fallback={<p>Home page content loading.......</p>}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export { HomePage };
