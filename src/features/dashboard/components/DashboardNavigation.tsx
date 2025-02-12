import { LargeDeviceNavigation } from '../../../shared/components/Navigation';
import { LargeDeviceLogo, SmallLogo } from '../../../shared/components/AppLogo';
import { Link } from 'react-router';
import { Separator } from '@/shared/components/ui/separator';

const DashboardNavigation = () => {
  return (
    <aside className='md:w-sidebar-width fixed hidden md:block bg-stone-50 border-r h-svh shadow-sm'>
      <div className='flex p-2 justify-center items-center'>
        <Link to='/' replace>
          <LargeDeviceLogo width={160} />
          <SmallLogo width={35} />
        </Link>
      </div>
      <Separator className='mt-0 mb-4' />
      <LargeDeviceNavigation />
    </aside>
  );
};

export { DashboardNavigation };
