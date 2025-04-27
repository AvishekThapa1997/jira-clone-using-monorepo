import { cn } from '@jira-clone/core/utils';
import { Box } from '../ui/box';
import { Text } from '../ui/text';

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
    <Box className={cn(className)}>
      <h1 className={cn('text-2xl font-semibold', titleStyleClassName)}>
        {title}
      </h1>
      {description && (
        <Text
          className={cn(
            'text-muted-foreground text-base',
            descriptionClassName,
          )}
        >
          {description}
        </Text>
      )}
    </Box>
  );
};

export { PageTitleAndDescription };
