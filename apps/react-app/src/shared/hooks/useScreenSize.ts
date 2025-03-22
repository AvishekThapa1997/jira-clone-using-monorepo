import { useMediaQuery as _useMediaQuery } from '@uidotdev/usehooks';

type UseMediaQueryResult = {
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  isExtraLargeDevice: boolean;
};

export const useScreenSize = (): UseMediaQueryResult => {
  const isSmallDevice = _useMediaQuery('(max-width: 639px)'); // Mobile
  const isMediumDevice = _useMediaQuery(
    '(min-width: 640px) and (max-width: 767px)',
  ); // Tablet
  const isLargeDevice = _useMediaQuery(
    '(min-width: 768px) and (max-width: 1023px)',
  ); // Small Desktop
  const isExtraLargeDevice = _useMediaQuery('(min-width: 1024px)'); // Large Desktop

  return {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
  };
};
