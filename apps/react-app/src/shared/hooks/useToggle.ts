import { useCallback, useState } from 'react';

interface UseToggleOptions {
  initialValue: boolean;
}
const useToggle = (
  { initialValue }: UseToggleOptions = { initialValue: false },
) => {
  const [toggleValue, setToggleValue] = useState(initialValue);
  const toggle = useCallback((val?: boolean) => {
    if (typeof val !== 'undefined') {
      setToggleValue(val);
      return;
    }
    setToggleValue((prev) => !prev);
  }, []);
  return { toggleValue, toggle };
};

export { useToggle };
