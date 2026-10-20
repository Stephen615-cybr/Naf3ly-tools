import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const TermsOfUse = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('termsTitle'),
    description: t('termsSubtitle'),
    canonicalPath: '/terms-of-use'
  });

  return (
    <div className="container" style={{ maxWidth: '820px' }}>
      {/* Header */}
      <div className="tool-header-hero" style={{ marginBottom: '2rem' }}>
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <FileCheck size={14} />
            <span>{t('navTerms')}</span>
          </div>
          <h1 className="tool-header-title">
            {t('termsTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('termsSubtitle')}
          </p>
        </div>
      </div>

      {/* Mandatory Template Notice Banner */}
      <div 
        style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-warning-bg)',
          border: '1px solid var(--color-warning-border)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          marginBottom: '2rem'
        }}
      >
        <AlertCircle size={22} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#92400e', marginBottom: '0.25rem' }}>
            {language === 'ar' ? 'نموذج شروط استخدام استرشادي:' : 'Draft Terms of Use Template:'}
          </h4>
          <p style={{ fontSize: '0.8125rem', color: '#78350f', lineHeight: 1.5 }}>
            {t('termsNoticeTemplate')}
          </p>
        </div>
      </div>

      {/* Terms Articles */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
        
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('termsSec1Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('termsSec1Text')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('termsSec2Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('termsSec2Text')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('termsSec3Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('termsSec3Text')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('termsSec4Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('termsSec4Text')}
          </p>
        </section>

      </div>

      <AdBannerSlot slotId="terms-of-use-bottom" />
    </div>
  );
};
