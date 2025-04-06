import { Separator } from '@/shared/components/ui/separator';
import { Link } from 'react-router';

import { WorkspaceSwitchSection } from '@/features/workspaces/components/WorkspaceSwitcherSection';

import { LoadOnMount } from '../LoadOnMount';
import { LargeDeviceNavigation } from '../Navigation/LargeDeviceNavigation';
import { AppLogo } from '../AppLogo';
import { Box } from '../ui/box';

const DashboardNavigation = () => {
  return (
    <>
      <Box className='flex p-2 justify-center items-center'>
        <Link to='/' replace>
          <AppLogo />
        </Link>
      </Box>
      <Separator className='m-0 lg:mb-4 ' />
      <Box className='my-4 px-4 hidden lg:block'>
        <WorkspaceSwitchSection />
      </Box>
      <LoadOnMount>
        <LargeDeviceNavigation />
      </LoadOnMount>
    </>
  );
};

export { DashboardNavigation };
