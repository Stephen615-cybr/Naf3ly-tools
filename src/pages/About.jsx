import React from 'react';
import { Info, Target, Shield, Cpu, Map } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const About = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('aboutTitle'),
    description: t('aboutSubtitle'),
    canonicalPath: '/about'
  });

  return (
    <div className="container" style={{ maxWidth: '860px' }}>
      {/* Header */}
      <div className="tool-header-hero" style={{ marginBottom: '2.5rem' }}>
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Info size={14} />
            <span>{t('navAbout')}</span>
          </div>
          <h1 className="tool-header-title">
            {t('aboutTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('aboutSubtitle')}
          </p>
        </div>
      </div>

      {/* Main Content Articles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Mission */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <Target size={22} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t('aboutMissionTitle')}</h2>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('aboutMissionText')}
          </p>
        </div>

        {/* Privacy First */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
              <Shield size={22} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t('aboutPrivacyTitle')}</h2>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('aboutPrivacyText')}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              <Cpu size={22} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t('aboutTechTitle')}</h2>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('aboutTechText')}
          </p>
        </div>

        {/* Roadmap */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}>
              <Map size={22} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t('aboutRoadmapTitle')}</h2>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t('aboutRoadmapText')}
          </p>
        </div>

      </div>

      <AdBannerSlot slotId="about-page-bottom" />
    </div>
  );
};
