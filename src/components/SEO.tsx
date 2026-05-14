import React from 'react';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  jsonLd?: object;
  canonical?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogType = 'website',
  jsonLd,
  canonical,
  breadcrumbs
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

    // Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonical || window.location.href.split('?')[0]);

    // OG Tags
    const updateMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('property', 'og:title', ogTitle || title);
    updateMeta('property', 'og:description', ogDescription || description);
    updateMeta('property', 'og:type', ogType);
    updateMeta('property', 'og:url', window.location.href);
    
    // Twitter Tags
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', ogTitle || title);
    updateMeta('name', 'twitter:description', ogDescription || description);

    // JSON-LD Management
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(s => s.remove());

    const addJsonLd = (data: object) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    if (jsonLd) addJsonLd(jsonLd);

    if (breadcrumbs) {
      addJsonLd({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `https://stoolzen.com${item.item}`
        }))
      });
    }

  }, [title, description, keywords, ogTitle, ogDescription, ogType, jsonLd, canonical, breadcrumbs]);

  return null;
};
