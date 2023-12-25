import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface language {
  lng: 'fa' | 'en';
  setLng: (lng: 'fa' | 'en') => void;
}

export const lgnStore = create(
  persist<language>(
    () => ({
      lng: 'en',
      setLng: (lng: 'fa' | 'en') => ({ lng }),
    }),
    {
      name: 'language',
    },
  ),
);
