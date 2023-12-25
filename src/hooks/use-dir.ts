import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface language {
  lng: 'fa' | 'en';
  setLng: (lng: 'fa' | 'en') => void;
}

const lgnStore = create(
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

export const useChangeLng = () => {
  const { lng, setLng } = lgnStore();

  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(lng);
  }, []);

  useEffect(() => {
    const updateHtmlAttributes = () => {
      setLng(language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    };

    updateHtmlAttributes();
  }, [language]);

  return lng;
};
