import React, { useEffect } from 'react';
import { Info } from 'lucide-react';
import { cn } from '../lib/utils';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  className?: string;
  type?: 'horizontal' | 'vertical' | 'square';
  slot?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  className, 
  type = 'horizontal',
  slot = 'XXXXXXXXXX' // Placeholder slot ID
}) => {
  const adRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: any;
    let observer: IntersectionObserver | null = null;
    
    const initAd = () => {
      try {
        // Double check dimensions before pushing
        if (adRef.current && adRef.current.offsetWidth > 0) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('Adsbygoogle error:', e);
      }
    };

    // Use Intersection Observer to wait until the ad is actually visible
    // and has dimensions in the layout
    if (adRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.boundingClientRect.width > 0) {
            initAd();
            if (observer) observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(adRef.current);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  const getDimensions = () => {
    switch (type) {
      case 'vertical':
        return 'w-full min-h-[400px] h-[400px]';
      case 'square':
        return 'w-full min-h-[250px] h-[250px]';
      case 'horizontal':
      default:
        return 'w-full min-h-[90px] h-[90px]';
    }
  };

  return (
    <div className={cn("relative rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden group hover:border-indigo-300 transition-colors flex flex-col", className)}>
      <div className="flex items-center justify-between p-2 border-b border-slate-100 bg-slate-50/50">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Info className="w-2.5 h-2.5" /> Sponsored
        </span>
      </div>
      
      <div ref={adRef} className={cn("flex items-center justify-center bg-slate-50", getDimensions())}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}
          data-ad-client="ca-pub-6484516299507438"
          {...(slot !== 'XXXXXXXXXX' ? { 'data-ad-slot': slot } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
