import { type ComponentProps, Suspense } from 'react';

const SuspenseWrapper = ({
  children,
  fallback,
}: ComponentProps<typeof Suspense>) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export { SuspenseWrapper };
