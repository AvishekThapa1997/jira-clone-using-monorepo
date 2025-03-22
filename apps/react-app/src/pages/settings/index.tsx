import { LoadOnMount } from '@/shared/components/LoadOnMount';
import { lazy, Suspense } from 'react';

const SettingsPageContent = lazy(() =>
  import('./PageContent').then((module) => ({
    default: module.SettingsPageContent,
  })),
);
const SettingsPage = () => {
  return (
    <div>
      <p>SettingsPage</p>
      <LoadOnMount>
        <Suspense fallback={<p>settings page content loading...</p>}>
          <SettingsPageContent />
        </Suspense>
      </LoadOnMount>
    </div>
  );
};

export { SettingsPage };
