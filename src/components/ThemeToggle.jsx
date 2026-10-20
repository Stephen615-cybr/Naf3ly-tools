import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="btn btn-ghost"
      style={{
        padding: '0.5rem',
        borderRadius: 'var(--radius-md)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px'
      }}
      title={isDark ? t('toggleThemeLight') : t('toggleThemeDark')}
      aria-label={isDark ? t('toggleThemeLight') : t('toggleThemeDark')}
    >
      {isDark ? (
        <Sun size={20} color="#fbbf24" style={{ transition: 'transform 0.3s' }} />
      ) : (
        <Moon size={20} color="var(--text-secondary)" style={{ transition: 'transform 0.3s' }} />
      )}
    </button>
  );
};
