import { cn } from '@/shared/util/class';

interface PageTitleAndDescriptionProps {
  className?: string;
  title: string;
  description?: string;
  descriptionClassName?: string;
  titleStyleClassName?: string;
}

const PageTitleAndDescription = ({
  className,
  title,
  description,
  descriptionClassName,
  titleStyleClassName,
}: PageTitleAndDescriptionProps) => {
  if (!title && !description) {
    return null;
  }
  return (
    <div className={cn(className)}>
      <h1 className={cn('text-2xl font-semibold', titleStyleClassName)}>
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            'text-muted-foreground text-base',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export { PageTitleAndDescription };
