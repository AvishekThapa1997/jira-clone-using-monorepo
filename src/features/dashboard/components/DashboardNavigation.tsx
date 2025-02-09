import { Box, Divider, Drawer } from '@mui/material';
import { Navigation } from '../../../shared/components/Navigation';
import { AppLogo } from '../../../shared/components/AppLogo';
import { Link } from 'react-router';

const DashboardNavigation = () => {
  return (
    <Box component='aside'>
      <Drawer
        variant='permanent'
        PaperProps={{
          sx: {
            width: 'var(--sidebar-width)',
          },
        }}
      >
        <Box paddingX={2} paddingTop={1.5}>
          <Link to='/' replace>
            <AppLogo width={160} />
          </Link>
        </Box>
        <Divider />
        <Navigation />
      </Drawer>
    </Box>
  );
};

export { DashboardNavigation };
