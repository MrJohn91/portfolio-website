"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'en' || saved === 'de')) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Return default English until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
