import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileCode, Copy, Wand2, Trash2, CheckCircle2, AlertCircle, Maximize2, Minimize2, Type, FoldVertical, UnfoldVertical, Upload, Download, Minimize, Database, Printer, History, Share2, X } from 'lucide-react';
import { formatGraphQL, minifyGraphQL } from '../utils/toolUtils';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';

const GRAPHQL_SEO_MAP: Record<string, { 
  title: string; 
  description: string; 
  keywords: string; 
  h1: string; 
  subtitle: string;
  intro: string;
  example?: { input: string; output: string };
  faqs: { q: string; a: string }[];
}> = {
  '/tools/graphql/formatter': {
    title: 'Formateador GraphQL Online - Validar y Embellecer Consultas | Stoolzen',
    description: 'Formatea y valida tus consultas GraphQL online. Mejora la legibilidad de tus schemas y queries con nuestra herramienta gratuita.',
    keywords: 'formateador graphql, graphql beautifier, validar graphql, queries graphql, esquemas graphql, dev tools',
    h1: 'Formateador GraphQL Online',
    subtitle: 'Limpia y valida tus consultas y esquemas GraphQL al instante.',
    intro: 'Un formateador GraphQL es esencial para mantener el orden en proyectos de gran escala. Esta herramienta no solo indenta tu código, sino que verifica que la estructura de campos, argumentos y fragmentos cumpla con la especificación oficial.',
    example: {
      input: '{user(id:1){id name email posts{title}}}',
      output: 'query {\n  user(id: 1) {\n    id\n    name\n    email\n    posts {\n      title\n    }\n  }\n}'
    },
    faqs: [
      { q: "¿Por qué usar un formateador GraphQL?", a: "Para asegurar que las consultas sean legibles en revisiones de código y commits de Git, facilitando la detección de errores lógicos." },
      { q: "¿Valida sintaxis en tiempo real?", a: "Sí, el editor marcará con rojo cualquier error estructural mientras escribes." }
    ]
  },
  '/tools/graphql/validator': {
    title: 'Validador GraphQL Online Gratis - Verifica Queries y Schemas | Stoolzen',
    description: 'Valida tus queries y schemas GraphQL online de forma gratuita. Detecta errores de sintaxis en tus consultas GraphQL al instante.',
    keywords: 'validador graphql, graphql validator online, verificar graphql, graphql syntax checker, graphql lint',
    h1: 'Validador GraphQL Online',
    subtitle: 'Comprueba si tus queries y schemas GraphQL son válidos al instante.',
    intro: 'El validador de GraphQL de Stoolzen analiza profundamente la estructura de tus consultas para encontrar errores que a menudo pasan desapercibidos en editores de texto simples.',
    faqs: [
      { q: "¿Soporta la sintaxis SDL?", a: "Sí, puedes validar tanto consultas de cliente como definiciones de esquema (Schema Definition Language)." }
    ]
  },
  '/tools/graphql/minifier': {
    title: 'GraphQL Minifier Online - Comprimir y Minificar Queries | Stoolzen',
    description: 'Minifica y comprime tus queries GraphQL online al instante. Reduce el tamaño de tus consultas para optimizar el rendimiento de tus APIs.',
    keywords: 'graphql minifier, minificar graphql, comprimir graphql, graphql compress online, graphql minify',
    h1: 'GraphQL Minifier Online',
    subtitle: 'Comprime y minifica tus queries GraphQL para reducir su tamaño.',
    intro: 'La minificación de GraphQL elimina espacios en blanco y comentarios innecesarios, lo cual es crítico para reducir el payload de las peticiones POST en aplicaciones de alto rendimiento.',
    example: {
      input: 'query GetUser {\n  user {\n    id\n    name\n  }\n}',
      output: 'query GetUser{user{id name}}'
    },
    faqs: [
      { q: "¿Afecta la minificación al funcionamiento de la API?", a: "No, GraphQL ignora los espacios en blanco insignificantes, por lo que el servidor procesará la query exactamente igual." }
    ]
  }
};

// Fallback SEO for other GraphQL routes
const FALLBACK_GRAPHQL_SEO: {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  intro: string;
  example?: { input: string; output: string };
  faqs: { q: string; a: string }[];
} = {
  title: 'Herramientas GraphQL Online - Stoolzen',
  description: 'Suite completa de herramientas para trabajar con GraphQL.',
  keywords: 'graphql, devtools, formatter, validator',
  h1: 'Herramientas GraphQL',
  subtitle: 'Gestiona tus queries y schemas de forma eficiente.',
  intro: 'Explora nuestra colección de utilidades diseñadas para simplificar el desarrollo con GraphQL.',
  faqs: []
};

export const GraphQLFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const [fontSize, setFontSize] = useState<number>(14);
  const [maximized, setMaximized] = useState<'input' | 'output' | null>(null);
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('graphql_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = GRAPHQL_SEO_MAP[pathname] ?? FALLBACK_GRAPHQL_SEO;
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const btnClass = "px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95 shadow-sm font-sans";
  const btnPrimary = cn(btnClass, "bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent");
  const btnSecondary = cn(btnClass, "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200");
  const btnDanger = cn(btnClass, "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100");
  const btnGhost = "p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-md";

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      try {
        const decoded = decodeURIComponent(atob(data));
        setInput(decoded);
      } catch (e) {
        console.error('Invalid share link');
      }
    }
  }, []);

  // Auto-format on input change (debounced)
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const timer = setTimeout(() => {
      try {
        const formatted = formatGraphQL(input);
        setOutput(formatted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid GraphQL');
        setOutput('');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [input]);

  const saveToHistory = (newInput: string) => {
    if (!newInput.trim()) return;
    setHistory(prev => {
      const updated = [newInput, ...prev.filter(i => i !== newInput)].slice(0, 10);
      localStorage.setItem('graphql_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
      setStatusMessage({ title: 'File Uploaded', detail: `${file.name} has been loaded.` });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const loadDemoData = () => {
    const demo = `query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    name\n    email\n    posts {\n      title\n      comments {\n        text\n      }\n    }\n  }\n}`;
    setInput(demo);
    setStatusMessage({ title: 'Demo Data Loaded', detail: 'Sample GraphQL query has been loaded.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleFoldAll = () => {
    editorRef.current?.trigger('fold', 'editor.foldAll');
  };

  const handleUnfoldAll = () => {
    editorRef.current?.trigger('unfold', 'editor.unfoldAll');
  };

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const formatted = formatGraphQL(input);
      setOutput(formatted);
      setError(null);
      saveToHistory(input);
      setStatusMessage({ title: 'Formatting Successful', detail: 'GraphQL code has been beautified and validated.' });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid GraphQL');
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setStatusMessage({ title: 'Copied to clipboard', detail: 'The formatted GraphQL is ready to paste.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/graphql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.graphql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ title: 'File Downloaded', detail: 'The output has been saved as formatted.graphql.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const minified = minifyGraphQL(input);
      setOutput(minified);
      setError(null);
      setStatusMessage({ title: 'Minification Successful', detail: 'GraphQL code has been minified.' });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid GraphQL');
      setOutput('');
    }
  };

  const handlePrint = () => {
    if (!output) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print GraphQL</title>
          <style>
            body { font-family: monospace; white-space: pre-wrap; padding: 20px; font-size: 14px; }
          </style>
        </head>
        <body>${output}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleShare = () => {
    if (!input) return;
    try {
      const encoded = btoa(encodeURIComponent(input));
      const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
      navigator.clipboard.writeText(url);
      setStatusMessage({ title: 'Link Copied', detail: 'Shareable link copied to clipboard.' });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  const toggleMaximize = (target: 'input' | 'output') => {
    if (maximized === target) setMaximized(null);
    else setMaximized(target);
  };

  return (
    <div className="h-full flex flex-col space-y-4 relative">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
          { name: 'GraphQL', item: '/tools/graphql' },
          { name: seo.h1, item: pathname }
        ]}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-3 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">{seo.h1}</h1>
          <p className="text-outline">{seo.subtitle}</p>
        </div>
      </div>

      <div className={cn(
        "flex-1 min-h-[650px] grid grid-cols-1 lg:grid-cols-2 gap-4 pb-8",
        maximized && "hidden"
      )}>
        <div className="flex flex-col bg-surface-container border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">Query Input</span>
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded ml-2 shadow-sm hidden sm:flex">
                <Type className="w-3 h-3 text-slate-400" />
                <input 
                  type="number" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Math.max(10, Math.min(30, parseInt(e.target.value) || 14)))}
                  className="w-8 bg-transparent text-xs font-bold text-slate-600 focus:outline-none"
                  title="Font Size"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".graphql,.gql,.txt" className="hidden" />
              <button 
                onClick={loadDemoData}
                className={cn(btnSecondary, "text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100")}
                title="Load Sample Data"
              >
                <Database className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={btnSecondary}
                title="Upload GraphQL File"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setShowHistory(true)}
                className={btnSecondary}
                title="View History"
              >
                <History className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleShare}
                className={btnSecondary}
                title="Share GraphQL"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setInput('')}
                className={btnDanger}
                title="Clear Input"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => toggleMaximize('input')}
                className={btnGhost}
                title="Maximize"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-white relative">
            <Editor
              height="100%"
              defaultLanguage="graphql"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={input}
              onChange={(value) => setInput(value || '')}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                fontFamily: 'JetBrains Mono',
                automaticLayout: true,
                padding: { top: 16 },
                bracketPairColorization: { enabled: true }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col bg-surface-container border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-slate-400 hidden sm:block" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600 hidden xl:block">Prettified Output</span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleMinify}
                  className={btnSecondary}
                  title="Minify GraphQL"
                >
                  <Minimize className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleFormat}
                  className={btnPrimary}
                  title="Prettify GraphQL"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrint}
                className={btnSecondary}
                title="Print Output"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleDownload}
                className={btnSecondary}
                title="Download GraphQL"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleCopy}
                className={btnSecondary}
                title="Copy to Clipboard"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => toggleMaximize('output')}
                className={btnGhost}
                title="Maximize"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-white relative">
            <Editor
              height="100%"
              defaultLanguage="graphql"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={output}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: 'on',
                readOnly: true,
                fontFamily: 'JetBrains Mono',
                automaticLayout: true,
                padding: { top: 16 },
                bracketPairColorization: { enabled: true }
              }}
            />
            
            {error && (
              <div className="absolute inset-0 bg-red-50/50 backdrop-blur-[1px] flex flex-col items-center justify-center p-8 animate-fade-in">
                <div className="bg-white border border-red-200 rounded-xl p-6 shadow-xl max-w-md w-full">
                   <div className="flex items-center gap-3 text-red-600 mb-3">
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-bold text-lg">Syntax Error Detected</span>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-600 font-mono leading-relaxed whitespace-pre-wrap">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational & SEO Content Section */}
      <div className={cn("mt-10 pt-8 border-t border-outline-variant pb-20 space-y-14", maximized && "hidden")}>
        {/* Intro Section */}
        <section className="max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-on-surface">Sobre {seo.h1}</h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              <strong>GraphQL</strong> es un lenguaje de consulta para APIs y un tiempo de ejecución para cumplir con esas consultas utilizando tus datos existentes. A diferencia de REST, GraphQL permite a los clientes solicitar exactamente los datos que necesitan, nada más y nada menos.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">¿Por qué formatear tus consultas GraphQL?</h3>
            <p>
              Las consultas GraphQL pueden volverse extremadamente complejas y profundas a medida que tu aplicación crece. Un <strong>formateador de GraphQL</strong> ayuda a los desarrolladores a:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Mejorar la legibilidad:</strong> Indentación clara de campos, argumentos y directivas.</li>
              <li><strong>Detectar errores:</strong> Validación instantánea contra la sintaxis estándar de GraphQL.</li>
              <li><strong>Estandarización:</strong> Mantener un estilo de código consistente en todo el equipo de desarrollo.</li>
            </ul>
          </div>
        </section>

        {/* Input/Output Example */}
        {seo.example && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-on-surface">Ejemplo de Uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-bold text-outline uppercase tracking-wider">Entrada (Crudo)</p>
                <div className="bg-surface-container rounded-xl p-4 border border-outline-variant font-mono text-sm text-on-surface overflow-x-auto">
                  {seo.example.input}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-bold text-outline uppercase tracking-wider">Salida (Procesado)</p>
                <div className="bg-indigo-50/30 rounded-xl p-4 border border-indigo-100 font-mono text-sm text-indigo-900 overflow-x-auto whitespace-pre">
                  {seo.example.output}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-on-surface text-center">Por qué usar Stoolzen para GraphQL</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Prettify Inteligente</h3>
              <p className="text-outline leading-relaxed">Organiza tus queries respetando la estructura de fragmentos y argumentos automáticamente.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Minimize className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Minificación Real</h3>
              <p className="text-outline leading-relaxed">Comprime tus consultas para producción eliminando espacios y comentarios innecesarios.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Validación SDL</h3>
              <p className="text-outline leading-relaxed">Soporte total para la especificación oficial de GraphQL, incluyendo Schema Definition Language.</p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        {seo.faqs.length > 0 && (
          <section className="bg-surface-container-low rounded-[2rem] p-10 md:p-16 border border-outline-variant">
            <h2 className="text-3xl font-bold text-on-surface mb-12 text-center">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {seo.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-bold text-on-surface flex gap-3">
                    <span className="text-indigo-500">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-outline leading-relaxed pl-8 border-l-2 border-indigo-100">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools Grid */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-on-surface text-center">Otras Herramientas GraphQL</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'GraphQL Validator', path: '/tools/graphql/validator', desc: 'Valida sintaxis al instante' },
              { name: 'GraphQL Minifier', path: '/tools/graphql/minifier', desc: 'Comprime para producción' },
              { name: 'GraphQL Editor', path: '/tools/graphql/editor', desc: 'Editor profesional online' },
              { name: 'GraphQL Beautifier', path: '/tools/graphql/beautifier', desc: 'Embellece tus queries' }
            ].filter(t => t.path !== pathname).map(tool => (
              <a key={tool.path} href={tool.path} className="p-6 rounded-2xl bg-surface-container border border-outline-variant hover:border-indigo-500 transition-all group">
                <p className="font-bold text-on-surface group-hover:text-indigo-600 transition-colors">{tool.name}</p>
                <p className="text-xs text-outline mt-1">{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Maximized View Overlay */}
      <AnimatePresence>
        {maximized && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-4 md:inset-8 z-[60] bg-surface-bright border border-outline-variant rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-outline-variant bg-surface-container-low flex-wrap gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <FileCode className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-slate-900 capitalize tracking-tight">{maximized} GraphQL Editor</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Maximized Mode</span>
                <div className="h-5 w-px bg-slate-200 mx-1" />
                {/* Input tools */}
                {maximized === 'input' && (
                  <>
                    <button onClick={loadDemoData} className={cn(btnSecondary, "text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100")} title="Load Sample Data">
                      <Database className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className={btnSecondary} title="Upload GraphQL File">
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => { setMaximized(null); setShowHistory(true); }} className={btnSecondary} title="View History">
                      <History className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleShare} className={btnSecondary} title="Share GraphQL">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setInput('')} className={btnDanger} title="Clear Input">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
                {/* Output tools */}
                {maximized === 'output' && (
                  <>
                    <button onClick={handleMinify} className={btnSecondary} title="Minify GraphQL">
                      <Minimize className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleFormat} className={btnPrimary} title="Prettify GraphQL">
                      <Wand2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handlePrint} className={btnSecondary} title="Print Output">
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleDownload} className={btnSecondary} title="Download GraphQL">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleCopy} className={btnSecondary} title="Copy to Clipboard">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                  <Type className="w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="number" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Math.max(10, Math.min(30, parseInt(e.target.value) || 14)))}
                    className="w-10 bg-transparent text-xs font-bold focus:outline-none"
                    title="Font Size"
                  />
                </div>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <button 
                  onClick={handleFoldAll}
                  className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Fold All"
                >
                  <FoldVertical className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleUnfoldAll}
                  className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Unfold All"
                >
                  <UnfoldVertical className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <button 
                  onClick={() => setMaximized(null)}
                  className="p-2 bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-full transition-all"
                  title="Minimize"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white">
              <Editor
                height="100%"
                defaultLanguage="graphql"
                theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                value={maximized === 'input' ? input : output}
                onChange={(value) => maximized === 'input' && setInput(value || '')}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: true },
                  fontSize: fontSize + 2,
                  lineNumbers: 'on',
                  readOnly: maximized === 'output',
                  fontFamily: 'JetBrains Mono',
                  automaticLayout: true,
                  padding: { top: 24, bottom: 24 },
                  bracketPairColorization: { enabled: true }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className={cn("w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[80vh]", theme === 'dark' ? 'bg-[#1e1e1e] border border-outline-variant text-on-surface' : 'bg-white text-slate-800')}>
            <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'var(--color-outline-variant)' }}>
              <h3 className="font-bold text-lg flex items-center gap-2"><History className="w-5 h-5 text-indigo-500" /> Input History</h3>
              <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-4 flex flex-col gap-3">
              {history.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No history saved yet.</p>
              ) : (
                history.map((h, i) => (
                  <div key={i} className={cn("flex flex-col gap-2 p-3 border rounded-lg cursor-pointer transition-colors", theme === 'dark' ? 'hover:bg-surface-variant border-outline-variant' : 'hover:bg-slate-50 border-slate-200')} onClick={() => { setInput(h); setShowHistory(false); }}>
                    <pre className="text-xs text-slate-500 truncate font-mono">{h.substring(0, 150)}</pre>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
