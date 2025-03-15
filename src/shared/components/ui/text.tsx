import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@jira-clone/core/utils';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    console.log({ asChild, Comp, child: props.children });
    return (
      <Comp ref={ref} className={cn(className)}>
        {props.children}
      </Comp>
    );
  },
);

export { Text };
