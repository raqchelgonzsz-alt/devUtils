import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  jsonLd?: object;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogType = 'website',
  jsonLd
}) => {
  React.useEffect(() => {
    document.title = title;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // OG Tags
    const updateOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOG('og:title', ogTitle || title);
    updateOG('og:description', ogDescription || description);
    updateOG('og:type', ogType);
    updateOG('og:url', window.location.href);

    // JSON-LD
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

  }, [title, description, keywords, ogTitle, ogDescription, ogType, jsonLd]);

  return null;
};
