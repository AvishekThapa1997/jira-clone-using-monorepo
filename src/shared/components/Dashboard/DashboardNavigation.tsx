import { Separator } from '@/shared/components/ui/separator';
import { Link } from 'react-router';
import { LargeDeviceLogo, SmallLogo } from '../../../shared/components/AppLogo';

import { WorkspaceSwitchSection } from '@/features/workspaces/components/WorkspaceSwitcherSection';
import { LargeDeviceNavigation } from '../Navigation';

const DashboardNavigation = () => {
  return (
    <>
      <div className='flex p-2 justify-center items-center'>
        <Link to='/' replace>
          <LargeDeviceLogo width={160} />
          <SmallLogo width={35} />
        </Link>
      </div>
      <Separator className='mt-0 mb-4' />
      <div className='my-4 px-4'>
        <WorkspaceSwitchSection />
      </div>
      <LargeDeviceNavigation />
    </>
  );
};

export { DashboardNavigation };
