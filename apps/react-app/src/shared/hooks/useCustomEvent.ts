import { useCallback, useEffect, useRef } from 'react';

type Listener<Payload> = (payload: Payload) => void;

interface UseCustomEventOptions<Payload> {
  listenOnMount?: boolean;
  eventName: string;
  onListen?: Listener<Payload>;
}

interface UseCustomEventResult<Payload> {
  listen?: (listener: (payload: Payload) => void) => void;
  remove: () => void;
  dispatch: Listener<Payload>;
}

export const useCustomEvent = <Payload>({
  listenOnMount = true,
  eventName,
  onListen,
}: UseCustomEventOptions<Payload>): UseCustomEventResult<Payload> => {
  const handlerRef = useRef<Listener<Payload> | null>(onListen);
  const listener = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent;
      const payload = customEvent.detail as Payload;
      handlerRef.current?.(payload);
    },
    [onListen],
  );
  const attachListener = useCallback(
    (handler: Listener<Payload>) => {
      handlerRef.current = handler;
      document.addEventListener(eventName, listener);
    },
    [listener, eventName],
  );
  const removeListener = useCallback(() => {
    document.removeEventListener(eventName, listener);
  }, [listener, eventName]);
  useEffect(() => {
    if (listenOnMount && onListen) {
      attachListener(onListen);
    }
    return () => {
      removeListener();
    };
  }, [attachListener, removeEventListener]);
  const listen = (listener: Listener<Payload>) => {
    removeListener();
    attachListener(listener);
  };

  const dispatch = useCallback((payload: Payload) => {
    const event = new CustomEvent<Payload>(eventName, {
      bubbles: false,
      cancelable: true,
      detail: payload,
    });
    document.dispatchEvent(event);
  }, []);
  return { listen, remove: removeListener, dispatch };
};
