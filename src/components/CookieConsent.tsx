import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface CookiePreferences {
  necessary: boolean;
  functionality: boolean;
  analytics: boolean;
  advertisement: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functionality: true,
  analytics: true,
  advertisement: true
};

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent) {
      setPreferences(JSON.parse(consent));
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const acceptAll = () => saveConsent(DEFAULT_PREFERENCES);
  
  const rejectAll = () => saveConsent({
    necessary: true,
    functionality: false,
    analytics: false,
    advertisement: false
  });

  const btnPrimary = "w-full py-2.5 px-4 bg-[#3b5bdb] hover:bg-[#364fc7] text-white font-bold rounded-lg transition-colors text-sm text-center";
  const btnSecondary = "w-full py-2.5 px-4 bg-[#e5ebf8] hover:bg-[#dbe4f5] text-[#1c3c9c] font-bold rounded-lg transition-colors text-sm text-center";

  const renderToggle = (id: keyof CookiePreferences, label: string, isAlwaysEnabled = false) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className="border border-slate-100 rounded-xl mb-2 overflow-hidden bg-[#f4f6fa]">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer select-none"
          onClick={() => setExpandedSection(isExpanded ? null : id)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-0.5 shadow-sm">
              {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </div>
            <span className="font-bold text-[#2a3c5a] text-sm">{label}</span>
          </div>
          <div className="flex items-center gap-3">
            {isAlwaysEnabled && <span className="text-xs font-semibold text-[#1c3c9c]">Always Enabled</span>}
            <button 
              type="button"
              disabled={isAlwaysEnabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!isAlwaysEnabled) setPreferences(p => ({ ...p, [id]: !p[id] }));
              }}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                preferences[id] ? "bg-[#8ea5ea]" : "bg-slate-300",
                isAlwaysEnabled && "opacity-60 cursor-not-allowed"
              )}
            >
              <span 
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center",
                  preferences[id] ? "translate-x-4" : "translate-x-0"
                )}
              >
                {preferences[id] && <span className="text-[#8ea5ea] text-[10px] font-bold">✓</span>}
                {!preferences[id] && <X className="w-2.5 h-2.5 text-slate-400" />}
              </span>
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-200/50 bg-white leading-relaxed">
            {id === 'necessary' && "These cookies are essential in order to enable you to move around the website and use its features, such as accessing secure areas of the website."}
            {id === 'functionality' && "These cookies allow the website to remember choices you make (such as your user name, language or the region you are in) and provide enhanced, more personal features."}
            {id === 'analytics' && "These cookies collect information about how visitors use a website, for instance which pages visitors go to most often, and if they get error messages from web pages."}
            {id === 'advertisement' && "These cookies are used to deliver adverts more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaign."}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Small Banner overlay */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 z-[999] w-full max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden flex flex-col font-sans">
              <div className="p-6 pb-5">
                <h3 className="text-[#1a2b4b] font-bold text-lg mb-3">Welcome to using Stoolzen!</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We use cookies to enhance and personalize your experience.
                </p>
              </div>
              
              <div className="px-6 flex flex-col gap-2.5 mb-5">
                <button onClick={acceptAll} className={btnPrimary}>
                  Accept all
                </button>
                <button onClick={rejectAll} className={btnSecondary}>
                  Reject all
                </button>
                <button onClick={() => setShowModal(true)} className={btnSecondary}>
                  Manage preferences
                </button>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
                <Link to="/privacy-policy" className="text-xs font-semibold text-[#1a2b4b] hover:text-[#3b5bdb] transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden font-sans"
            >
              <div className="flex items-center justify-between p-5 lg:p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-[#1a2b4b] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#3b5bdb]" />
                  Consent Preferences Center
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-1.5 bg-[#e5ebf8] hover:bg-[#dbe4f5] text-[#1c3c9c] rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 lg:p-6">
                <h3 className="font-bold text-[#1a2b4b] mb-2 text-sm">Cookie Usage</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  We use cookies to enhance and personalize your experience.
                </p>

                <div className="flex flex-col">
                  {renderToggle('necessary', 'Strictly Necessary Cookies', true)}
                  {renderToggle('functionality', 'Functionality Cookies')}
                  {renderToggle('analytics', 'Analytics Cookies')}
                  {renderToggle('advertisement', 'Advertisement Cookies')}
                </div>
              </div>

              <div className="p-5 lg:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 bg-slate-50/50">
                <div className="flex w-full sm:w-auto gap-3 flex-1">
                  <button 
                    onClick={acceptAll}
                    className="flex-1 py-2.5 px-6 bg-[#3b5bdb] hover:bg-[#364fc7] text-white font-bold rounded-lg transition-colors text-sm"
                  >
                    Accept all
                  </button>
                  <button 
                    onClick={rejectAll}
                    className="flex-1 py-2.5 px-6 bg-[#3b5bdb] hover:bg-[#364fc7] text-white font-bold rounded-lg transition-colors text-sm"
                  >
                    Reject all
                  </button>
                </div>
                <button 
                  onClick={() => saveConsent(preferences)}
                  className="w-full sm:w-auto py-2.5 px-6 bg-[#e5ebf8] hover:bg-[#dbe4f5] text-[#1c3c9c] font-bold rounded-lg transition-colors text-sm"
                >
                  Save preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
