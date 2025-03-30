import { cn } from '@jira-clone/core/utils';
import { Box } from '../ui/box';
import { LargeDeviceLogo } from './LargeDeviceLogo';
import { SmallLogo } from './SmallLogo';

interface AppLogoProps {
  largeLogoClassname?: string;
  smallLogoClassname?: string;
}

export const AppLogo = ({
  largeLogoClassname,
  smallLogoClassname,
}: AppLogoProps) => {
  return (
    <Box>
      <LargeDeviceLogo className={largeLogoClassname} width={160} />
      <SmallLogo className={smallLogoClassname} width={35} />
    </Box>
  );
};
