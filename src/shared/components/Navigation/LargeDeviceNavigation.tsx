import { Navigation } from './Navigation';

const LargeDeviceNavigation = () => {
  return (
    <Navigation
      className='hidden md:block'
      navItemClassName='gap-4 lg:gap-3 py-3 lg:p-4  max-lg:justify-center'
    />
  );
};

export { LargeDeviceNavigation };
