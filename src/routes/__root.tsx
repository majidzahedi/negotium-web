import { Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { AuthProp } from '@/hooks/use-token';
import { QueryClient } from '@tanstack/react-query';

export const Route = rootRouteWithContext<{
  auth: AuthProp;
  queryClient: QueryClient;
}>()({
  component: () => <Outlet />,
});
