import React, {
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type PropsWithChildren,
} from 'react';
import { If } from '../If';

const Choose = ({ children }: PropsWithChildren) => {
  return React.Children.toArray(children).find((child) => {
    if (isValidElement(child)) {
      const { props } = child as ReactElement<ComponentProps<typeof If>>;

      return typeof props.check === 'function'
        ? props.check()
          ? props.children
          : null
        : props.check
          ? props.children
          : null;
    }
  });
};

const Default = ({ children }: PropsWithChildren) => {
  return <If check={true}>{children}</If>;
};

export { Choose, Default };
