import { useEffect } from 'react';

import { useRefreshToken } from './use-refresh-token';

import { useToken } from '@/hooks/use-token';
import { apiAuth } from '@/lib/axios';

export const useApiAuth = () => {
  const { token } = useToken();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptors = apiAuth.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${token?.accessToken}`;

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = apiAuth.interceptors.response.use(
      (response) => response,
      async function (error) {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers['Authorization'] = `Bearer ${token?.accessToken}`;
          return apiAuth(prevRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      apiAuth.interceptors.request.eject(requestInterceptors);
      apiAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refreshToken]);

  return apiAuth;
};
