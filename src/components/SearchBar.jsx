import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SearchBar = ({ value, onChange, onClear, placeholder }) => {
  const { t, isRtl } = useLanguage();

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          [isRtl ? 'right' : 'left']: '1.125rem',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          color: 'var(--text-muted)'
        }}
      >
        <Search size={20} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t('searchPlaceholder')}
        className="form-input"
        style={{
          padding: '0.875rem 1.25rem',
          [isRtl ? 'paddingRight' : 'paddingLeft']: '3rem',
          [isRtl ? 'paddingLeft' : 'paddingRight']: value ? '3rem' : '1.25rem',
          fontSize: '1rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-sm)',
          border: '1.5px solid var(--border-color)'
        }}
        aria-label="Search tools"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            top: '50%',
            [isRtl ? 'left' : 'right']: '0.75rem',
            transform: 'translateY(-50%)',
            padding: '0.25rem',
            borderRadius: '50%',
            width: '28px',
            height: '28px'
          }}
          aria-label={t('clearSearch')}
          title={t('clearSearch')}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
