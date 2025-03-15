import React, { PropsWithChildren } from 'react';

interface ShowProps extends PropsWithChildren {
  show: (() => boolean) | boolean;
}
const Show = ({ show, children }: ShowProps) => {
  const canShow = typeof show === 'function' ? show() : show;
  if (canShow) {
    return children;
  }
  return null;
};

export { Show };
