import React, { PropsWithChildren } from 'react';

interface ShowProps extends PropsWithChildren {
  check: (() => boolean) | boolean;
}
const If = ({ check, children }: ShowProps) => {
  const canShow = typeof check === 'function' ? check() : check;
  if (canShow) {
    return children;
  }
  return null;
};

export { If };
