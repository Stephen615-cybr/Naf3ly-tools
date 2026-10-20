import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  CalendarCheck, 
  Percent, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ToolCard = ({ tool }) => {
  const { language, isRtl } = useLanguage();

  const getIcon = (name) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap size={26} color="var(--color-primary)" />;
      case 'Briefcase': return <Briefcase size={26} color="var(--color-accent)" />;
      case 'CalendarCheck': return <CalendarCheck size={26} color="#8b5cf6" />;
      case 'Percent': return <Percent size={26} color="#f59e0b" />;
      case 'FileText': return <FileText size={26} color="#06b6d4" />;
      default: return <Sparkles size={26} color="var(--color-primary)" />;
    }
  };

  const title = language === 'ar' ? tool.titleAr : tool.titleEn;
  const desc = language === 'ar' ? tool.descAr : tool.descEn;
  const badge = language === 'ar' ? tool.badgeAr : tool.badgeEn;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <Link 
      to={tool.route}
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div>
        {/* Top bar with Icon and Category/Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div 
            style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-surface-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {getIcon(tool.iconName)}
          </div>

          {badge && (
            <span className="badge badge-primary">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          style={{ 
            fontSize: '1.1875rem', 
            fontWeight: 700, 
            marginBottom: '0.625rem',
            color: 'var(--text-primary)'
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}
        >
          {desc}
        </p>
      </div>

      {/* Action Footer */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--color-primary)',
          fontSize: '0.875rem',
          fontWeight: 600,
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1rem',
          marginTop: 'auto'
        }}
      >
        <span>{language === 'ar' ? 'فتح الأداة الآن' : 'Open Tool Now'}</span>
        <ArrowIcon size={16} />
      </div>
    </Link>
  );
};
