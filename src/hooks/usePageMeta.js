import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const usePageMeta = ({ title, description, canonicalPath }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // 1. Update Title
    const brandSuffix = language === 'ar' ? 'نفعلي' : 'Naf3ly Tools';
    const pageTitle = title ? `${title} | ${brandSuffix}` : `${t('brandName')} - ${t('brandTagline')}`;
    document.title = pageTitle;

    // 2. Update Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = description || t('taglineSubtitle');
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    }

    // 3. Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', descContent);
    }

    // 4. Update Canonical
    const canonicalBase = 'https://naf3ly-tools.pages.dev';
    const path = canonicalPath || window.location.pathname;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', `${canonicalBase}${path}`);

    // Scroll to top on page transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, canonicalPath, language]);
};
