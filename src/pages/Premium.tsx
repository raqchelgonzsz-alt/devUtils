import React from 'react';
import { motion } from 'motion/react';
import { Construction, Sparkles, Rocket, Shield, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Premium: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <SEO 
        title="Premium - DevUtils.io"
        description="DevUtils Premium está en camino. Prepárate para herramientas avanzadas, CLI y más."
      />
      
      <div className="max-w-4xl w-full relative">
        {/* Background blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[2.5rem] p-12 lg:p-16 text-center relative z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Página en Construcción
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Algo <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">Increíble</span> se está Cocinando
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            DevUtils Premium está casi listo. Estamos trabajando duro para ofrecerte las herramientas más avanzadas para optimizar tu flujo de trabajo al máximo.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Rocket, title: 'CLI Tools', desc: 'Usa DevUtils desde tu terminal.' },
              { icon: Shield, title: 'Private Vault', desc: 'Guarda tus snippets de forma segura.' },
              { icon: Zap, title: 'No Ads', desc: 'Experiencia 100% libre de publicidad.' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-900">Estado del Proyecto</span>
              <span className="text-xs font-bold text-indigo-600">85%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)]"
              />
            </div>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </motion.div>

        {/* Floating icon */}
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -right-12 w-24 h-24 bg-white border border-slate-200 rounded-3xl shadow-2xl flex items-center justify-center z-20"
        >
          <Construction className="w-10 h-10 text-yellow-500" />
        </motion.div>
      </div>
    </div>
  );
};
