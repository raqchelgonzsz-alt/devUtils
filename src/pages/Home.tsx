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

const tools = [
  {
    name: 'GraphQL Formatter',
    description: 'Validate, format, and neatly indent complex GraphQL queries and mutations.',
    path: '/graphql',
    icon: FileCode,
    category: 'FORMAT UTILITY',
    color: 'bg-primary'
  },
  {
    name: 'JSON Formatter',
    description: 'Beautify, minify, and validate JSON payloads with syntax highlighting.',
    path: '/json',
    icon: Terminal,
    category: 'PARSER',
    color: 'bg-secondary'
  },
  {
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens to inspect headers, payloads, and verify signatures safely.',
    path: '/jwt',
    icon: Lock,
    category: 'SECURITY',
    color: 'bg-tertiary'
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white rounded-3xl p-12 lg:p-16 border border-slate-200 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The Ultimate Developer Toolkit
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            All your essential tools in one place. Fast, secure, and built for developers to execute tasks with precision.
          </p>
          <div className="pt-4 flex items-center gap-4">
             <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200">
               Get Started
               <ArrowRight className="w-4 h-4" />
             </button>
             <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all">
               View Docs
             </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
      </section>

      {/* Dashboard Section */}
      <section className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Workbench Dashboard</h2>
          <p className="text-sm text-slate-500 font-medium">Quick access to your most frequently used utilities.</p>
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
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-600 group-hover:text-indigo-600 transition-colors">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full uppercase">
                    {tool.category}
                  </span>
                </div>
                
                <div className="space-y-2 mt-auto">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 tracking-tight">Safe & Private</div>
            <div className="text-[11px] text-slate-500 font-medium">Browser-only processing</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 tracking-tight">Zero Latency</div>
            <div className="text-[11px] text-slate-500 font-medium">Instant WASM formatting</div>
          </div>
        </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Bolt className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 tracking-tight">1.2M Developers</div>
            <div className="text-[11px] text-slate-500 font-medium">Trusted global community</div>
          </div>
        </div>
      </div>
    </div>
  );
};
