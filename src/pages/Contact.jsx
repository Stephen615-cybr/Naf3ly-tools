import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const Contact = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('contactTitle'),
    description: t('contactSubtitle'),
    canonicalPath: '/contact'
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Generate mailto link for direct client transmission
    const mailtoUrl = `mailto:support@naf3ly.example.com?subject=${encodeURIComponent(form.subject || 'Naf3ly Tools Feedback')}&body=${encodeURIComponent(
      `From: ${form.name} (${form.email})\n\nMessage:\n${form.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ maxWidth: '780px' }}>
      {/* Header */}
      <div className="tool-header-hero" style={{ marginBottom: '2.5rem' }}>
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Mail size={14} />
            <span>{t('navContact')}</span>
          </div>
          <h1 className="tool-header-title">
            {t('contactTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('contactSubtitle')}
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('contactSuccess')}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {t('contactDisclaimer')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm({ name: '', email: '', subject: '', message: '' });
              }}
              className="btn btn-secondary btn-sm"
            >
              {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('contactName')} *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={language === 'ar' ? 'اسمك الكريم' : 'Your full name'}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('contactEmail')} *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('contactSubject')}</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder={language === 'ar' ? 'اقتراح أداة جديدة، بلاغ عن خطأ...' : 'Tool suggestion, feedback, question...'}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('contactMessage')} *</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={language === 'ar' ? 'اكتب رسالتك أو اقتراحك بالتفصيل هنا...' : 'Write your thoughts or bug report here...'}
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {t('contactDisclaimer')}
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                <Send size={18} />
                <span>{t('contactSend')}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Direct Contact Notice */}
      <div 
        style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface-secondary)',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {t('contactDirectEmail')}{' '}
          <strong style={{ color: 'var(--color-primary)' }}>{t('contactDirectAddress')}</strong>
        </div>
      </div>

      <AdBannerSlot slotId="contact-page-bottom" />
    </div>
  );
};
