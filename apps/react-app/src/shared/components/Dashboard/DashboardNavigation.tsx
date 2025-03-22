import { Separator } from '@/shared/components/ui/separator';
import { Link } from 'react-router';
import { LargeDeviceLogo, SmallLogo } from '../AppLogo';

import { WorkspaceSwitchSection } from '@/features/workspaces/components/WorkspaceSwitcherSection';

import { LoadOnMount } from '../LoadOnMount';
import { LargeDeviceNavigation } from '../Navigation/LargeDeviceNavigation';

const DashboardNavigation = () => {
  return (
    <>
      <div className='flex p-2 justify-center items-center'>
        <Link to='/' replace>
          <LargeDeviceLogo width={160} />
          <SmallLogo width={35} />
        </Link>
      </div>
      <Separator className='m-0 lg:mb-4 ' />
      <div className='my-4 px-4 hidden lg:block'>
        <WorkspaceSwitchSection />
      </div>
      <LoadOnMount>
        <LargeDeviceNavigation />
      </LoadOnMount>
    </>
  );
};

export { DashboardNavigation };
