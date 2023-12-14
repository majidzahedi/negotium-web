import { Navigate, Outlet } from 'react-router-dom';

import { useToken } from '@/hooks/use-token';

const PrivateLayout = () => {
  const { token } = useToken();

  return token?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateLayout;
