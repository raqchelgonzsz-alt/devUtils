import React, { useState, useEffect } from 'react';
import { Hash, Copy, Download, Trash2, CheckCircle2, Type, FileCode, ArrowLeftRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const BASE64_SEO_MAP: Record<string, { title: string; description: string; keywords: string; h1: string; subtitle: string; intro: string; faqs: { q: string; a: string }[] }> = {
  '/tools/text/base64-encoder': {
    title: 'Codificador Base64 Online - Convertir Texto a Base64 | Stoolzen',
    description: 'Codifica cualquier texto o dato binario a formato Base64 online de forma gratuita. Herramienta rápida, segura y privada para desarrolladores.',
    keywords: 'codificador base64, texto a base64, base64 encode online, convertir a base64, dev tools',
    h1: 'Codificador Base64',
    subtitle: 'Convierte tus cadenas de texto a formato Base64 al instante.',
    intro: 'La codificación Base64 es un proceso de conversión de datos binarios en una cadena de texto ASCII. Es ampliamente utilizado para embeber imágenes en archivos CSS, transmitir datos en JSON o enviar adjuntos en correos electrónicos.',
    faqs: [
      { q: "¿Para qué sirve el Base64?", a: "Se usa principalmente para transmitir datos que de otro modo podrían ser interpretados incorrectamente por sistemas que solo manejan texto plano, como protocolos de email antiguos o XML." },
      { q: "¿Es seguro codificar contraseñas en Base64?", a: "No. Base64 NO es encriptación. Cualquier persona puede decodificarlo fácilmente. Úsalo solo para transporte de datos, nunca para ocultar información sensible." }
    ]
  },
  '/tools/text/base64-decoder': {
    title: 'Decodificador Base64 Online - Convertir Base64 a Texto | Stoolzen',
    description: 'Decodifica cadenas Base64 a texto plano online al instante. Herramienta gratuita y segura para recuperar datos originales de Base64.',
    keywords: 'decodificador base64, base64 a texto, base64 decode online, convertir base64 a texto, dev tools',
    h1: 'Decodificador Base64',
    subtitle: 'Decodifica cualquier cadena Base64 a su formato de texto original.',
    intro: 'Si tienes un fragmento de datos en Base64, esta herramienta te permite recuperar el contenido original. Es ideal para inspeccionar payloads de APIs o extraer datos de archivos de configuración.',
    faqs: [
      { q: "¿Cómo sé si una cadena es Base64?", a: "Las cadenas Base64 suelen terminar en uno o dos caracteres de relleno '=', y solo contienen caracteres A-Z, a-z, 0-9, + y /." }
    ]
  }
};

const FALLBACK_SEO = {
  title: 'Codificador/Decodificador Base64 Online | Stoolzen',
  description: 'Herramienta para convertir texto a Base64 y viceversa.',
  keywords: 'base64, encode, decode, text tools',
  h1: 'Base64 Encoder/Decoder',
  subtitle: 'Codifica y decodifica texto en formato Base64 de forma rápida.',
  intro: 'Una utilidad sencilla para trabajar con codificación Base64 en tu flujo de trabajo diario.',
  faqs: []
};

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = BASE64_SEO_MAP[pathname] ?? FALLBACK_SEO;

  const handleProcess = (mode: 'encode' | 'decode') => {
    if (!input.trim()) return;
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
        setStatusMessage({ title: 'Codificado con éxito', detail: 'Texto convertido a Base64.' });
      } else {
        setOutput(atob(input));
        setStatusMessage({ title: 'Decodificado con éxito', detail: 'Base64 convertido a texto original.' });
      }
      setError(null);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError(mode === 'encode' ? 'Error al codificar: Asegúrate de que el texto no contenga caracteres especiales no soportados por btoa.' : 'Error al decodificar: La cadena no parece ser un Base64 válido.');
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setStatusMessage({ title: 'Copiado al portapapeles', detail: 'El resultado está listo para usar.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pathname.includes('encoder') ? 'encoded.txt' : 'decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleSwap = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
  };

  // Auto-process based on pathname if possible
  useEffect(() => {
    if (pathname.includes('encoder')) {
        try {
            if (input) setOutput(btoa(input));
        } catch (e) {}
    } else {
        try {
            if (input) setOutput(atob(input));
        } catch (e) {}
    }
  }, [input, pathname]);

  const btnClass = "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 shadow-sm";

  return (
    <div className="h-full flex flex-col space-y-6 relative pb-20">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
          { name: 'Texto', item: '/tools/text' },
          { name: seo.h1, item: pathname }
        ]}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-4 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">{seo.h1}</h1>
          <p className="text-outline">{seo.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[600px]">
        {/* Input Panel */}
        <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Entrada</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleClear} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Limpiar Entrada">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm resize-none focus:outline-none min-h-[300px]"
            placeholder={pathname.includes('encoder') ? "Escribe o pega el texto a codificar..." : "Pega la cadena Base64 a decodificar..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm relative">
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Resultado</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleSwap} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Intercambiar Entrada/Salida">
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              <button onClick={handleDownload} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Descargar Resultado">
                <Download className="w-4 h-4" />
              </button>
              <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Copiar Resultado">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              className="w-full h-full bg-transparent p-4 font-mono text-sm resize-none focus:outline-none min-h-[300px]"
              readOnly
              value={output}
              placeholder="El resultado aparecerá aquí..."
            />
            {error && (
              <div className="absolute inset-0 bg-red-50/50 backdrop-blur-[1px] flex items-center justify-center p-6 text-center">
                <div className="bg-white border border-red-200 rounded-xl p-4 shadow-lg text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-bold">{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Manual Actions for Mobile */}
      <div className="flex lg:hidden justify-center gap-4">
          <button 
            onClick={() => handleProcess(pathname.includes('encoder') ? 'encode' : 'decode')}
            className={cn(btnClass, "bg-indigo-600 text-white")}
          >
            {pathname.includes('encoder') ? 'Codificar Ahora' : 'Decodificar Ahora'}
          </button>
      </div>

      {/* SEO/Educational Content */}
      <div className="mt-10 pt-8 border-t border-outline-variant space-y-12">
        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <FileCode className="w-6 h-6 text-indigo-500" />
            ¿Qué es {seo.h1}?
          </h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              <strong>Base64</strong> es un esquema de codificación binario a texto que representa datos binarios en un formato de cadena ASCII. Se utiliza comúnmente para transmitir datos que de otro modo podrían ser interpretados incorrectamente por sistemas que solo manejan texto, como correos electrónicos o URLs.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">¿Cuándo usar Base64?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Incrustar Imágenes:</strong> Convertir pequeños iconos o imágenes en strings para usarlos directamente en CSS o HTML (Data URIs).</li>
              <li><strong>Transferencia de Archivos:</strong> Enviar archivos adjuntos en formatos de texto como JSON o XML.</li>
              <li><strong>Autenticación Básica:</strong> Codificar credenciales (usuario:contraseña) para el encabezado <code>Authorization</code> de HTTP.</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        {seo.faqs.length > 0 && (
          <section className="bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant">
            <h2 className="text-2xl font-bold text-on-surface mb-8">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {seo.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface">{faq.q}</h3>
                  <p className="text-outline leading-relaxed italic border-l-2 border-indigo-100 pl-4">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Status Toast */}
      <AnimatePresence>
        {showStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-8 z-[100]"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl flex items-center gap-4 min-w-[300px]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{statusMessage.title}</span>
                <span className="text-[11px] text-slate-500 font-medium">{statusMessage.detail}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AlertCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
