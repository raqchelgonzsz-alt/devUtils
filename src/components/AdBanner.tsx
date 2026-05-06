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
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle error:', e);
    }
  }, []);

  const getDimensions = () => {
    switch (type) {
      case 'vertical':
        return 'w-full h-[400px]';
      case 'square':
        return 'w-full h-[250px]';
      case 'horizontal':
      default:
        return 'w-full h-[90px]';
    }
  };

  return (
    <div className={cn("relative rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden group hover:border-indigo-300 transition-colors flex flex-col", className)}>
      <div className="flex items-center justify-between p-2 border-b border-slate-100 bg-slate-50/50">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Info className="w-2.5 h-2.5" /> Sponsored
        </span>
      </div>
      
      <div className={cn("flex items-center justify-center bg-slate-50", getDimensions())}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
