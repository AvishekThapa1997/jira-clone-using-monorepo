import { useCallback } from 'react';

interface EventDispatcherOptions {
  eventName: string;
}

export const useEventDispatcher = <Payload>({
  eventName,
}: EventDispatcherOptions) => {
  const dispatch = useCallback(
    (
      payload: Payload,
      options: CustomEventInit = {
        bubbles: false,
        cancelable: true,
      },
    ) => {
      const event = new CustomEvent<Payload>(eventName, {
        ...options,
        detail: payload,
      });
      document.dispatchEvent(event);
    },
    [],
  );
  return { dispatch };
};
