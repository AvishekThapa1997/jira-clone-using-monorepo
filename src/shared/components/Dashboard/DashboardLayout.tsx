import { Outlet } from 'react-router';

import { MobileNavigation } from '@/shared/components/Navigation/MobileNavigation';
import { DashboardNavigation } from './DashboardNavigation';

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavigation />
      <MobileNavigation />
      <main className='md:ml-[var(--sidebar-width)] p-2 md:p-4'>
        <Outlet />
      </main>
    </div>
  );
};

export { DashboardLayout };
