import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Lock, 
  Moon, 
  FileText,
  Sun,
  Braces,
  FileCode,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  Home,
  Wand2,
  Search,
  Code2,
  Minimize,
  Layers,
  GitCompare,
  Filter,
  ArrowLeftRight,
  FileSearch,
  AlignLeft,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AdBanner } from '../AdBanner';
import { Footer } from '../Footer';
import { CookieConsent } from '../CookieConsent';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_CATEGORIES = [
  {
    id: 'json',
    label: 'JSON',
    icon: Braces,
    color: 'text-yellow-500',
    hubPath: '/tools/json',
    tools: [
      { name: 'Formatter', path: '/tools/json/formatter', icon: Wand2 },
      { name: 'Validator', path: '/tools/json/validator', icon: Search },
      { name: 'Editor', path: '/tools/json/editor', icon: Code2 },
      { name: 'Minifier', path: '/tools/json/minify', icon: Minimize },
      { name: 'Viewer', path: '/tools/json/viewer', icon: Layers },
      { name: 'Sorter', path: '/tools/json/sorter', icon: Filter },
      { name: 'Compare', path: '/tools/json/compare', icon: GitCompare },
      { name: 'Escape', path: '/tools/json/escape', icon: ArrowLeftRight },
      { name: 'JSONPath', path: '/tools/json/path-explorer', icon: FileSearch },
      { name: 'Diff', path: '/tools/json/diff', icon: GitCompare },
    ],
  },
  {
    id: 'graphql',
    label: 'GraphQL',
    icon: FileCode,
    color: 'text-pink-500',
    hubPath: '/tools/graphql',
    tools: [
      { name: 'Formatter', path: '/tools/graphql/formatter', icon: Wand2 },
      { name: 'Validator', path: '/tools/graphql/validator', icon: Search },
      { name: 'Editor', path: '/tools/graphql/editor', icon: Code2 },
      { name: 'Minifier', path: '/tools/graphql/minifier', icon: Minimize },
      { name: 'Checker', path: '/tools/graphql/checker', icon: Search },
    ],
  },
  {
    id: 'api',
    label: 'API & Auth',
    icon: Lock,
    color: 'text-blue-500',
    hubPath: '/tools/api',
    tools: [
      { name: 'JWT Decoder', path: '/tools/api/jwt-decoder', icon: Lock },
    ],
  },
  {
    id: 'text',
    label: 'Texto',
    icon: AlignLeft,
    color: 'text-emerald-500',
    hubPath: '/tools/text',
    tools: [
      { name: 'Base64 Encoder', path: '/tools/text/base64-encoder', icon: FileCode },
      { name: 'Base64 Decoder', path: '/tools/text/base64-decoder', icon: ArrowLeftRight },
    ],
  },
  {
    id: 'css',
    label: 'CSS',
    icon: Layers,
    color: 'text-indigo-500',
    hubPath: '/tools/css',
    tools: [
      { name: 'Formatter', path: '/tools/css/formatter', icon: Wand2 },
    ],
  },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [openCategories, setOpenCategories] = useState<string[]>(['json']);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const mobileNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'JSON', icon: Braces, path: '/tools/json' },
    { name: 'GraphQL', icon: FileCode, path: '/tools/graphql' },
    { name: 'JWT', icon: Lock, path: '/tools/api/jwt-decoder' },
    { name: 'Tools', icon: LayoutGrid, path: '/tools' },
  ];

  return (
    <div className="flex flex-col h-screen bg-surface font-sans overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="h-16 bg-surface-bright border-b border-outline-variant flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-50 transition-colors">
        <Link to="/" className="flex items-center gap-3 text-indigo-600 group">
          <div className="w-10 h-10 overflow-hidden rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <img src="/logo.png" alt="Stoolzen Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight text-on-surface">
            Stoolzen<span className="text-primary">.com</span>
          </span>
        </Link>
        <nav className="flex gap-4 md:gap-6 items-center text-sm font-medium text-outline">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Link to="/tools" className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors font-semibold">
            <LayoutGrid className="w-4 h-4" />
            Tools
          </Link>
          <Link to="/docs" className="hidden sm:block hover:text-primary transition-colors">Docs</Link>
          <Link to="/premium" className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">Premium</Link>
        </nav>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex w-60 bg-surface-bright border-r border-outline-variant flex-col flex-shrink-0 z-40 overflow-hidden transition-colors">
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">

            {/* All Tools Link */}
            <Link
              to="/tools"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all",
                location.pathname === '/tools'
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-outline hover:bg-surface-container-low"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              All Tools
            </Link>

            <div className="h-px bg-outline-variant my-2" />

            {/* Category nav */}
            {NAV_CATEGORIES.map(cat => {
              const isOpen = openCategories.includes(cat.id);
              const isActive = location.pathname.startsWith(`/tools/${cat.id}`);
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all",
                      isActive ? "text-on-surface bg-surface-container" : "text-outline hover:bg-surface-container-low"
                    )}
                  >
                    <cat.icon className={cn("w-4 h-4", cat.color)} />
                    <span className="flex-1 text-left">{cat.label}</span>
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                  {isOpen && (
                    <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l-2 border-outline-variant pl-2">
                      {cat.tools.map(tool => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                            location.pathname === tool.path
                              ? "text-indigo-600 bg-indigo-50 font-bold"
                              : "text-outline hover:text-on-surface hover:bg-surface-container-low"
                          )}
                        >
                          <tool.icon className="w-3.5 h-3.5 flex-shrink-0" />
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sidebar Ad */}
            <div className="mt-4 mb-2">
              <AdBanner type="vertical" />
            </div>
            
            {/* Premium CTA */}
            <div className="mt-auto pt-4 border-t border-outline-variant">
              <div className="bg-indigo-600 rounded-lg p-4 text-white text-xs text-center">
                <p className="font-bold mb-2">Go Premium</p>
                <p className="opacity-80 mb-3 font-medium">Save snippets and remove all ads.</p>
                <Link to="/premium" className="block w-full py-2 bg-white text-indigo-600 font-bold rounded shadow-sm hover:bg-slate-50 transition-colors">Upgrade Now</Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col">
            {children}
            
            {/* Bottom Ad Banner */}
            <div className="mt-8 mb-4">
              <AdBanner />
            </div>
            
            <Footer />
          </div>
        </main>

        <CookieConsent />

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          {mobileNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all",
                location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? "text-primary" : "text-outline"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
