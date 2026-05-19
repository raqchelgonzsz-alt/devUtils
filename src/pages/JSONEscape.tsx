import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Braces, Copy, Download, Trash2, CheckCircle2, Wand2, FileSearch, ArrowLeftRight, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';
import { RelatedContent } from '../components/RelatedContent';

const ESCAPE_SEO_MAP: Record<string, { title: string; description: string; keywords: string; h1: string; subtitle: string; intro: string; faqs: { q: string; a: string }[] }> = {
  '/tools/json/escape': {
    title: 'JSON Escape Online - Escapar Caracteres Especiales | Stoolzen',
    description: 'Convierte tu JSON a una cadena de texto escapada segura para strings en código fuente. Herramienta gratuita y rápida.',
    keywords: 'json escape online, escapar json, json stringify online, convert json to string, dev tools',
    h1: 'JSON Escape',
    subtitle: 'Escapa caracteres especiales de tu JSON para usarlo en cadenas de texto.',
    intro: 'Nuestra herramienta de JSON Escape permite convertir un objeto JSON estructurado en una cadena de texto escapada. Esto es esencial cuando necesitas incluir un fragmento de JSON dentro de otro JSON, o como una variable de cadena en lenguajes como C#, Java o JavaScript.',
    faqs: [
      { q: "¿Qué caracteres se escapan?", a: "Se escapan las comillas dobles (\"), las barras invertidas (\\) y los caracteres de control como saltos de línea (\\n) y retornos de carro (\\r)." },
      { q: "¿Por qué necesito escapar el JSON?", a: "Para que el motor de parsing de un lenguaje no confunda las comillas del JSON interior con las del string que lo contiene." }
    ]
  },
  '/tools/json/unescape': {
    title: 'JSON Unescape Online - Desescapar Cadenas JSON | Stoolzen',
    description: 'Desescapa cadenas JSON y conviértelas de nuevo a formato legible. Recupera la estructura original de tus datos JSON escapados.',
    keywords: 'json unescape online, desescapar json, json raw string conversion, dev tools',
    h1: 'JSON Unescape',
    subtitle: 'Convierte cadenas JSON escapadas de nuevo a su formato original legible.',
    intro: 'Si tienes una cadena de texto que contiene un JSON escapado (con muchas barras invertidas), esta herramienta te permite limpiarla y recuperar el objeto JSON original formateado.',
    faqs: [
      { q: "¿Puede fallar el proceso de desescapado?", a: "Si la cadena no es un JSON válido después de desescapar las barras, el proceso podría no mostrar un resultado válido. Asegúrate de copiar la cadena completa." }
    ]
  }
};

const FALLBACK_SEO = {
  title: 'JSON Escape & Unescape Online | Stoolzen',
  description: 'Escapa y desescapa cadenas JSON de forma segura.',
  keywords: 'json escape, json unescape, developer tools',
  h1: 'JSON Escape/Unescape',
  subtitle: 'Manipula el escapado de caracteres en tus datos JSON.',
  intro: 'Una utilidad rápida para convertir entre JSON crudo y cadenas escapadas.',
  faqs: []
};

export const JSONEscape: React.FC = () => {
  const [input, setInput] = useState('{\n  "message": "Hello World",\n  "status": 200\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = ESCAPE_SEO_MAP[pathname] ?? FALLBACK_SEO;

  const handleProcess = () => {
    try {
      if (pathname.includes('escape')) {
        // Escape: JSON Object -> Escaped String
        // First try to parse it to make sure it's valid JSON
        const parsed = JSON.parse(input);
        const escaped = JSON.stringify(JSON.stringify(parsed));
        // Remove the outer quotes added by the double stringify
        setOutput(escaped.substring(1, escaped.length - 1));
        setStatusMessage({ title: 'JSON Escapado', detail: 'Caracteres especiales convertidos con éxito.' });
      } else {
        // Unescape: Escaped String -> JSON Object
        // We use a trick: wrap in quotes and parse
        const unescaped = JSON.parse(`"${input}"`);
        try {
          const formatted = JSON.stringify(JSON.parse(unescaped), null, 2);
          setOutput(formatted);
        } catch (e) {
          setOutput(unescaped);
        }
        setStatusMessage({ title: 'JSON Desescapado', detail: 'Estructura original recuperada.' });
      }
      setError(null);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError('Error en el proceso. Verifica que la entrada sea válida para esta operación.');
      setOutput('');
    }
  };

  useEffect(() => {
    handleProcess();
  }, [input, pathname]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setStatusMessage({ title: 'Copiado al portapapeles', detail: 'Resultado listo para usar.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="h-full flex flex-col space-y-6 pb-20">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
          { name: 'JSON', item: '/tools/json' },
          { name: seo.h1, item: pathname }
        ]}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-4 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">{seo.h1}</h1>
          <p className="text-outline">{seo.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[650px] pb-8">
        {/* Input Panel */}
        <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Input</span>
            <button onClick={handleClear} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Clear">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="text"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={input}
              onChange={(v) => setInput(v || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'JetBrains Mono',
                automaticLayout: true,
                wordWrap: 'on',
                padding: { top: 20 }
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm relative">
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Output</span>
            <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Copy">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="text"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={output}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'JetBrains Mono',
                automaticLayout: true,
                wordWrap: 'on',
                padding: { top: 20 }
              }}
            />
            {error && (
              <div className="absolute inset-0 bg-red-50/50 backdrop-blur-[1px] flex items-center justify-center p-6 text-center">
                <div className="bg-white border border-red-200 rounded-xl p-4 shadow-lg text-red-600 flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5" />
                  <span className="text-sm font-bold">{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-10 pt-8 border-t border-outline-variant space-y-12">
        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <Braces className="w-6 h-6 text-indigo-500" />
            Sobre {seo.h1}
          </h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              El <strong>escapado de caracteres JSON</strong> es el proceso de convertir caracteres reservados (como comillas dobles, barras diagonales o caracteres de control) en secuencias seguras que puedan ser transmitidas dentro de un string JSON sin romper la estructura del objeto. 
              Esto es vital cuando necesitas enviar código HTML, rutas de archivos de Windows o bloques de texto con saltos de línea a través de una API.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">¿Por qué es necesario escapar el JSON?</h3>
            <p>
              En JSON, ciertos caracteres tienen significados especiales. Por ejemplo, una comilla doble (<code>"</code>) indica el inicio o fin de un campo. Si tu texto contiene una comilla, el parser de JSON fallará a menos que la escapes como <code>\"</code>.
            </p>
          </div>
        </section>

        {/* Examples Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface">Ejemplo de Escapado vs Unescaped</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-outline font-bold">Texto Plano (Unescaped)</span>
              <pre className="bg-surface-container p-4 rounded-xl text-xs font-mono border border-outline-variant overflow-x-auto text-on-surface">
{`Hello "Stoolzen"
Line 1
Line 2`}
              </pre>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-outline font-bold">JSON Escaped</span>
              <pre className="bg-surface-container p-4 rounded-xl text-xs font-mono border border-outline-variant overflow-x-auto text-indigo-600">
{`Hello \\"Stoolzen\\"\\nLine 1\\nLine 2`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-xl font-bold text-on-surface">Casos de Uso Comunes</h3>
           <ul className="list-disc pl-5 text-outline space-y-2">
              <li><strong>Integración con Bases de Datos:</strong> Preparar strings para ser guardados en campos tipo JSON o TEXT.</li>
              <li><strong>Desarrollo de APIs:</strong> Enviar fragmentos de código o HTML dentro de una respuesta JSON.</li>
              <li><strong>Configuraciones:</strong> Escapar rutas de sistema en archivos <code>.json</code> (ej: <code>C:\\Users\\Path</code>).</li>
           </ul>
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
        
        <RelatedContent 
          category="json"
          currentPath={pathname}
          relatedTools={[
            { name: 'JSON Formatter', path: '/tools/json/formatter', desc: 'Embellece y ordena tus objetos JSON' },
            { name: 'JSON Validator', path: '/tools/json/validator', desc: 'Valida sintaxis y encuentra errores' },
            { name: 'JSON Diff', path: '/tools/json/diff', desc: 'Compara versiones de archivos JSON' },
            { name: 'JSONPath Explorer', path: '/tools/json/path-explorer', desc: 'Ejecuta consultas sobre datos JSON' },
            { name: 'JSON Minifier', path: '/tools/json/minify', desc: 'Reduce el tamaño de tus archivos' },
          ]}
          categories={[
            { name: 'Categoría JSON', path: '/tools/json' },
            { name: 'Herramientas de Texto', path: '/tools/text' }
          ]}
          guides={[
            { name: 'Guía de escapado de caracteres', path: '/docs/escape-characters-guide' },
            { name: 'Mejores prácticas para strings JSON', path: '/docs/json-strings-best-practices' }
          ]}
        />
      </div>

      {/* Success Toast */}
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
