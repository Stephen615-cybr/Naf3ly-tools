import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('naf3ly_lang');
      if (saved && (saved === 'ar' || saved === 'en')) {
        return saved;
      }
    } catch (e) {
      // LocalStorage might be restricted
    }
    return 'ar'; // Default language is Arabic
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRtl = language === 'ar';

  useEffect(() => {
    try {
      localStorage.setItem('naf3ly_lang', language);
    } catch (e) {}

    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const setLanguage = (lang) => {
    if (lang === 'ar' || lang === 'en') {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key, params = {}) => {
    const langDict = translations[language] || translations['ar'];
    let text = langDict[key] || translations['en'][key] || key;

    if (typeof text === 'string' && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(new RegExp(`{${paramKey}}`, 'g'), val);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, dir, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
