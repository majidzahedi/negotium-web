import { useToken } from '@/hooks/use-token';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:4000',
});

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:4000',
});

const refreshToken = async () => {
  try {
    const result = await api.get('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${useToken.getState().token?.refreshToken}`,
      },
    });

    useToken.getState().setToken(result.data);
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      useToken.getState().clearToken();
    }
  }
};

apiAuth.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${useToken.getState().token
      ?.accessToken}`;

    return config;
  },
  function (error) {
    Promise.reject(error);
  },
);

apiAuth.interceptors.response.use(
  (response) => response,
  async function (error) {
    const prevRequest = error?.config;

    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      await refreshToken();
      prevRequest.headers['Authorization'] = `Bearer ${useToken.getState().token
        ?.accessToken}`;
      return apiAuth(prevRequest);
    }

    return Promise.reject(error);
  },
);
