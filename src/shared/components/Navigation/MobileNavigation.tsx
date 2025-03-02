import { Navigation } from './Navigation';

const MobileNavigation = () => {
  return (
    <Navigation
      className='fixed md:hidden p-1.5 inset-x-0 bottom-0 gap-4 bg-stone-50 flex justify-center'
      navItemClassName='min-w-16 py-0.5 flex-col gap-0.5 justify-center items-center'
    />
  );
};

export { MobileNavigation };
