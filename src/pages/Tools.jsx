import React, { useState, useMemo } from 'react';
import { Compass, Search, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { toolsData, categories } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const Tools = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  usePageMeta({
    title: t('navTools'),
    description: language === 'ar' 
      ? 'دليل الأدوات الشامل المجاني على منصة نفعلي: حساب المعدل التراكمي، صانع السيرة الذاتية، حاسبة النسب، وعداد الكلمات.'
      : 'Comprehensive directory of free online productivity tools on Naf3ly: GPA calculator, CV builder, percentage calculator, and word counter.',
    canonicalPath: '/tools'
  });

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

  return (
    <div className="container">
      {/* Header Hero */}
      <div className="tool-header-hero">
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Compass size={14} />
            <span>{t('navTools')}</span>
          </div>
          <h1 className="tool-header-title">
            {language === 'ar' ? 'دليل الأدوات المجانية الشامل' : 'Complete Tools Directory'}
          </h1>
          <p className="tool-header-desc">
            {language === 'ar' 
              ? 'تصفح باقة أدواتنا المتخصصة للطلاب والخريجين والباحثين عن عمل؛ جميع الأدوات تعمل محلياً ومجاناً دون الحاجة لتسجيل حساب.'
              : 'Explore our curated collection of free utilities designed for students and job seekers. Instant, private, and no signup needed.'}
          </p>
        </div>
      </div>

      {/* Search and Category Filter Controls */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Category Pills */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
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

      {/* Results Count Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>
          {language === 'ar' 
            ? `عرض ${filteredTools.length} من أصل ${toolsData.length} أداة متاحة` 
            : `Showing ${filteredTools.length} of ${toolsData.length} available tools`}
        </span>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div 
          className="card text-center" 
          style={{ 
            padding: '3.5rem 1.5rem', 
            backgroundColor: 'var(--bg-surface-secondary)',
            marginBottom: '3rem'
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

      <AdBannerSlot slotId="tools-directory-bottom" />
    </div>
  );
};
