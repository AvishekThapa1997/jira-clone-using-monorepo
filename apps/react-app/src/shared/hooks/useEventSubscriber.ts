import { useCallback, useEffect, useRef } from 'react';

type Subscriber<Payload> = (payload: Payload) => void;

interface UseEventSubscriberOptions<Payload> {
  eventName: string;
  subscribeOnMount?: boolean;
  unsuscribeOnMount?: boolean;
  subscriber: Subscriber<Payload>;
}
export const useEventSuscriber = <Payload>({
  subscribeOnMount = true,
  unsuscribeOnMount = true,
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
      document.addEventListener(eventName, listener);
    }
    return () => {
      if (unsuscribeOnMount) {
        document.removeEventListener(eventName, listener);
      }
    };
  }, [subscribeOnMount, unsuscribeOnMount]);

  const subscribe = () => {
    document.addEventListener(eventName, listener);
  };

  const unsuscribe = () => {
    document.removeEventListener(eventName, listener);
  };
  return { subscribe, unsuscribe };
};
