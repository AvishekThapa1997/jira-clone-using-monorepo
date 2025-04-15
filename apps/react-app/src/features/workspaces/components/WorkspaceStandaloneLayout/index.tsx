import { AppLogo } from '@/shared/components/AppLogo';
import { Box } from '@/shared/components/ui/box';
import { PropsWithChildren } from 'react';

const WorkspaceStandaloneLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box className='h-svh p-4'>
      <AppLogo
        largeLogoClassname='hidden md:block'
        smallLogoClassname='block md:hidden'
      />
      <Box>{children}</Box>
    </Box>
  );
};

export { WorkspaceStandaloneLayout };
