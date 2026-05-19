import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileCode, Copy, Wand2, Trash2, CheckCircle2, AlertCircle, Maximize2, Minimize2, Type, FoldVertical, UnfoldVertical, Upload, Download, Minimize, Database, Printer, History, Share2, X, BookOpen, HelpCircle, ChevronDown, ChevronUp, Lightbulb, ArrowRight } from 'lucide-react';
import { formatGraphQL, minifyGraphQL } from '../utils/toolUtils';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';

import { GRAPHQL_SEO_MAP } from '../utils/graphqlSeoData';

const EditorSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[350px] bg-white dark:bg-[#1e1e1e] flex flex-col p-4 space-y-3 animate-pulse">
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
        <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-zinc-700" />
        <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-zinc-700" />
        <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-zinc-700" />
        <div className="w-20 h-3 bg-slate-200 dark:bg-zinc-700 rounded ml-4" />
      </div>
      <div className="flex-1 space-y-4 font-mono text-[10px] text-slate-300 dark:text-zinc-600">
        <div className="flex items-center space-x-2">
          <span className="w-4 select-none">1</span>
          <div className="w-12 h-3 bg-indigo-100 dark:bg-indigo-950 rounded" />
          <div className="w-2 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
        </div>
        <div className="flex items-center space-x-2 pl-4">
          <span className="w-4 select-none">2</span>
          <div className="w-16 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="w-2 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="w-24 h-3 bg-emerald-100 dark:bg-emerald-950 rounded" />
        </div>
        <div className="flex items-center space-x-2 pl-4">
          <span className="w-4 select-none">3</span>
          <div className="w-20 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="w-2 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="w-12 h-3 bg-amber-100 dark:bg-amber-950 rounded" />
        </div>
        <div className="flex items-center space-x-2 pl-4">
          <span className="w-4 select-none">4</span>
          <div className="w-8 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="w-2 h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="w-32 h-3 bg-indigo-100 dark:bg-indigo-950 rounded" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 select-none">5</span>
          <div className="w-4 h-3 bg-indigo-100 dark:bg-indigo-950 rounded" />
        </div>
      </div>
    </div>
  );
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = GRAPHQL_SEO_MAP[pathname] ?? GRAPHQL_SEO_MAP['/tools/graphql/formatter'];
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
          <div className="flex-1 bg-white relative min-h-[450px]">
            <Editor
              height="100%"
              defaultLanguage="graphql"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={input}
              onChange={(value) => setInput(value || '')}
              onMount={handleEditorDidMount}
              loading={<EditorSkeleton />}
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
          <div className="flex-1 bg-white relative min-h-[450px]">
            <Editor
              height="100%"
              defaultLanguage="graphql"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={output}
              onMount={handleEditorDidMount}
              loading={<EditorSkeleton />}
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
          <h2 className="text-3xl font-bold text-on-surface">About {seo.h1}</h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              <strong>GraphQL</strong> is a query language for APIs and a runtime for fulfilling those queries with your existing data. Unlike REST, GraphQL allows clients to ask for exactly what they need, nothing more and nothing less.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">Why format your GraphQL queries?</h3>
            <p>
              GraphQL queries can become extremely complex and deeply nested as your application grows. A <strong>GraphQL formatter</strong> helps developers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Improve readability:</strong> Clear indentation for fields, arguments, and directives.</li>
              <li><strong>Detect errors:</strong> Instant validation against standard GraphQL syntax.</li>
              <li><strong>Standardization:</strong> Maintain a consistent code style across the development team.</li>
            </ul>
          </div>
        </section>

        {/* Input/Output Example */}
        {seo.example && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-on-surface">Usage Example</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-bold text-outline uppercase tracking-wider">Input (Raw)</p>
                <div className="bg-surface-container rounded-xl p-4 border border-outline-variant font-mono text-sm text-on-surface overflow-x-auto">
                  {seo.example.input}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-bold text-outline uppercase tracking-wider">Output (Processed)</p>
                <div className="bg-indigo-50/30 rounded-xl p-4 border border-indigo-100 font-mono text-sm text-indigo-900 overflow-x-auto whitespace-pre">
                  {seo.example.output}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-on-surface text-center">Why use Stoolzen for GraphQL</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Smart Prettify</h3>
              <p className="text-outline leading-relaxed">Organize your queries while automatically respecting the structure of fragments and arguments.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Minimize className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Real Minification</h3>
              <p className="text-outline leading-relaxed">Compress your queries for production by removing unnecessary spaces and comments.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">SDL Validation</h3>
              <p className="text-outline leading-relaxed">Full support for the official GraphQL specification, including Schema Definition Language.</p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        {seo.faqs.length > 0 && (
          <section className="bg-surface-container-low rounded-[2rem] p-10 md:p-16 border border-outline-variant">
            <h2 className="text-3xl font-bold text-on-surface mb-12 text-center">Frequently Asked Questions</h2>
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
          <h2 className="text-2xl font-bold text-on-surface text-center">Other GraphQL Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'GraphQL Validator', path: '/tools/graphql/validator', desc: 'Validate syntax instantly' },
              { name: 'GraphQL Minifier', path: '/tools/graphql/minifier', desc: 'Compress for production' },
              { name: 'GraphQL Editor', path: '/tools/graphql/editor', desc: 'Professional online editor' },
              { name: 'GraphQL Beautifier', path: '/tools/graphql/beautifier', desc: 'Beautify your queries' }
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
                loading={<EditorSkeleton />}
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
      {/* Programmatic Technical SEO Section */}
      {!maximized && (
        <div className="mt-12 space-y-12 border-t border-slate-200/80 dark:border-zinc-800/80 pt-10 pb-16 font-sans">
          
          {/* Schema Markup Injection */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": seo.h1,
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              },
              "description": seo.description
            })}
          </script>

          {seo.faqs.length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": seo.faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              })}
            </script>
          )}

          {/* Section 1: Detailed Technical Overview */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-zinc-50">Technical Guide to GraphQL Integrity</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-semibold mt-0.5">In-depth Analysis</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base mb-6">
              {seo.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-slate-100 dark:border-zinc-800 pt-8">
              <div className="flex gap-4">
                <div className="p-2 h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm md:text-base">Privacy by Design</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Formatting, validation, and minification operations are executed 100% locally in your web client. No query leaves your device.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm md:text-base">Instant Speed</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Optimized with the Monaco Editor engine and AST algorithms to parse queries of thousands of lines in milliseconds with zero visual lag.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Interactive Comparative Example */}
          {seo.example && (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-zinc-50">Interactive Practical Example</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-semibold mt-0.5">Interactive technical demo</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 mb-2 uppercase tracking-wide">
                    {seo.example.inputLabel || 'Original'}
                  </span>
                  <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 relative font-mono text-xs text-slate-700 dark:text-zinc-300 min-h-[140px] flex items-center justify-start overflow-auto whitespace-pre-wrap">
                    {seo.example.input}
                    <button 
                      onClick={() => {
                        setInput(seo.example!.input);
                        setStatusMessage({ title: 'Example Loaded', detail: 'The example code has been loaded into the editor.' });
                        setShowStatus(true);
                        setTimeout(() => setShowStatus(false), 3000);
                      }}
                      className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-2.5 rounded-md text-[10px] uppercase shadow-sm transition-all"
                    >
                      Test in Editor
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 mb-2 uppercase tracking-wide">
                    {seo.example.outputLabel || 'Expected Result'}
                  </span>
                  <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 relative font-mono text-xs text-slate-700 dark:text-zinc-300 min-h-[140px] overflow-auto whitespace-pre">
                    {seo.example.output}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(seo.example!.output);
                        setStatusMessage({ title: 'Copied to clipboard', detail: 'The result of the example has been copied.' });
                        setShowStatus(true);
                        setTimeout(() => setShowStatus(false), 3000);
                      }}
                      className="absolute top-2 right-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-1 px-2.5 rounded-md text-[10px] uppercase shadow-sm transition-all"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Dynamic Accordion FAQ in English */}
          {seo.faqs.length > 0 && (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-zinc-50">Frequently Asked Questions (FAQ)</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-semibold mt-0.5">Expert Answers</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {seo.faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div 
                      key={index} 
                      className="border border-slate-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200 bg-slate-50/30 dark:bg-zinc-900/50 hover:bg-slate-50 dark:hover:bg-zinc-800/40"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-zinc-200 text-sm md:text-base focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-indigo-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <div 
                        className={cn(
                          "transition-all duration-300 overflow-hidden",
                          isOpen ? "max-h-[500px] border-t border-slate-100 dark:border-zinc-800/80 p-5 bg-white dark:bg-zinc-950/50" : "max-h-0"
                        )}
                      >
                        <p className="text-slate-600 dark:text-zinc-300 text-xs md:text-sm leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Programmatic Internal Links Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-6">Explore Other GraphQL Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Formatter', desc: 'Indent and beautify queries', path: '/tools/graphql/formatter' },
                { title: 'Validator', desc: 'Check for syntax errors', path: '/tools/graphql/validator' },
                { title: 'Editor', desc: 'Interactive playground', path: '/tools/graphql/editor' },
                { title: 'Beautifier', desc: 'Code beautifier', path: '/tools/graphql/beautifier' },
                { title: 'Minifier', desc: 'Compress GraphQL queries', path: '/tools/graphql/minifier' },
                { title: 'Viewer', desc: 'Visualize hierarchy', path: '/tools/graphql/viewer' },
                { title: 'Checker', desc: 'Linter and syntax checker', path: '/tools/graphql/checker' },
                { title: 'Parser', desc: 'Analyze AST syntax tree', path: '/tools/graphql/parser' }
              ]
                .filter(item => item.path !== pathname)
                .map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="flex flex-col justify-between p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10 hover:border-indigo-200/80 dark:hover:border-indigo-800/80 transition-all group"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                      Start <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
