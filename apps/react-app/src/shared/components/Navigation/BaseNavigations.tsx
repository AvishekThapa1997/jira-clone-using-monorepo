import { navigationRoutes } from '@/shared/constants';
import { RenderList } from '../RenderList';
import {
  NavigationItemIcon,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemLabel,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';
import { useIsActiveRoute } from '@/shared/hooks/useIsActiveRoute';
import { cn } from '@jira-clone/core/utils';

export interface BaseNavigationProps {
  isMobile?: boolean;
}

const BaseNavigation = ({ isMobile }: BaseNavigationProps) => {
  const containerStyle = isMobile
    ? 'fixed bottom-0 bg-stone-50 inset-x-0 px-2 block md:hidden w-full'
    : 'hidden md:block';
  const listStyle = isMobile
    ? 'max-w-sm justify-between mx-auto'
    : 'flex-col items-stretch';

  const linkStyle = isMobile
    ? 'flex flex-col gap-1 min-w-16 items-center hover:bg-stone-200/60 p-1 no-underline'
    : 'justify-center lg:justify-normal p-2 no-underline gap-4 flex w-full lg:gap-3 py-3 lg:p-4';

  const labelStyle = isMobile
    ? 'text-xs font-medium'
    : 'max-md:text-xs md:hidden lg:block';

  const iconSize = isMobile ? 20 : 24;

  return (
    <NavigationMenu className={containerStyle}>
      <NavigationMenuList className={listStyle}>
        <RenderList
          data={navigationRoutes}
          render={({
            href,
            icon: DefaultIcon,
            activeIcon: ActiveIcon,
            label,
          }) => {
            const isActive = useIsActiveRoute(href);
            return (
              <NavigationMenuItem key={href} isActive={isActive}>
                <NavigationMenuLink
                  className={cn(linkStyle)}
                  asChild
                  href={href}
                >
                  <NavigationItemIcon
                    defaultIcon={<DefaultIcon size={iconSize} />}
                    activeIcon={
                      <ActiveIcon size={iconSize} className='text-primary' />
                    }
                  />
                  <NavigationMenuItemLabel className={labelStyle}>
                    {label}
                  </NavigationMenuItemLabel>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { BaseNavigation };
