import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { useIsActiveRoute } from '@/shared/hooks/useIsActiveRoute';
import { cn } from '@jira-clone/core/utils';
import { If } from '../If';
import { Slot } from '@radix-ui/react-slot';
import { Link } from 'react-router';
import { Box } from './box';
import { Choose } from '../Choose';

type ActionNavigationMenuItemType = {
  isActive: boolean;
};

const ActiveNavigationMenuContext =
  React.createContext<ActionNavigationMenuItemType | null>(null);

const NavigationMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex flex-1 items-center justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

interface NavigationMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {
  isActive?: boolean;
}

const NavigationMenuItem = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Item>,
  NavigationMenuItemProps
>(({ children, isActive, ...props }, ref) => {
  return (
    <ActiveNavigationMenuContext.Provider
      value={{
        isActive,
      }}
    >
      <NavigationMenuPrimitive.Item ref={ref} {...props}>
        {children}
      </NavigationMenuPrimitive.Item>
    </ActiveNavigationMenuContext.Provider>
  );
});

NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

interface NavigationItemIconProps {
  activeIcon: React.ReactNode;
  defaultIcon: React.ReactNode;
  className?: string;
}

const NavigationItemIcon = ({
  activeIcon,
  defaultIcon,
  className,
}: NavigationItemIconProps) => {
  const { isActive } = useNavigationContext();
  return (
    <Box className={cn('flex justify-center text-gray-600', className)}>
      <Choose>
        <If check={isActive}>{activeIcon}</If>
        <If check={!isActive}>{defaultIcon}</If>
      </Choose>
    </Box>
  );
};

NavigationItemIcon.displayName = 'NavigationItemIcon';

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent',
);

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className='relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
      aria-hidden='true'
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ href, children, className, asChild, ...props }, ref) => {
  const isActive = useIsActiveRoute(href);
  const activeLinkStyle = {
    'bg-stone-200': isActive,
  };
  return (
    <ActiveNavigationMenuContext.Provider
      value={{
        isActive,
      }}
    >
      <NavigationMenuPrimitive.Link
        asChild
        {...props}
        ref={ref}
        className={cn('hover:bg-stone-200', activeLinkStyle, className)}
      >
        <Link to={href}> {children}</Link>
      </NavigationMenuPrimitive.Link>
    </ActiveNavigationMenuContext.Provider>
  );
});

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className,
    )}
    {...props}
  >
    <div className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md' />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;
// text-muted-foreground max-md:text-xs md:hidden lg:block tracking-wider
// text-sm text-muted-foreground tracking-wider

interface NavigationMenuItemLabelProps extends React.PropsWithChildren {
  asChild?: boolean;
  className?: string;
}
export const NavigationMenuItemLabel = React.forwardRef<
  HTMLParagraphElement,
  NavigationMenuItemLabelProps
>(({ asChild, children, className }, ref) => {
  const Comp = asChild ? Slot : 'p';
  const { isActive } = useNavigationContext();
  const activeFontStyle = {
    'font-medium': isActive,
  };
  return (
    <Comp
      className={cn(
        'text-muted-foreground font-normal transition-[font-weight] tracking-wider',
        className,
        activeFontStyle,
      )}
      ref={ref}
    >
      {children}
    </Comp>
  );
});

NavigationMenuItemLabel.displayName = 'NavigationMenuItemLabel';

const useNavigationContext = () => {
  const result = React.useContext(ActiveNavigationMenuContext);
  return result;
};

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
  NavigationItemIcon,
};
