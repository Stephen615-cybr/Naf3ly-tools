import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('privacyTitle'),
    description: t('privacySubtitle'),
    canonicalPath: '/privacy-policy'
  });

  return (
    <div className="container" style={{ maxWidth: '820px' }}>
      {/* Header */}
      <div className="tool-header-hero" style={{ marginBottom: '2rem' }}>
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Shield size={14} />
            <span>{t('navPrivacy')}</span>
          </div>
          <h1 className="tool-header-title">
            {t('privacyTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('privacySubtitle')}
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
            {language === 'ar' ? 'نموذج وثيقة قانونية استرشادي:' : 'Draft Legal Policy Template:'}
          </h4>
          <p style={{ fontSize: '0.8125rem', color: '#78350f', lineHeight: 1.5 }}>
            {t('privacyNoticeTemplate')}
          </p>
        </div>
      </div>

      {/* Policy Articles */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
        
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('privacySec1Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('privacySec1Text')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('privacySec2Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('privacySec2Text')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('privacySec3Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('privacySec3Text')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            {t('privacySec4Title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('privacySec4Text')}
          </p>
        </section>

      </div>

      <AdBannerSlot slotId="privacy-policy-bottom" />
    </div>
  );
};
