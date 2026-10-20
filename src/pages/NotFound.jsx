import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Compass, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { toolsData } from '../data/tools';
import { ToolCard } from '../components/ToolCard';

export const NotFound = () => {
  const { t, language, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  usePageMeta({
    title: t('notFoundTitle'),
    description: t('notFoundSubtitle'),
    canonicalPath: '/404'
  });

  const featuredTools = toolsData.slice(0, 3);

  return (
    <div className="container" style={{ padding: '3.5rem 1.25rem', textAlign: 'center' }}>
      <div 
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-warning-bg)',
          color: 'var(--color-warning)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <AlertTriangle size={36} />
      </div>

      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.75rem' }}>
        {t('notFoundTitle')}
      </h1>

      <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        {t('notFoundSubtitle')}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} />
          <span>{t('notFoundAction')}</span>
        </Link>
        <Link to="/tools" className="btn btn-secondary btn-lg">
          <Compass size={18} />
          <span>{t('navTools')}</span>
        </Link>
      </div>

      {/* Suggested Tools Section */}
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: isRtl ? 'right' : 'left' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          {t('notFoundSuggestions')}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};
