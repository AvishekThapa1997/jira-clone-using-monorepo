import { BaseProps } from '@jira-clone/core/types';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';
interface BoxProps extends React.HTMLAttributes<HTMLElement>, BaseProps {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);
export { Box };
