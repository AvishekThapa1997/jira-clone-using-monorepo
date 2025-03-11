import type { NextOrObserver, User } from 'firebase/auth';

interface HandleAuthOptions {
  onAuthStatusChanged?: (user: User | null) => void;
}

const handleAuth = ({
  onAuthStatusChanged,
}: HandleAuthOptions = {}): NextOrObserver<User> => {
  return (user) => {
    onAuthStatusChanged?.(user);
  };
};

export { handleAuth };
