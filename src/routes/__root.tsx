import { Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { AuthProp } from '@/hooks/use-token';

export const Route = rootRouteWithContext<{ auth: AuthProp }>()({
  component: () => <Outlet />,
});
