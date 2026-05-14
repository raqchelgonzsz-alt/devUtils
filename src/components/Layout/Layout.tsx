import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Terminal, 
  Lock, 
  Search, 
  Settings, 
  Moon, 
  HelpCircle, 
  Plus, 
  Home,
  FileCode,
  LayoutGrid,
  FileText,
  Activity,
  Menu,
  Sun
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AdBanner } from '../AdBanner';
import { Footer } from '../Footer';
import { CookieConsent } from '../CookieConsent';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'JSON Formatter', icon: Terminal, path: '/json', color: 'bg-yellow-400' },
    { name: 'GraphQL Formatter', icon: FileCode, path: '/graphql', color: 'bg-pink-400' },
    { name: 'JWT Decoder', icon: Lock, path: '/jwt', color: 'bg-blue-400' },
  ];

  const bottomNavItems = [
    { name: 'Documentation', icon: FileText, path: '/docs' },
    { name: 'API', icon: Activity, path: '/status' },
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
          <Link to="/docs" className="hidden sm:block hover:text-primary transition-colors">Docs</Link>
          <Link to="/premium" className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">Premium</Link>
        </nav>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Navigation - Force hidden on mobile, only flex on large screens */}
        <aside className="hidden lg:flex w-64 bg-surface-bright border-r border-outline-variant flex-col flex-shrink-0 z-40 overflow-hidden transition-colors">
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            <div className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4 px-2">Tools Palette</div>
            <nav className="space-y-1 mb-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  location.pathname === item.path 
                    ? "text-on-surface bg-surface-container" 
                    : "text-outline hover:bg-surface-container-low"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                {item.name}
              </Link>
            ))}
          </nav>

            {/* Sidebar Ad - Managed height */}
            <div className="mt-4 mb-6">
              <AdBanner type="vertical" />
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100">
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
            
            {/* Bottom Ad Banner - moved inside scrollable area so it is not fixed */}
            <div className="mt-8 mb-4">
              <AdBanner />
            </div>
            
            <Footer />
          </div>
        </main>

        <CookieConsent />

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[72px] transition-all",
                location.pathname === item.path ? "text-primary" : "text-outline"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight">{item.name.split(' ')[0]}</span>
              {location.pathname === item.path && (
                <div className={cn("absolute bottom-0 w-8 h-1 rounded-t-full", item.color)} />
              )}
            </Link>
          ))}
          <Link
            to="/"
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[72px] transition-all",
              location.pathname === "/" ? "text-primary" : "text-outline"
            )}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight">Home</span>
            {location.pathname === "/" && (
              <div className="absolute bottom-0 w-8 h-1 bg-indigo-600 rounded-t-full" />
            )}
          </Link>
        </nav>
      </div>
    </div>
  );
};
