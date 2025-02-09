import { Box, List } from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { NavigationItem } from './NavigationItem';

const routes = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: HomeOutlinedIcon,
    activeIcon: HomeIcon,
  },
  {
    label: 'Task',
    href: '/tasks',
    icon: CheckCircleOutlineOutlinedIcon,
    activeIcon: CheckCircleIcon,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: SettingsOutlinedIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: 'Members',
    href: '/members',
    icon: GroupOutlinedIcon,
    activeIcon: GroupIcon,
  },
];

const Navigation = () => {
  return (
    <Box component='nav'>
      <List
        sx={{
          marginTop: 2,
        }}
        disablePadding
      >
        {routes.map(({ activeIcon, href, icon, label }) => {
          return (
            <NavigationItem
              key={label}
              href={href}
              activeIcon={activeIcon}
              icon={icon}
              label={label}
            />
          );
        })}
      </List>
    </Box>
  );
};

export { Navigation };
