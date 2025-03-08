import { useToggle } from './useToggle';

export const useDialog = (defaultOpen: boolean = false) => {
  const { toggleValue, toggle } = useToggle({ initialValue: defaultOpen });

  const handleOpenChange = (open: boolean) => {
    toggle(open);
  };
  const close = () => {
    toggle(false);
  };

  const open = () => {
    toggle(true);
  };

  return { isOpen: toggleValue, close, open, handleOpenChange };
};
