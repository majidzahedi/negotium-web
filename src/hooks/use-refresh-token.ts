import { useToken } from '@/hooks/use-token';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/axios';

export const useRefreshToken = () => {
  const { token, clearToken, setToken } = useToken();
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const result = await api.get('/auth/refresh', {
        headers: {
          Authorization: `Bearer ${token?.refreshToken}`,
        },
      });

      setToken(result.data);
    } catch (error) {
      clearToken();
      navigate('/login');
    }
  };

  return refreshToken;
};
