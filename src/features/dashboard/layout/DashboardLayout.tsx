import { Outlet } from 'react-router';
import { DashboardNavigation } from '../components/DashboardNavigation';
import { MobileNavigation } from '@/shared/components/Navigation/MobileNavigation';

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavigation />
      <MobileNavigation />
      <div className='md:ml-[var(--sidebar-width)]'>
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
