import { cn } from '@jira-clone/core/utils';
import type { PropsWithChildren } from 'react';
import { Box } from '../ui/box';

interface DashboardProps extends PropsWithChildren {
  className?: string;
}

const Dashboard = ({ children, className }: DashboardProps) => {
  return <Box className={cn(className)}>{children}</Box>;
};

const DashboardLeft = ({ children, className }: DashboardProps) => {
  return (
    <aside
      className={cn(
        'md:w-sidebar-width bg-stone-50 fixed hidden md:block border-r h-svh shadow-sm',
        className,
      )}
    >
      {children}
    </aside>
  );
};

const DashboardRight = ({ children, className }: DashboardProps) => {
  return (
    <main className={cn('md:ml-[var(--sidebar-width)] p-2 md:p-4', className)}>
      {children}
    </main>
  );
};

export { Dashboard, DashboardLeft, DashboardRight };
