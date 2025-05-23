import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { PropsWithChildren } from 'react';

const LoadOnMount = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted();
  return isMounted ? children : null;
};

export { LoadOnMount };
