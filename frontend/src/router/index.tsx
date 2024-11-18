import { lazy } from 'react';
import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts';
import AuthGuard from '@/router/components/auth-guard';

import { ErrorRoutes } from '@/router/routes/error-routes';
import { AppRouteObject } from '#/router';

import withAuthGuard from './components/withAuthGuard';
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        Component: lazy(() => import('@/pages/Home')),
      },
      {
        path: '/detail/:id',
        Component: lazy(() => import('@/pages/Detail')),
      },

      {
        path: '/product',
        Component: withAuthGuard(lazy(() => import('@/pages/Product'))),
      },
      {
        path: '/product/:id',
        Component: withAuthGuard(lazy(() => import('@/pages/Product'))),
      },
      {
        path: '/login',
        Component: lazy(() => import('@/pages/Login')),
      },
      {
        path: '/error',
        Component: lazy(() => import('@/pages/Error')),
      },
    ],
  };

  const routes = [asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];

  const router = createBrowserRouter(routes as unknown as RouteObject[], {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
