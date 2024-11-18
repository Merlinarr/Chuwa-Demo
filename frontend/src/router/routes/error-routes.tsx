import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { Spin } from 'antd';

import AuthGuard from '../components/auth-guard';

import { AppRouteObject } from '#/router';

// const Page403 = lazy(() => import('@/pages/Error/403'));
// const Page404 = lazy(() => import('@/pages/Error/403'));
const Page500 = lazy(() => import('@/pages/Error'));

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: AppRouteObject = {
  element: (
    <AuthGuard>

        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>

    </AuthGuard>
  ),
  children: [
    { path: '500', element: <Page500 /> },
  ],
};
