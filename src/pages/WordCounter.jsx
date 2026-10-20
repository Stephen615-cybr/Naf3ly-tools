import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Copy, 
  Trash2, 
  Clock, 
  Mic, 
  Check, 
  Sparkles,
  AlignLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const WordCounter = () => {
  const { t, language } = useLanguage();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta({
    title: t('toolWordCounterTitle'),
    description: t('toolWordCounterDesc'),
    canonicalPath: '/tools/word-counter'
  });

  // Accurate text statistics calculation
  const stats = useMemo(() => {
    const raw = text;
    if (!raw.trim()) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        readingTimeSeconds: 0,
        speakingTimeMinutes: 0,
        speakingTimeSeconds: 0
      };
    }

    // Characters
    const charsWithSpaces = raw.length;
    const charsNoSpaces = raw.replace(/\s+/g, '').length;

    // Words: split by whitespace and filter out non-word tokens
    const wordsArray = raw.trim().split(/\s+/).filter(Boolean);
    const words = wordsArray.length;

    // Paragraphs: split by double newlines or non-empty lines
    const paragraphs = raw
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0).length;

    // Sentences: match ending punctuation for both Latin and Arabic (. ! ? ؟)
    const sentenceMatches = raw.match(/[^.!?؟\n]+[.!?؟]+(\s|$)/g);
    const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0);

    // Reading time: average 200 words per minute
    const totalReadingSeconds = Math.ceil((words / 200) * 60);
    const readingTimeMinutes = Math.floor(totalReadingSeconds / 60);
    const readingTimeSeconds = totalReadingSeconds % 60;

    // Speaking time: average 130 words per minute
    const totalSpeakingSeconds = Math.ceil((words / 130) * 60);
    const speakingTimeMinutes = Math.floor(totalSpeakingSeconds / 60);
    const speakingTimeSeconds = totalSpeakingSeconds % 60;

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      readingTimeSeconds,
      speakingTimeMinutes,
      speakingTimeSeconds
    };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    if (!text) return;
    if (window.confirm(t('wcClearConfirm'))) {
      setText('');
    }
  };

  const handleSample = () => {
    if (language === 'ar') {
      setText(
        'تعتبر القراءة والمطالعة من أهم العادات التي تسهم في بناء الفكر وتوسيع المدارك الإنسانية.\n\nمن خلال قراءة الكتب المتنوعة، يكتسب الإنسان مهارات لغوية متقدمة ويستطيع التعبير عن أفكاره بثقة واقتدار. نفعلي توفر لك هذه الأداة لتحليل نصوصك ومقالاتك بكل دقة وسهولة.'
      );
    } else {
      setText(
        'Continuous learning and productive writing are the cornerstones of academic and career growth.\n\nBy analyzing your text structure and word choices, you can communicate ideas more clearly and effectively. Naf3ly Tools gives you complete privacy and instant insights without needing an account.'
      );
    }
  };

  // Text Transform Utilities
  const transformUpper = () => setText(text.toUpperCase());
  const transformLower = () => setText(text.toLowerCase());
  const transformTitle = () => {
    const titled = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setText(titled);
  };
  const transformCleanSpaces = () => {
    const cleaned = text
      .split('\n')
      .map((line) => line.trim().replace(/\s+/g, ' '))
      .join('\n');
    setText(cleaned);
  };

  return (
    <div className="container">
      {/* Tool Hero Header */}
      <div className="tool-header-hero">
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <FileText size={14} />
            <span>{language === 'ar' ? 'أدوات النصوص والكتابة' : 'Text & Writing Tool'}</span>
          </div>
          <h1 className="tool-header-title">
            {t('toolWordCounterTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('toolWordCounterDesc')}
          </p>
        </div>

        {/* Quick action buttons in header */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            onClick={handleSample} 
            className="btn btn-secondary btn-sm"
          >
            <Sparkles size={16} />
            <span>{t('wcLoadSample')}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Stat Cards */}
        <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('wcWords')}</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-primary)' }}>{stats.words.toLocaleString()}</div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('wcCharsWithSpaces')}</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stats.charsWithSpaces.toLocaleString()}</div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('wcCharsNoSpaces')}</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-accent)' }}>{stats.charsNoSpaces.toLocaleString()}</div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('wcSentences')}</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#8b5cf6' }}>{stats.sentences.toLocaleString()}</div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{t('wcParagraphs')}</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#f59e0b' }}>{stats.paragraphs.toLocaleString()}</div>
        </div>
      </div>

      {/* Textarea Area */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <AlignLeft size={16} style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: '4px' }} />
            {language === 'ar' ? 'مساحة النص المباشر:' : 'Live Text Area:'}
          </span>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleCopy}
              className={`btn btn-sm ${copied ? 'btn-primary' : 'btn-secondary'}`}
              disabled={!text}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? t('wcCopied') : t('wcCopy')}</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-sm btn-ghost"
              disabled={!text}
              style={{ color: 'var(--color-danger)' }}
            >
              <Trash2 size={14} />
              <span>{t('wcClear')}</span>
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('wcInputPlaceholder')}
          rows={10}
          className="form-textarea"
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            resize: 'vertical',
            minHeight: '220px'
          }}
          aria-label="Text to count"
        />

        {/* Text utilities toolbar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: '1rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {language === 'ar' ? 'أدوات سريعة:' : 'Quick Tools:'}
          </span>
          <button type="button" onClick={transformUpper} className="btn btn-secondary btn-sm" disabled={!text}>
            {t('wcUppercase')}
          </button>
          <button type="button" onClick={transformLower} className="btn btn-secondary btn-sm" disabled={!text}>
            {t('wcLowercase')}
          </button>
          <button type="button" onClick={transformTitle} className="btn btn-secondary btn-sm" disabled={!text}>
            {t('wcTitleCase')}
          </button>
          <button type="button" onClick={transformCleanSpaces} className="btn btn-secondary btn-sm" disabled={!text}>
            {t('wcCleanSpaces')}
          </button>
        </div>
      </div>

      {/* Reading & Speaking Times Breakdown */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-info-bg)',
              color: 'var(--color-info)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('wcReadingTime')}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {stats.readingTimeMinutes} {t('wcMinutes')} {stats.readingTimeSeconds} {t('wcSeconds')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {language === 'ar' ? 'بمعدل 200 كلمة بالدقيقة' : 'Based on 200 words/min'}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Mic size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('wcSpeakingTime')}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {stats.speakingTimeMinutes} {t('wcMinutes')} {stats.speakingTimeSeconds} {t('wcSeconds')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {language === 'ar' ? 'بمعدل 130 كلمة بالدقيقة للإلقاء' : 'Based on 130 words/min presentation'}
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Ready Slot */}
      <AdBannerSlot slotId="word-counter-bottom" />
    </div>
  );
};
