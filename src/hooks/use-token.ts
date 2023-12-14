import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthProp {
  token: Token | null;
  setToken: (token: Token) => void;
  clearToken: () => void;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

export const useToken = create(
  persist<AuthProp>(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'auth',
    },
  ),
);
