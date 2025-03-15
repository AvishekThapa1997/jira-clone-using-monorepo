import { navigationRoutes } from '@/shared/constants';
import { cn } from '@jira-clone/core/utils';
import { Suspense } from 'react';
import { Link, useLocation } from 'react-router';
import { RenderList } from '../RenderList';

interface NavigationProps {
  className?: string;
  navItemClassName?: string;
}

const Navigation = ({ className, navItemClassName }: NavigationProps) => {
  const location = useLocation();
  return (
    <nav>
      <div className={cn(className, 'max-lg:px-2')}>
        <RenderList
          data={navigationRoutes}
          render={({ activeIcon, href, icon, label }) => {
            const isActive = location.pathname === href;
            const Icon = isActive ? activeIcon : icon;
            return (
              <Link
                key={href}
                to={href}
                className={cn(
                  'hover:bg-stone-200 flex  p-2 max-lg:rounded  no-underline',
                  navItemClassName,
                  {
                    'bg-stone-200': isActive,
                  },
                )}
              >
                <Suspense fallback={<p>icon loading</p>}>
                  <Icon
                    className={cn(
                      'text-muted-foreground text-2xl md:text-2xl ',
                      {
                        'text-primary': isActive,
                      },
                    )}
                  />
                </Suspense>
                <span className='text-muted-foreground max-md:text-xs md:hidden lg:block tracking-wider'>
                  {label}
                </span>
              </Link>
            );
          }}
        />
      </div>
    </nav>
  );
};

export { Navigation };
