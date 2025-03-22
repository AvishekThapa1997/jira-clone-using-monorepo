import { useCallback } from 'react';

interface EventDispatcherOptions {
  eventName: string;
}

export const useEventDispatcher = <Payload>({
  eventName,
}: EventDispatcherOptions) => {
  const dispatch = useCallback((payload: Payload) => {
    const event = new CustomEvent<Payload>(eventName, {
      bubbles: false,
      cancelable: true,
      detail: payload,
    });
    document.dispatchEvent(event);
  }, []);
  return { dispatch };
};
