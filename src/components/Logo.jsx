import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Logo = ({ size = 'medium', showTagline = false }) => {
  const { language, t } = useLanguage();

  const iconSizes = {
    small: { w: 32, h: 32 },
    medium: { w: 40, h: 40 },
    large: { w: 52, h: 52 }
  };

  const { w, h } = iconSizes[size] || iconSizes.medium;

  return (
    <Link 
      to="/" 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        color: 'inherit'
      }}
      aria-label="Naf3ly Tools Home"
    >
      <div 
        style={{
          width: `${w}px`,
          height: `${h}px`,
          flexShrink: 0,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
          padding: '6px'
        }}
      >
        {/* Crisp vector logo */}
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 25 45 C 25 72, 40 82, 50 82 C 60 82, 75 72, 75 45 C 75 40, 70 40, 70 45 C 70 65, 58 74, 50 74 C 42 74, 30 65, 30 45 C 30 40, 25 40, 25 45 Z" 
            fill="#ffffff" 
          />
          {/* Spark Dot */}
          <path d="M 50 20 L 58 28 L 50 36 L 42 28 Z" fill="#38bdf8" />
          <circle cx="72" cy="26" r="3" fill="#67e8f9" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ 
            fontSize: size === 'large' ? '1.5rem' : '1.25rem', 
            fontWeight: 800,
            letterSpacing: language === 'ar' ? '0' : '-0.02em',
            background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--color-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('brandName')}
          </span>
          <span 
            style={{ 
              fontSize: '0.6875rem', 
              fontWeight: 700, 
              padding: '2px 6px', 
              borderRadius: '9999px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase'
            }}
          >
            Tools
          </span>
        </div>
        {showTagline && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {t('brandTagline')}
          </span>
        )}
      </div>
    </Link>
  );
};
