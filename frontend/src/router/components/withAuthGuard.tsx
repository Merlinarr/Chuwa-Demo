import React, { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/Error';
import { useAppSelector } from '@/store/hooks';

import { useRouter } from '../hooks';
import { UserRole } from '#/enum';

const withAuthGuard = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function AuthGuardedComponent(props: P) {
    const router = useRouter();

    const { userInfo } = useAppSelector((state) => state.user);

    const check = useCallback(() => {
      if (userInfo.role != UserRole.ADMIN) {
        router.replace('/login');
      }
    }, [router, userInfo]);

    useEffect(() => {
      check();
    }, [check]);

    return (
      <ErrorBoundary FallbackComponent={PageError}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

export default withAuthGuard;
