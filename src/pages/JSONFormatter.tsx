import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Copy, Wand2, Trash2, CheckCircle2, History, Maximize2, Minimize2, Type, FoldVertical, UnfoldVertical, Upload, Download, Minimize, Database, Printer, Code2, ListTree, Plus, Minus, Share2, X, FileCode } from 'lucide-react';
import { formatJSON, minifyJSON } from '../utils/toolUtils';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const JSON_SEO_MAP: Record<string, { title: string; description: string; keywords: string; h1: string; subtitle: string }> = {
  '/json': {
    title: 'Formateador JSON Online - Embellecer y Validar JSON | DevUtils',
    description: 'El mejor formateador de JSON online. Valida, embellece y minifica tus cadenas JSON al instante. Herramienta gratuita para desarrolladores.',
    keywords: 'formateador json, json beautifier, validar json, beautify json online, depurar json, dev tools',
    h1: 'Formateador JSON',
    subtitle: 'Formatea, valida y embellece tus cadenas JSON de forma segura.',
  },
  '/json-validator': {
    title: 'Validador JSON Online Gratis - Verifica tu JSON al Instante | DevUtils',
    description: 'Valida tu JSON online de forma gratuita. Detecta errores de sintaxis y verifica la estructura de tus datos JSON al instante.',
    keywords: 'validador json, json validator online, verificar json, json syntax checker, json error checker',
    h1: 'Validador JSON Online',
    subtitle: 'Comprueba si tu JSON es válido y detecta errores de sintaxis al instante.',
  },
  '/json-editor': {
    title: 'Editor JSON Online con Resaltado de Sintaxis | DevUtils',
    description: 'Editor JSON online con resaltado de sintaxis, autocompletado y validación en tiempo real. La herramienta definitiva para editar JSON.',
    keywords: 'editor json online, json editor, editar json, json syntax highlight, json online editor',
    h1: 'Editor JSON Online',
    subtitle: 'Edita tu JSON con resaltado de sintaxis y validación en tiempo real.',
  },
  '/json-pretty-print': {
    title: 'JSON Pretty Print Online - Indentar y Embellecer JSON | DevUtils',
    description: 'Aplica pretty print a tu JSON online. Indenta y embellece cualquier cadena JSON comprimida para hacerla legible al instante.',
    keywords: 'json pretty print, json indent online, embellecer json, json beautify, json format online, pretty print json',
    h1: 'JSON Pretty Print',
    subtitle: 'Indenta y embellece cualquier cadena JSON comprimida al instante.',
  },
  '/json-viewer': {
    title: 'Visor JSON Online - Explorar JSON en Vista de Árbol | DevUtils',
    description: 'Visualiza y explora tu JSON online con vista de árbol interactiva. Navega por estructuras JSON complejas fácilmente.',
    keywords: 'visor json, json viewer online, explorar json, json tree view, visualizar json, json browser',
    h1: 'Visor JSON Online',
    subtitle: 'Explora y navega por tus datos JSON con una vista de árbol interactiva.',
  },
  '/json-parser': {
    title: 'JSON Parser Online - Parsear y Analizar JSON | DevUtils',
    description: 'Parsea y analiza tu JSON online. Convierte cadenas JSON en estructuras de datos legibles y válidas al instante.',
    keywords: 'json parser online, parsear json, analizar json, json decode, json parse online, json analyzer',
    h1: 'JSON Parser Online',
    subtitle: 'Parsea y analiza tus cadenas JSON para detectar su estructura al instante.',
  },
  '/json-minifier': {
    title: 'JSON Minifier Online - Comprimir y Minificar JSON | DevUtils',
    description: 'Minifica y comprime tu JSON online al instante. Reduce el tamaño de tus payloads JSON para optimizar el rendimiento de tu API.',
    keywords: 'json minifier, minificar json, comprimir json, json compress online, json minify, reducir json',
    h1: 'JSON Minifier Online',
    subtitle: 'Comprime y minifica tu JSON para reducir su tamaño al máximo.',
  },
  '/json-reader': {
    title: 'JSON Reader Online - Leer y Visualizar JSON | DevUtils',
    description: 'Lee y visualiza ficheros o cadenas JSON online con facilidad. Herramienta gratuita para leer JSON de forma clara y estructurada.',
    keywords: 'json reader, leer json online, json file reader, visualizar json, abrir json online',
    h1: 'JSON Reader Online',
    subtitle: 'Lee y visualiza tus datos JSON de forma clara y estructurada.',
  },
  '/json-stringify': {
    title: 'JSON Stringify Online - Convertir Objetos a Cadenas JSON | DevUtils',
    description: 'Convierte objetos y estructuras de datos a cadenas JSON serializadas online. Equivalente a JSON.stringify con formato personalizable.',
    keywords: 'json stringify online, json serialize, convertir a json string, json serialization, json to string',
    h1: 'JSON Stringify Online',
    subtitle: 'Serializa y convierte estructuras de datos a cadenas JSON al instante.',
  },
  '/json-sorter': {
    title: 'JSON Sorter Online - Ordenar Claves JSON Alfabéticamente | DevUtils',
    description: 'Ordena las claves de tu JSON online de forma alfabética o personalizada. Normaliza la estructura de tus datos JSON al instante.',
    keywords: 'json sorter, ordenar json, json sort keys, json alphabetical order, ordenar claves json',
    h1: 'JSON Sorter Online',
    subtitle: 'Ordena las claves de tu JSON de forma alfabética e instantánea.',
  },
};

export const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const [spacing, setSpacing] = useState<string>('2');
  const [fontSize, setFontSize] = useState<number>(14);
  const [maximized, setMaximized] = useState<'input' | 'output' | null>(null);
  const [outputView, setOutputView] = useState<'text' | 'tree'>('text');
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('json_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = JSON_SEO_MAP[pathname] ?? JSON_SEO_MAP['/json'];
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
        const spacingValue = spacing === 'tab' ? '\t' : parseInt(spacing);
        const formatted = formatJSON(input, spacingValue);
        setOutput(formatted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JSON');
        setOutput('');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [input, spacing]);

  const saveToHistory = (newInput: string) => {
    if (!newInput.trim()) return;
    setHistory(prev => {
      const updated = [newInput, ...prev.filter(i => i !== newInput)].slice(0, 10);
      localStorage.setItem('json_history', JSON.stringify(updated));
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
    const demo = {
      user: { id: 1, name: "Alice", active: true, roles: ["admin", "user"] },
      settings: { theme: "dark", notifications: true },
      data: [ { id: 101, value: "alpha" }, { id: 102, value: "beta" } ]
    };
    setInput(JSON.stringify(demo, null, 2));
    setStatusMessage({ title: 'Demo Data Loaded', detail: 'Sample JSON has been loaded.' });
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
      const spacingValue = spacing === 'tab' ? '\t' : parseInt(spacing);
      const formatted = formatJSON(input, spacingValue);
      setOutput(formatted);
      setError(null);
      saveToHistory(input);
      // Trigger status animation
      setStatusMessage({ title: 'Formatting Successful', detail: 'Payload has been beautified and validated.' });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setStatusMessage({ title: 'Copied to clipboard', detail: 'The formatted JSON is ready to paste.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ title: 'File Downloaded', detail: 'The output has been saved as formatted.json.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const minified = minifyJSON(input);
      setOutput(minified);
      setError(null);
      setStatusMessage({ title: 'Minification Successful', detail: 'Payload has been minified.' });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
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
          <title>Print JSON</title>
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
          { name: 'JSON Tools', item: '/json' },
          { name: seo.h1, item: pathname }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": seo.h1,
            "url": `https://stoolzen.com${pathname}`,
            "description": seo.description,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cómo puedo convertir JSON a una sola línea?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Utiliza el botón 'Minify' en el panel de salida. Esto eliminará todos los espacios en blanco y saltos de línea innecesarios."
                }
              },
              {
                "@type": "Question",
                "name": "¿El validador detecta errores de sintaxis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, nuestro motor de validación resalta la línea exacta donde se encuentra el error para que puedas corregirlo al instante."
                }
              },
              {
                "@type": "Question",
                "name": "¿Puedo descargar el resultado?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutamente. Haz clic en el icono de descarga (flecha hacia abajo) para guardar tu JSON formateado como un archivo .json."
                }
              },
              {
                "@type": "Question",
                "name": "¿Es gratis este servicio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stoolzen es una herramienta 100% gratuita para desarrolladores. También ofrecemos una versión Premium sin anuncios para usuarios avanzados."
                }
              }
            ]
          }
        ]}
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
        {/* Input Area */}
        <div className="flex flex-col bg-surface-container border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">Input</span>
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
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".json,application/json" className="hidden" />
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
                title="Upload JSON File"
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
                title="Share JSON"
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
              defaultLanguage="json"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={input}
              onChange={(value) => setInput(value || '')}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                fontFamily: 'JetBrains Mono',
                automaticLayout: true,
                padding: { top: 16 },
                renderIndentGuides: true,
                bracketPairColorization: { enabled: true }
              }}
            />
          </div>
        </div>

        {/* Output Area */}
        <div className="flex flex-col bg-surface-container border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400 hidden sm:block" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600 hidden xl:block">Output</span>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-200 mr-1">
                  <button 
                    onClick={() => setOutputView('text')}
                    className={cn(
                      "p-1 rounded flex items-center justify-center transition-all",
                      outputView === 'text' ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"
                    )}
                    title="Code View"
                  >
                    <Code2 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setOutputView('tree')}
                    className={cn(
                      "p-1 rounded flex items-center justify-center transition-all",
                      outputView === 'tree' ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"
                    )}
                    title="Tree View"
                  >
                    <ListTree className="w-3 h-3" />
                  </button>
                </div>
                <select 
                  value={spacing}
                  onChange={(e) => setSpacing(e.target.value)}
                  className="bg-white border border-slate-200 px-2 py-1.5 rounded-md text-[11px] font-bold text-slate-700 uppercase tracking-wider focus:outline-none shadow-sm"
                >
                  <option value="2">2 Spaces</option>
                  <option value="4">4 Spaces</option>
                  <option value="tab">Tabs</option>
                </select>
                <button 
                  onClick={handleMinify}
                  className={btnSecondary}
                  title="Minify JSON"
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
                title="Download JSON"
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
          <div className="flex-1 bg-white relative overflow-hidden">
            {outputView === 'text' ? (
              <Editor
                height="100%"
                defaultLanguage="json"
                theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                value={output}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: true,
                  fontFamily: 'JetBrains Mono',
                  automaticLayout: true,
                  padding: { top: 16 },
                  renderIndentGuides: true,
                  bracketPairColorization: { enabled: true }
                }}
              />
            ) : (
              <div className={cn("h-full overflow-auto p-4", theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white')}>
                {output ? (
                  <JsonView 
                    value={JSON.parse(output)} 
                    style={{ ...(theme === 'dark' ? darkTheme : lightTheme), fontSize: fontSize }} 
                    displayDataTypes={false}
                    displayObjectSize={false}
                    enableClipboard={true}
                    collapsed={false}
                    collapsedIcon={<Plus className="w-3.5 h-3.5 text-indigo-500 hover:bg-indigo-100 rounded-sm cursor-pointer" />}
                    expandedIcon={<Minus className="w-3.5 h-3.5 text-indigo-500 hover:bg-indigo-100 rounded-sm cursor-pointer" />}
                  />
                ) : (
                  <div className="text-slate-400 text-sm flex items-center justify-center h-full font-mono">No data to display</div>
                )}
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 bg-red-50/50 backdrop-blur-[1px] flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-white border border-red-200 rounded-xl p-6 shadow-xl max-w-md">
                  <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                    <History className="w-5 h-5" />
                    <span className="font-bold">Invalid JSON Payload</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-xs text-slate-600 font-mono break-all leading-relaxed">{error}</p>
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
              <FileCode className="w-6 h-6 text-indigo-500" />
              ¿Qué es un Formateador JSON?
            </h2>
            <p className="text-outline leading-relaxed">
              Un <strong>formateador JSON</strong> (o JSON Beautifier) es una herramienta esencial para desarrolladores que convierte archivos JSON comprimidos o mal estructurados en un formato jerárquico fácil de leer. El formato JSON (JavaScript Object Notation) es el estándar de facto para el intercambio de datos en la web moderna.
            </p>
            <p className="text-outline leading-relaxed">
              Nuestra herramienta no solo "embellece" el código, sino que también actúa como un <strong>validador JSON</strong> en tiempo real, detectando errores de sintaxis, comas faltantes o llaves mal cerradas que podrían romper tu aplicación.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              ¿Por qué usar Stoolzen para tus datos?
            </h2>
            <ul className="space-y-3 text-outline">
              <li className="flex gap-3">
                <span className="font-bold text-indigo-500">1.</span>
                <span><strong>Privacidad Total:</strong> Todo el procesamiento ocurre en tu navegador. Tus datos nunca se envían a nuestros servidores.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-indigo-500">2.</span>
                <span><strong>Modo Árbol Interactivo:</strong> Visualiza estructuras complejas y copia sub-nodos con un solo clic.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-indigo-500">3.</span>
                <span><strong>Velocidad Extrema:</strong> Formateo instantáneo incluso con archivos de varios megabytes.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant">
          <h2 className="text-xl font-bold text-on-surface mb-6">Preguntas Frecuentes (FAQ)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Cómo puedo convertir JSON a una sola línea?</h3>
              <p className="text-sm text-outline">Utiliza el botón <strong>"Minify"</strong> en el panel de salida. Esto eliminará todos los espacios en blanco y saltos de línea innecesarios.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿El validador detecta errores de sintaxis?</h3>
              <p className="text-sm text-outline">Sí, nuestro motor de validación resalta la línea exacta donde se encuentra el error para que puedas corregirlo al instante.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Puedo descargar el resultado?</h3>
              <p className="text-sm text-outline">Absolutamente. Haz clic en el icono de descarga (flecha hacia abajo) para guardar tu JSON formateado como un archivo .json.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-on-surface">¿Es gratis este servicio?</h3>
              <p className="text-sm text-outline">Stoolzen es una herramienta 100% gratuita para desarrolladores. También ofrecemos una versión Premium sin anuncios para usuarios avanzados.</p>
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
                {maximized === 'input' ? <Terminal className="w-5 h-5 text-indigo-600" /> : <History className="w-5 h-5 text-indigo-600" />}
                <span className="font-bold text-slate-900 capitalize tracking-tight">{maximized} Editor</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Maximized Mode</span>
                <div className="h-5 w-px bg-slate-200 mx-1" />
                {/* Input tools */}
                {maximized === 'input' && (
                  <>
                    <button onClick={loadDemoData} className={cn(btnSecondary, "text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100")} title="Load Sample Data">
                      <Database className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Demo</span>
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className={btnSecondary} title="Upload JSON File">
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                    <button onClick={() => { setMaximized(null); setShowHistory(true); }} className={btnSecondary} title="View History">
                      <History className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">History</span>
                    </button>
                    <button onClick={handleShare} className={btnSecondary} title="Share JSON">
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
                    <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
                      <button
                        onClick={() => setOutputView('text')}
                        className={cn("p-1 rounded flex items-center justify-center transition-all", outputView === 'text' ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600")}
                        title="Code View"
                      >
                        <Code2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setOutputView('tree')}
                        className={cn("p-1 rounded flex items-center justify-center transition-all", outputView === 'tree' ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600")}
                        title="Tree View"
                      >
                        <ListTree className="w-3 h-3" />
                      </button>
                    </div>
                    <select
                      value={spacing}
                      onChange={(e) => setSpacing(e.target.value)}
                      className="bg-white border border-slate-200 px-2 py-1.5 rounded-md text-[11px] font-bold text-slate-700 uppercase tracking-wider focus:outline-none shadow-sm"
                    >
                      <option value="2">2 Spaces</option>
                      <option value="4">4 Spaces</option>
                      <option value="tab">Tabs</option>
                    </select>
                    <button onClick={handleMinify} className={btnSecondary} title="Minify JSON">
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
                    <button onClick={handleDownload} className={btnSecondary} title="Download JSON">
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
            <div className="flex-1 overflow-hidden" style={{ background: theme === 'dark' ? '#1e1e1e' : '#fff' }}>
              {maximized === 'output' && outputView === 'tree' ? (
                <div className={cn("h-full overflow-auto p-6", theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white')}>
                  {output ? (
                    <JsonView 
                      value={JSON.parse(output)} 
                      style={{ ...(theme === 'dark' ? darkTheme : lightTheme), fontSize: fontSize + 2 }} 
                      displayDataTypes={false}
                      displayObjectSize={false}
                      enableClipboard={({ value }) => navigator.clipboard.writeText(typeof value === 'string' ? value : JSON.stringify(value, null, 2))}
                      collapsed={false}
                      collapsedIcon={<Plus className="w-3.5 h-3.5 text-indigo-500 hover:bg-indigo-100 rounded-sm cursor-pointer" />}
                      expandedIcon={<Minus className="w-3.5 h-3.5 text-indigo-500 hover:bg-indigo-100 rounded-sm cursor-pointer" />}
                    />
                  ) : (
                    <div className="text-slate-400 text-sm flex items-center justify-center h-full font-mono">No data to display</div>
                  )}
                </div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage="json"
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
                    renderIndentGuides: true,
                    bracketPairColorization: { enabled: true }
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
