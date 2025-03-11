import { cn } from '@jira-clone/core/utils';
import type { PropsWithChildren } from 'react';

interface DashboardProps extends PropsWithChildren {
  className?: string;
}

const DashboardLayout = ({ children, className }: DashboardProps) => {
  return <div className={cn(className)}>{children}</div>;
};

const DashboardLeft = ({ children, className }: DashboardProps) => {
  return (
    <aside
      className={cn(
        'md:w-sidebar-width fixed hidden md:block bg-stone-50 border-r h-svh shadow-sm',
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

export { DashboardLayout, DashboardLeft, DashboardRight };
