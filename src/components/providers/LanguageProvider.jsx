'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, getMessages } from '@/lib/i18n';
const LanguageContext = createContext(undefined);
const STORAGE_KEY = 'jcc-language';
const isLanguage = value => {
  return value === 'en' || value === 'fr' || value === 'es';
};
export function LanguageProvider({
  children
}) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE
    }

    const storedLanguage = localStorage.getItem(STORAGE_KEY)
    if (isLanguage(storedLanguage)) {
      return storedLanguage
    }

    const browserLanguage = navigator.language?.slice(0, 2)
    return isLanguage(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE
  });
  const [messages, setMessages] = useState(() => getMessages(language));
  const updateLanguage = useCallback(nextLanguage => {
    setLanguageState(nextLanguage);
    setMessages(getMessages(nextLanguage));
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage;
    }
  }, []);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);
  const value = useMemo(() => ({
    language,
    setLanguage: updateLanguage,
    messages
  }), [language, updateLanguage, messages]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
