import { PageTitleAndDescription } from '../PageTitleAndDescription';
import { cn } from '@jira-clone/core/utils';

interface PageHeaderProps {
  className?: string;
  title: string;
  description?: string;
}
const PageHeader = ({ className, title, description }: PageHeaderProps) => {
  return (
    <header className={cn('hidden lg:block', className)}>
      <PageTitleAndDescription
        title={title}
        description={description}
        className={cn(className)}
      />
    </header>
  );
};

export { PageHeader };
