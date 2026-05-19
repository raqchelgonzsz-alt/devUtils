import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  FileCode, 
  Terminal, 
  Lock, 
  Bolt, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdBanner } from '../components/AdBanner';
import { cn } from '../lib/utils';

const tools = [
  {
    name: 'JSON Formatter',
    description: 'Beautify, minify, and validate JSON payloads with syntax highlighting.',
    path: '/tools/json/formatter',
    icon: Terminal,
    category: 'PARSER',
    color: 'bg-yellow-400'
  },
  {
    name: 'GraphQL Formatter',
    description: 'Validate, format, and neatly indent complex GraphQL queries and mutations.',
    path: '/tools/graphql/formatter',
    icon: FileCode,
    category: 'FORMAT UTILITY',
    color: 'bg-pink-400'
  },
  {
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens to inspect headers, payloads, and verify signatures safely.',
    path: '/tools/api/jwt-decoder',
    icon: Lock,
    category: 'SECURITY',
    color: 'bg-blue-400'
  }
];

const features = [
  {
    title: 'Lightning Fast Execution',
    description: 'Instant formatting, parsing, and decoding utilizing client-side WASM and highly optimized engines. No server round-trips required.',
    icon: Zap,
    color: 'text-primary'
  },
  {
    title: 'Secure by Design',
    description: 'Your API keys, JWTs, and sensitive JSON payloads never leave your local machine. We prioritize a zero-trust architecture.',
    icon: ShieldCheck,
    color: 'text-secondary'
  },
  {
    title: 'Developer First Aesthetic',
    description: 'A clean, high-density interface inspired by modern IDEs. Built to minimize visual noise so you can focus entirely on data.',
    icon: Bolt,
    color: 'text-tertiary'
  }
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <SEO 
        title="Stoolzen - Best Developer Tools | JSON, GraphQL, JWT"
        description="The ultimate toolbox for developers. JSON Formatter, GraphQL Validator, and JWT Decoder. Fast, secure, and entirely offline."
        keywords="stoolzen, dev tools, json formatters, graphql beautifier, jwt validators, dev tools online, programmer utilities"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Stoolzen",
          "url": "https://stoolzen.com",
          "description": "Essential developer tools: JSON Formatter, GraphQL Validator, and JWT Decoder.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-bright rounded-[2rem] p-12 lg:p-20 border border-outline-variant shadow-[0_8px_40px_rgb(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-16 transition-all duration-500 hover:shadow-[0_20px_80px_rgb(0,0,0,0.04)]">
        <div className="relative z-10 max-w-2xl space-y-8 flex-1 text-center md:text-left">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-on-surface leading-[1.1]">
            Developer Tools for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">JSON, API, Regex</span>
          </h1>
          <p className="text-xl text-outline leading-relaxed font-medium max-w-xl">
            Format JSON, validate GraphQL, and decode JWT instantly. Fast, secure tools optimized for your workflow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/tools" className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              Explorer Tools
            </Link>
            <Link to="/docs" className="px-8 py-4 bg-surface-container border border-outline-variant text-on-surface font-bold rounded-2xl hover:bg-surface-container-high transition-all">
              Documentation
            </Link>
          </div>
        </div>

        <div className="relative z-10 shrink-0 w-40 h-40 md:w-64 md:h-64 group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse group-hover:bg-primary/30 transition-colors" />
          <img 
            src="/logo.png" 
            alt="Stoolzen Main Logo" 
            className="w-full h-full object-contain drop-shadow-2xl animate-float relative z-10 transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
      </section>

      {/* Dashboard Section */}
      <section className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-on-surface tracking-tight">Workbench Dashboard</h2>
          <p className="text-sm text-outline font-medium">Quick access to your most frequently used utilities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.path}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={tool.path}
                className="group flex flex-col h-full bg-surface-bright border border-outline-variant rounded-2xl p-6 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={cn("p-3 rounded-xl text-white shadow-sm transition-transform group-hover:scale-110", tool.color)}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-outline bg-surface-container px-2.5 py-1 rounded-full uppercase">
                    {tool.category}
                  </span>
                </div>
                
                <div className="space-y-2 mt-auto">
                  <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-outline leading-relaxed font-medium">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      <AdBanner />

      {/* Benefits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-bright p-4 rounded-xl border border-outline-variant flex items-center gap-4 shadow-sm transition-colors">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface tracking-tight">Safe & Private</div>
            <div className="text-[11px] text-outline font-medium">Browser-only processing</div>
          </div>
        </div>
        <div className="bg-surface-bright p-4 rounded-xl border border-outline-variant flex items-center gap-4 shadow-sm transition-colors">
          <div className="w-10 h-10 bg-primary-container text-primary rounded-full flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface tracking-tight">Zero Latency</div>
            <div className="text-[11px] text-outline font-medium">Instant WASM formatting</div>
          </div>
        </div>
          <div className="bg-surface-bright p-4 rounded-xl border border-outline-variant flex items-center gap-4 shadow-sm transition-colors">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Bolt className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface tracking-tight">1.2M Developers</div>
            <div className="text-[11px] text-outline font-medium">Trusted global community</div>
          </div>
        </div>
      </div>
    </div>
  );
};
