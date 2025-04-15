import { useCallback, useEffect, useRef } from 'react';

type Subscriber<Payload> = (payload: Payload) => void;

interface UseEventSubscriberOptions<Payload> {
  eventName: string;
  subscribeOnMount?: boolean;
  unsuscribeOnUnmount?: boolean;
  subscriber: Subscriber<Payload>;
}
export const useEventSuscriber = <Payload>({
  subscribeOnMount = true,
  unsuscribeOnUnmount = true,
  eventName,
  subscriber,
}: UseEventSubscriberOptions<Payload>) => {
  const _subscriber = useRef<Subscriber<Payload>>(subscriber);
  const isSubscriberAvailable = !!_subscriber.current;

  const listener = useCallback(
    (event: Event) => {
      if (isSubscriberAvailable) {
        const customEvent = event as CustomEvent;
        const payload = customEvent.detail as Payload;
        _subscriber.current?.(payload);
      }
    },
    [isSubscriberAvailable],
  );
  useEffect(() => {
    if (subscribeOnMount) {
      console.log({ subscribeOnMount });
      document.addEventListener(eventName, listener);
    }
    return () => {
      console.log(unsuscribeOnUnmount);
      if (unsuscribeOnUnmount) {
        document.removeEventListener(eventName, listener);
      }
    };
  }, [subscribeOnMount, unsuscribeOnUnmount]);

  const subscribe = () => {
    document.addEventListener(eventName, listener);
  };

  const unsuscribe = () => {
    document.removeEventListener(eventName, listener);
  };
  return { subscribe, unsuscribe };
};
