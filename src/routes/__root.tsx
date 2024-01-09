import {
  Outlet,
  rootRouteWithContext,
  useRouter,
} from '@tanstack/react-router';
import { AuthProp, useToken } from '@/hooks/use-token';
import { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = rootRouteWithContext<{
  auth: AuthProp;
  queryClient: QueryClient;
}>()({
  component: () => <RootComponent />,
});

const RootComponent = () => {
  const { auth } = Route.useRouteContext();
  const router = useRouter();
  const { token } = useToken();

  useEffect(() => {
    if (token?.accessToken !== auth.token?.accessToken) {
      auth.setToken(token);
      router.invalidate();
    }
  }, [auth.token, token]);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
};
