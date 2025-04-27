export const useLocalStorage = () => {
  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };
  const addItem = (key: string, value: object) => {
    const _value = JSON.stringify(value);
    localStorage.setItem(key, _value);
  };
  return { addItem, getItem };
};
