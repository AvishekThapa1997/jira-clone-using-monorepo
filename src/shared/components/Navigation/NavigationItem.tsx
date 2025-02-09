import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router';

interface NavigationItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  activeIcon: React.ElementType;
}

const NavigationItem = ({
  icon,
  activeIcon,
  label,
  href,
}: NavigationItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const Icon = isActive ? activeIcon : icon;

  return (
    <ListItemButton
      sx={{ padding: 0.4 }}
      component={Link}
      selected={isActive}
      to={href}
    >
      <ListItem>
        <ListItemIcon
          sx={{
            minWidth: 48,
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </ListItemButton>
  );
};

export { NavigationItem };
