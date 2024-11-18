import { Suspense } from 'react';
import LayoutHeader from './header';
import LayoutFooter from './footer';
import { Outlet } from 'react-router-dom';

export default function index() {
  return (
    <div className='flex flex-col min-h-screen bg-gray'>
      <LayoutHeader />
      <div className='py-10 flex-grow container mx-auto max-w-[1323px] h-full'>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>

      <LayoutFooter />
    </div>
  );
}
