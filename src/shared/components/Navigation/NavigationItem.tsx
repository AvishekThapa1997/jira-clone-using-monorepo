import { cn } from '@/shared/util/class';

import { useLocation, Link } from 'react-router';

interface NavigationItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  activeIcon: React.ElementType;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
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
    <Link
      to={href}
      className={cn(
        'flex flex-col transition-colors justify-center p-2 hover:bg-gray-200 no-underline items-center gap-1',
        {
          'bg-gray-200': isActive,
        },
      )}
    >
      <Icon
        className={cn('text-2xl md:text-2xl ', {
          'text-stone-400': !isActive,
        })}
      />
      <span className='text-muted-foreground max-md:text-xs md:hidden lg:block tracking-wider'>
        {label}
      </span>
    </Link>
  );
};

export { NavigationItem };
