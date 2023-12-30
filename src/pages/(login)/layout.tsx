import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const LoginLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('request-code');
  }, []);

  return <Outlet />;
};
