import { handleError } from '@/shared/util/handleError';
import React, { PropsWithChildren } from 'react';

interface AuthBoundaryProps extends PropsWithChildren {
  fallback?: React.ReactNode;
}

interface AuthBoundaryState {
  hasError: boolean;
}
class AuthErrorBoundary extends React.Component<
  AuthBoundaryProps,
  AuthBoundaryState
> {
  constructor(props: AuthBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<AuthBoundaryProps>,
    prevState: Readonly<AuthBoundaryState>,
    snapshot?: any,
  ): void {
    console.log('UPDATE', { prevProps, prevState, snapshot });
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown, errorInfo: React.ErrorInfo): void {
    const error = handleError(err);
    console.log({ errorInfo });
    console.error(`Error Code : ${error.code}`, error.message);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      window.location.href = '/auth/sign-in';
      return <></>;
    }
    return this.props.children;
  }
}

export { AuthErrorBoundary };
