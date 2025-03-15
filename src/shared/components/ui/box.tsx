import { BaseProps } from '@jira-clone/core/types';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';
interface BoxProps extends React.HTMLAttributes<HTMLElement>, BaseProps {
  asChild?: boolean;
}

const Box = ({ children, asChild, ...props }: BoxProps) => {
  const Comp = asChild ? Slot : 'div';
  return <Comp {...props}>{children}</Comp>;
};

export { Box };
