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
  Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

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
    <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-indigo-600">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            DevUtils<span className="text-indigo-500">.io</span>
          </span>
        </Link>
        <nav className="flex gap-6 items-center text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
          <a href="#" className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">Premium</a>
        </nav>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 flex-shrink-0">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Tools Palette</div>
          <nav className="space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  location.pathname === item.path 
                    ? "text-slate-900 bg-slate-100" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto">
            <div className="bg-indigo-600 rounded-lg p-4 text-white text-xs">
              <p className="font-bold mb-2">Go Premium</p>
              <p className="opacity-80 mb-3 font-medium">Save snippets, use CLI, and remove all ads.</p>
              <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded shadow-sm hover:bg-slate-50 transition-colors">Upgrade Now</button>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </div>
          
          {/* Bottom Ad Banner (Monetization Placeholder) */}
          <footer className="h-12 bg-slate-900 flex items-center justify-center text-slate-400 text-xs gap-4 flex-shrink-0">
            <span className="opacity-60 uppercase tracking-widest text-[9px] font-bold">Advertisement</span>
            <span className="hidden md:inline">Host your projects on <span className="text-white font-bold">UltraNode</span> - Deploy in seconds for just $5/mo</span>
            <button className="px-3 py-1 border border-slate-700 rounded hover:text-white transition-colors">Learn More</button>
          </footer>
        </main>
      </div>
    </div>
  );
};
