import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  UserX, 
  Languages, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  Search,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { toolsData, categories } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const Home = () => {
  const { t, language, isRtl } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  usePageMeta({
    title: language === 'ar' ? 'الرئيسية | أدوات مجانية ذكية' : 'Home | Free Smart Productivity Tools',
    description: t('taglineSubtitle'),
    canonicalPath: '/'
  });

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const title = (language === 'ar' ? tool.titleAr : tool.titleEn).toLowerCase();
      const desc = (language === 'ar' ? tool.descAr : tool.descEn).toLowerCase();
      const tagsMatch = tool.tags.some((tag) => tag.toLowerCase().includes(q));

      return title.includes(q) || desc.includes(q) || tagsMatch;
    });
  }, [searchQuery, selectedCategory, language]);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') }
  ];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section 
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '3.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
          
          {/* Hero Badge */}
          <div 
            className="badge badge-primary" 
            style={{ 
              marginBottom: '1.25rem',
              padding: '0.4rem 0.95rem',
              fontSize: '0.8125rem'
            }}
          >
            <Sparkles size={14} />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Headline */}
          <h1 
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 900,
              letterSpacing: language === 'ar' ? '0' : '-0.03em',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}
          >
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p 
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '720px',
              marginInline: 'auto'
            }}
          >
            {t('heroSubtitle')}
          </p>

          {/* Prominent Search Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>

          {/* Trust Badges Row */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} color="var(--color-success)" />
              {t('privacyBadge')}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={16} color="var(--color-primary)" />
              {t('clientSideBadge')}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <UserX size={16} color="var(--color-accent)" />
              {t('noAccountBadge')}
            </span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER & POPULAR TOOLS SECTION */}
      <section style={{ paddingBottom: '3.5rem' }}>
        <div className="container">
          
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                {t('popularToolsHeading')}
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {t('popularToolsSubtitle')}
              </p>
            </div>

            {/* Category pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  {language === 'ar' ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}
            >
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            /* Clear Empty State */
            <div 
              className="card text-center" 
              style={{ 
                padding: '3.5rem 1.5rem', 
                backgroundColor: 'var(--bg-surface-secondary)',
                marginBottom: '2rem'
              }}
            >
              <Search size={44} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('noResultsFound')}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '440px', marginInline: 'auto' }}>
                {t('noResultsHint')}
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="btn btn-secondary btn-sm"
              >
                {t('clearSearch')}
              </button>
            </div>
          )}

          {/* All Tools Directory CTA */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/tools" className="btn btn-outline btn-lg">
              <span>{t('viewAllTools')}</span>
              <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS & VALUE PROPOSITION */}
      <section 
        style={{
          padding: '4rem 0',
          backgroundColor: 'var(--bg-surface-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              {t('benefitsTitle')}
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>
              {t('benefitsSubtitle')}
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {/* Benefit 1 */}
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {t('benefit1Title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t('benefit1Desc')}
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <UserX size={26} />
              </div>
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {t('benefit2Title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t('benefit2Desc')}
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Zap size={26} />
              </div>
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {t('benefit3Title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t('benefit3Desc')}
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Languages size={26} />
              </div>
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {t('benefit4Title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t('benefit4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AD PLACEMENT READY CONTAINER */}
      <div className="container">
        <AdBannerSlot slotId="home-mid-banner" />
      </div>

      {/* 5. FAQ SECTION */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              <HelpCircle size={14} />
              <span>{t('faqTitle')}</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
              {t('faqTitle')}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {t('faqSubtitle')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: isRtl ? 'right' : 'left',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      color="var(--text-muted)" 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                        marginInlineStart: '0.75rem'
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div 
                      style={{
                        padding: '0 1.5rem 1.25rem 1.5rem',
                        fontSize: '0.9375rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        borderTop: '1px solid var(--border-subtle)'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
