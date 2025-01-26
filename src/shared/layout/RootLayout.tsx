import { Outlet } from 'react-router';

const RootLayout = () => {
  console.log('ROOT LAYOUT');
  return <Outlet />;
};

export { RootLayout };
