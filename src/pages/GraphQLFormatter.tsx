import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileCode, Copy, Wand2, Trash2, CheckCircle2, AlertCircle, Maximize2, Minimize2, Type, FoldVertical, UnfoldVertical, Upload, Download, Minimize, Database, Printer, History, Share2, X } from 'lucide-react';
import { formatGraphQL, minifyGraphQL } from '../utils/toolUtils';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const GRAPHQL_SEO_MAP: Record<string, { title: string; description: string; keywords: string; h1: string; subtitle: string }> = {
  '/graphql': {
    title: 'Formateador GraphQL Online - Validar y Embellecer Consultas | DevUtils',
    description: 'Formatea y valida tus consultas GraphQL online. Mejora la legibilidad de tus schemas y queries con nuestra herramienta gratuita.',
    keywords: 'formateador graphql, graphql beautifier, validar graphql, queries graphql, esquemas graphql, dev tools',
    h1: 'Formateador GraphQL',
    subtitle: 'Limpia y valida tus consultas y esquemas GraphQL al instante.',
  },
  '/graphql-validator': {
    title: 'Validador GraphQL Online Gratis - Verifica Queries y Schemas | DevUtils',
    description: 'Valida tus queries y schemas GraphQL online de forma gratuita. Detecta errores de sintaxis en tus consultas GraphQL al instante.',
    keywords: 'validador graphql, graphql validator online, verificar graphql, graphql syntax checker, graphql lint',
    h1: 'Validador GraphQL Online',
    subtitle: 'Comprueba si tus queries y schemas GraphQL son válidos al instante.',
  },
  '/graphql-editor': {
    title: 'Editor GraphQL Online con Resaltado de Sintaxis | DevUtils',
    description: 'Editor GraphQL online con resaltado de sintaxis y validación en tiempo real. La herramienta definitiva para editar queries y schemas GraphQL.',
    keywords: 'editor graphql online, graphql editor, editar graphql, graphql syntax highlight, graphql ide online',
    h1: 'Editor GraphQL Online',
    subtitle: 'Edita tus queries GraphQL con resaltado de sintaxis y validación en tiempo real.',
  },
  '/graphql-beautifier': {
    title: 'GraphQL Beautifier Online - Embellecer y Formatear Queries | DevUtils',
    description: 'Embellece y formatea tus queries GraphQL online con un solo clic. Convierte GraphQL comprimido en código legible y bien indentado.',
    keywords: 'graphql beautifier, embellecer graphql, graphql formatter online, graphql pretty print, formatear graphql',
    h1: 'GraphQL Beautifier Online',
    subtitle: 'Embellece y formatea tus queries GraphQL para hacerlos más legibles.',
  },
  '/graphql-minifier': {
    title: 'GraphQL Minifier Online - Comprimir y Minificar Queries | DevUtils',
    description: 'Minifica y comprime tus queries GraphQL online al instante. Reduce el tamaño de tus consultas para optimizar el rendimiento de tus APIs.',
    keywords: 'graphql minifier, minificar graphql, comprimir graphql, graphql compress online, graphql minify',
    h1: 'GraphQL Minifier Online',
    subtitle: 'Comprime y minifica tus queries GraphQL para reducir su tamaño.',
  },
  '/graphql-viewer': {
    title: 'Visor GraphQL Online - Explorar y Visualizar Queries | DevUtils',
    description: 'Visualiza y explora tus queries y schemas GraphQL online. Herramienta gratuita para navegar por estructuras GraphQL complejas.',
    keywords: 'visor graphql, graphql viewer online, explorar graphql, visualizar graphql, graphql schema browser',
    h1: 'Visor GraphQL Online',
    subtitle: 'Explora y visualiza tus queries y schemas GraphQL de forma clara.',
  },
  '/graphql-checker': {
    title: 'GraphQL Checker Online - Comprobar Errores en Queries | DevUtils',
    description: 'Comprueba y analiza tus queries GraphQL online. Detecta errores y problemas de sintaxis en tus consultas y schemas GraphQL.',
    keywords: 'graphql checker, comprobar graphql, graphql error checker, graphql analyzer, graphql linter online',
    h1: 'GraphQL Checker Online',
    subtitle: 'Comprueba y analiza tus queries GraphQL para detectar errores al instante.',
  },
  '/graphql-parser': {
    title: 'GraphQL Parser Online - Parsear y Analizar Queries | DevUtils',
    description: 'Parsea y analiza tus queries GraphQL online. Convierte tus consultas GraphQL en estructuras de datos legibles al instante.',
    keywords: 'graphql parser, parsear graphql, analizar graphql, graphql parse online, graphql ast viewer',
    h1: 'GraphQL Parser Online',
    subtitle: 'Parsea y analiza la estructura de tus queries y schemas GraphQL.',
  },
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
  const seo = GRAPHQL_SEO_MAP[pathname] ?? GRAPHQL_SEO_MAP['/graphql'];
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
          { name: 'GraphQL Tools', item: '/graphql' },
          { name: seo.h1, item: pathname }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": seo.h1,
          "url": `https://stoolzen.com${pathname}`,
          "description": seo.description,
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any"
        }}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-3 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">{seo.h1}</h1>
          <p className="text-outline">{seo.subtitle}</p>
        </div>
      </div>

      <div className={cn(
        "flex-1 min-h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-4 pb-20",
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
                <span className="hidden sm:inline">Demo</span>
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={btnSecondary}
                title="Upload GraphQL File"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Upload</span>
              </button>
              <button 
                onClick={() => setShowHistory(true)}
                className={btnSecondary}
                title="View History"
              >
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">History</span>
              </button>
              <button 
                onClick={handleShare}
                className={btnSecondary}
                title="Share GraphQL"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button 
                onClick={() => setInput('')}
                className={btnDanger}
                title="Clear Input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
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
                  Minify
                </button>
                <button 
                  onClick={handleFormat}
                  className={btnPrimary}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  Prettify
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
                <span className="hidden sm:inline">Print</span>
              </button>
              <button 
                onClick={handleDownload}
                className={btnSecondary}
                title="Download GraphQL"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button 
                onClick={handleCopy}
                className={btnSecondary}
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
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
      <div className={cn("mt-16 pt-12 border-t border-outline-variant pb-20 space-y-12", maximized && "hidden")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <FileCode className="w-6 h-6 text-pink-500" />
              ¿Qué es un Formateador GraphQL?
            </h2>
            <p className="text-outline leading-relaxed">
              Un <strong>formateador GraphQL</strong> es una herramienta especializada que organiza y embellece consultas (queries) y esquemas de GraphQL. A diferencia del JSON tradicional, GraphQL tiene su propia sintaxis basada en tipos y campos que puede volverse difícil de manejar sin la indentación correcta.
            </p>
            <p className="text-outline leading-relaxed">
              Nuestra herramienta actúa como un <strong>entorno de desarrollo ligero</strong> que valida tu sintaxis mientras escribes, asegurando que tus operaciones GraphQL cumplan con los estándares antes de enviarlas a tu servidor de API.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-indigo-500" />
              Funciones Avanzadas de Stoolzen
            </h2>
            <ul className="space-y-3 text-outline">
              <li className="flex gap-3">
                <span className="font-bold text-pink-500">1.</span>
                <span><strong>Prettify Inteligente:</strong> Formatea tus queries respetando la estructura de fragmentos y argumentos.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-500">2.</span>
                <span><strong>Minificación de Queries:</strong> Reduce el tamaño de tus peticiones HTTP comprimiendo tu GraphQL a una sola línea.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-500">3.</span>
                <span><strong>Compatibilidad Total:</strong> Soporta Queries, Mutations, Subscriptions y definiciones de Schema (SDL).</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant">
          <h2 className="text-xl font-bold text-on-surface mb-6">Preguntas Frecuentes sobre GraphQL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Puedo validar esquemas SDL completos?</h3>
              <p className="text-sm text-outline">Sí, el editor soporta tanto consultas de cliente como definiciones de esquema del lado del servidor (SDL).</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Cómo comparto una consulta con mi equipo?</h3>
              <p className="text-sm text-outline">Usa el botón <strong>"Share"</strong> para generar una URL que contenga tu código codificado. Solo tienes que copiar y enviar el enlace.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Stoolzen guarda mis consultas?</h3>
              <p className="text-sm text-outline">No guardamos nada en el servidor. Tus datos se mantienen en el historial local de tu navegador para tu comodidad y privacidad.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Es compatible con Relay y Apollo?</h3>
              <p className="text-sm text-outline">Absolutamente. Nuestra validación sigue la especificación oficial de GraphQL compatible con todos los clientes populares.</p>
            </div>
          </div>
        </div>
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
                      <span className="hidden sm:inline">Demo</span>
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className={btnSecondary} title="Upload GraphQL File">
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                    <button onClick={() => { setMaximized(null); setShowHistory(true); }} className={btnSecondary} title="View History">
                      <History className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">History</span>
                    </button>
                    <button onClick={handleShare} className={btnSecondary} title="Share GraphQL">
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    <button onClick={() => setInput('')} className={btnDanger} title="Clear Input">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  </>
                )}
                {/* Output tools */}
                {maximized === 'output' && (
                  <>
                    <button onClick={handleMinify} className={btnSecondary} title="Minify GraphQL">
                      <Minimize className="w-3.5 h-3.5" />
                      Minify
                    </button>
                    <button onClick={handleFormat} className={btnPrimary}>
                      <Wand2 className="w-3.5 h-3.5" />
                      Prettify
                    </button>
                    <button onClick={handlePrint} className={btnSecondary} title="Print Output">
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                    <button onClick={handleDownload} className={btnSecondary} title="Download GraphQL">
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button onClick={handleCopy} className={btnSecondary}>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
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
