import { useEffect } from 'react';
import { useToggle } from './useToggle';

export const useIsMounted = () => {
  const { toggle, toggleValue } = useToggle({ initialValue: false });
  useEffect(() => {
    toggle(true);
  }, []);
  return toggleValue;
};
