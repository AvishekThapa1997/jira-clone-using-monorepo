import { navigationRoutes } from '@/shared/constants';
import { cn } from '@/shared/util/class';
import { Link, useLocation } from 'react-router';

interface NavigationProps {
  className?: string;
  navItemClassName?: string;
}

const Navigation = ({ className, navItemClassName }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav>
      <div className={cn(className, 'max-lg:px-2')}>
        {navigationRoutes.map(({ activeIcon, href, icon, label }) => {
          const isActive = location.pathname === href;
          console.log({ isActive, path: location.pathname });
          const Icon = isActive ? activeIcon : icon;
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                'hover:bg-stone-200 flex  p-2 max-lg:rounded  no-underline',
                navItemClassName,
              )}
            >
              <Icon
                className={cn('text-muted-foreground text-2xl md:text-2xl ', {
                  'text-primary': isActive,
                })}
              />
              <span className='text-muted-foreground max-md:text-xs md:hidden lg:block tracking-wider'>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export { Navigation };
