import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../util/class';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ children, className }: LabelProps) => {
  return (
    <LabelPrimitive.Root className={cn('text-sm text-gray-500', className)}>
      {children}
    </LabelPrimitive.Root>
  );
};
