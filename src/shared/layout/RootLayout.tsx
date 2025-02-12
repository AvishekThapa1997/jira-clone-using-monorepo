import { Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const RootLayout = () => {
  const { isLoading } = useAuth();
  return (
    <div className='max-w-[1600px] mx-auto '>
      {isLoading ? <p>Loading...</p> : <Outlet />}
    </div>
  );
};

export { RootLayout };
