import { useNavigate, Outlet, FileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = new FileRoute('/login/').createRoute({
  component: LoginLayout,
});

function LoginLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      to: '/login/request-code',
    });
  }, []);

  return <Outlet />;
}
