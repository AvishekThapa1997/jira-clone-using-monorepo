import {
  MdHome,
  MdOutlineHome,
  MdCheckCircle,
  MdCheckCircleOutline,
  MdOutlineSettings,
  MdSettings,
  MdPeopleAlt,
  MdOutlinePeopleAlt,
} from 'react-icons/md';

export const navigationRoutes = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: MdOutlineHome,
    activeIcon: MdHome,
  },
  {
    label: 'Task',
    href: '/tasks',
    icon: MdCheckCircleOutline,
    activeIcon: MdCheckCircle,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: MdOutlineSettings,
    activeIcon: MdSettings,
  },
  {
    label: 'Members',
    href: '/members',
    icon: MdOutlinePeopleAlt,
    activeIcon: MdPeopleAlt,
  },
];

export const CUSTOM_EVENT = {
  WORKSPACE_CREATED: 'workspacecreated',
};
