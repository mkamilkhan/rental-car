import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTranslation } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Detect browser language
const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  // Check if Arabic (ar) or starts with ar-
  if (browserLang.startsWith('ar')) {
    return 'ar';
  }
  return 'en'; // Default to English
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage; default is always English
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    // Update HTML lang attribute only (no direction change)
    document.documentElement.lang = language;
    // Keep direction as LTR always (layout stays same)
    document.documentElement.dir = 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
  };

  const t = (key) => {
    return getTranslation(language, key);
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    changeLanguage,
    isRTL: language === 'ar',
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

