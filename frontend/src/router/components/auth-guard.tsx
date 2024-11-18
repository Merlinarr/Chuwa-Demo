import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/Error';
import { useAppSelector } from '@/store/hooks';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const userToken = useAppSelector((state) => state.user.userToken);
  const check = useCallback(() => {
    // if (!userToken) {
    //   router.replace('/login');
    // }
  }, [router, userToken]);

  useEffect(() => {
    check();
  }, [check]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
