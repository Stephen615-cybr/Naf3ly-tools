import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="btn btn-secondary btn-sm"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontWeight: 600,
        padding: '0.4rem 0.75rem',
        borderRadius: 'var(--radius-md)'
      }}
      title={`Switch to ${language === 'ar' ? 'English' : 'العربية'}`}
      aria-label={`Switch to ${language === 'ar' ? 'English' : 'العربية'}`}
    >
      <Globe size={16} color="var(--color-primary)" />
      <span>{t('switchLanguage')}</span>
    </button>
  );
};
