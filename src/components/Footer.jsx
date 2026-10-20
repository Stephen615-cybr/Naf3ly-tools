import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  };

  const footerHeadingStyle = {
    fontSize: '0.9375rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.25rem'
  };

  const footerLinkStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)'
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand Info */}
          <div style={{ ...footerSectionStyle, gridColumn: 'span 1' }}>
            <Logo size="medium" />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
              {t('footerDesc')}
            </p>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                fontSize: '0.75rem',
                fontWeight: 600,
                width: 'fit-content',
                marginTop: '0.5rem'
              }}
            >
              <ShieldCheck size={16} />
              <span>{t('privacyBadge')}</span>
            </div>
          </div>

          {/* Featured Tools Links */}
          <div style={footerSectionStyle}>
            <h4 style={footerHeadingStyle}>{t('footerTools')}</h4>
            <Link to="/tools/gpa-calculator" style={footerLinkStyle}>
              {language === 'ar' ? 'حاسبة المعدل التراكمي (GPA)' : 'GPA & CGPA Calculator'}
            </Link>
            <Link to="/tools/cv-builder" style={footerLinkStyle}>
              {language === 'ar' ? 'صانع السيرة الذاتية (CV)' : 'CV & Resume Builder'}
            </Link>
            <Link to="/tools/study-planner" style={footerLinkStyle}>
              {language === 'ar' ? 'منظم المذاكرة والمهام' : 'Study Planner & Tasks'}
            </Link>
            <Link to="/tools/percentage-calculator" style={footerLinkStyle}>
              {language === 'ar' ? 'حاسبة النسب المئوية' : 'Percentage Calculator'}
            </Link>
            <Link to="/tools/word-counter" style={footerLinkStyle}>
              {language === 'ar' ? 'عداد الكلمات والنصوص' : 'Word & Character Counter'}
            </Link>
          </div>

          {/* Quick Links */}
          <div style={footerSectionStyle}>
            <h4 style={footerHeadingStyle}>{t('footerQuickLinks')}</h4>
            <Link to="/" style={footerLinkStyle}>{t('navHome')}</Link>
            <Link to="/tools" style={footerLinkStyle}>{t('navTools')}</Link>
            <Link to="/about" style={footerLinkStyle}>{t('navAbout')}</Link>
            <Link to="/contact" style={footerLinkStyle}>{t('navContact')}</Link>
          </div>

          {/* Legal & Policy Links */}
          <div style={footerSectionStyle}>
            <h4 style={footerHeadingStyle}>{t('footerLegal')}</h4>
            <Link to="/privacy-policy" style={footerLinkStyle}>{t('navPrivacy')}</Link>
            <Link to="/terms-of-use" style={footerLinkStyle}>{t('navTerms')}</Link>
            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('footerAdSenseNotice')}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            {t('footerCopyright', { year: currentYear })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>{language === 'ar' ? 'صُنع بعناية للمستخدمين' : 'Engineered for simplicity & privacy'}</span>
            <Heart size={14} color="var(--color-danger)" fill="var(--color-danger)" />
          </div>
        </div>
      </div>
    </footer>
  );
};
