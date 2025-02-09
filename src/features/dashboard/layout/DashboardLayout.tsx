import { Stack } from '@mui/material';
import { Outlet } from 'react-router';
import { DashboardNavigation } from '../components/DashboardNavigation';

const DashboardLayout = () => {
  return (
    <Stack direction='row'>
      <DashboardNavigation />
      <Outlet />
    </Stack>
  );
};

export { DashboardLayout };
