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
    href: '/dashboard/tasks',
    icon: MdCheckCircleOutline,
    activeIcon: MdCheckCircle,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: MdOutlineSettings,
    activeIcon: MdSettings,
  },
  {
    label: 'Members',
    href: '/dashboard/members',
    icon: MdOutlinePeopleAlt,
    activeIcon: MdPeopleAlt,
  },
];
