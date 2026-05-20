import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { JSONPath } from 'jsonpath-plus';
import { FileSearch, Copy, Trash2, CheckCircle2, Search, Info, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';
import { RelatedContent } from '../components/RelatedContent';

const PATH_SEO_MAP: Record<string, { title: string; description: string; keywords: string; h1: string; subtitle: string; intro: string; faqs: { q: string; a: string }[] }> = {
  '/tools/json/path-explorer': {
    title: 'JSONPath Explorer Online - Query JSON with JSONPath | Stoolzen',
    description: 'Test and debug your JSONPath expressions online. Filter and extract data from complex JSON objects easily and quickly.',
    keywords: 'jsonpath explorer, jsonpath online tester, query json, filter json, jsonpath checker, dev tools',
    h1: 'JSONPath Explorer',
    subtitle: 'Extract and filter data from your JSON objects using JSONPath expressions.',
    intro: 'JSONPath is to JSON what XPath is to XML. This tool allows you to execute powerful queries on JSON data structures to find exactly what you need, whether it\'s a specific value, a list of elements, or filtering by conditions.',
    faqs: [
      { q: "What is a JSONPath expression?", a: "It's a string that defines a path to one or more elements in a JSON. For example, '$.store.book[*].author' would extract all the authors of the books in the store." },
      { q: "Do you support filters and wildcards?", a: "Yes, we support the full JSONPath standard, including wildcards (*), deep selections (..), and filter expressions ([?(@.price < 10)])." }
    ]
  }
};

const FALLBACK_SEO = {
  title: 'JSONPath Tester & Explorer Online | Stoolzen',
  description: 'Tool to test JSONPath expressions on your data.',
  keywords: 'jsonpath, json query, dev tools',
  h1: 'JSONPath Explorer',
  subtitle: 'Explore your JSON data with power.',
  intro: 'An interactive utility to master your JSONPath queries.',
  faqs: []
};

export const JSONPathExplorer: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('{\n  "store": {\n    "book": [\n      { "category": "reference", "author": "Nigel Rees", "title": "Sayings of the Century", "price": 8.95 },\n      { "category": "fiction", "author": "Evelyn Waugh", "title": "Sword of Honour", "price": 12.99 },\n      { "category": "fiction", "author": "Herman Melville", "title": "Moby Dick", "isbn": "0-553-21311-3", "price": 8.99 },\n      { "category": "fiction", "author": "J. R. R. Tolkien", "title": "The Lord of the Rings", "isbn": "0-395-19395-8", "price": 22.99 }\n    ],\n    "bicycle": { "color": "red", "price": 19.95 }\n  }\n}');
  const [pathInput, setPathInput] = useState('$.store.book[*].author');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = PATH_SEO_MAP[pathname] ?? FALLBACK_SEO;

  useEffect(() => {
    if (!jsonInput.trim() || !pathInput.trim()) {
        setResult(null);
        setError(null);
        return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      const evaluated = JSONPath({ path: pathInput, json: parsed });
      setResult(evaluated);
      setError(null);
    } catch (err) {
      setError('Error evaluating expression or invalid JSON.');
      setResult(null);
    }
  }, [jsonInput, pathInput]);

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setStatusMessage({ title: 'Result Copied', detail: 'The output has been saved to your clipboard.' });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  return (
    <div className="flex flex-col space-y-6 pb-20">
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

      <div className="space-y-4">
        {/* Path Input Box */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-outline">
            <Search className="w-3 h-3" />
            <span>JSONPath Expression</span>
          </div>
          <div className="flex gap-3">
            <input 
              type="text"
              value={pathInput}
              onChange={(e) => setPathInput(e.target.value)}
              placeholder="e.g. $.store.book[*].author"
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-on-surface"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-outline italic">
            <Info className="w-3 h-3" />
            <span>Standard: RFC 8259 compatible JSONPath expressions.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[900px] lg:h-[650px] pb-8">
          {/* JSON Input */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm h-full">
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Target JSON</span>
              <button onClick={() => setJsonInput('')} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 bg-white relative overflow-hidden">
              <div className="absolute inset-0">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                  value={jsonInput}
                  onChange={(v) => setJsonInput(v || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: 'JetBrains Mono',
                    automaticLayout: true,
                    padding: { top: 20 }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Result Output */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm relative h-full">
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Query Result</span>
              <button onClick={handleCopyResult} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 bg-white relative overflow-hidden">
              <div className="absolute inset-0">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                  value={result ? JSON.stringify(result, null, 2) : ''}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: 'JetBrains Mono',
                    automaticLayout: true,
                    padding: { top: 20 }
                  }}
                />
              </div>
              {error && (
                <div className="absolute inset-0 bg-red-50/50 backdrop-blur-[1px] flex items-center justify-center p-6 text-center z-10">
                  <div className="bg-white border border-red-200 rounded-xl p-4 shadow-lg text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-10 pt-8 border-t border-outline-variant space-y-12">
        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-indigo-500" />
            JSONPath Guide
          </h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              <strong>JSONPath</strong> is a query language for JSON, similar to what XPath is to XML. It allows you to navigate through a JSON document and extract specific nodes, elements, or values using a compact and powerful syntax.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">Main JSONPath Operators</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="py-2 pr-4 font-bold text-on-surface">Operator</th>
                    <th className="py-2 font-bold text-on-surface">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  <tr><td className="py-2 pr-4 font-mono text-indigo-600">$</td><td className="py-2">The root object or element.</td></tr>
                  <tr><td className="py-2 pr-4 font-mono text-indigo-600">@</td><td className="py-2">The current object or element.</td></tr>
                  <tr><td className="py-2 pr-4 font-mono text-indigo-600">. or []</td><td className="py-2">Child operator (dot-notation or bracket-notation).</td></tr>
                  <tr><td className="py-2 pr-4 font-mono text-indigo-600">..</td><td className="py-2">Deep scan. Searches at all levels.</td></tr>
                  <tr><td className="py-2 pr-4 font-mono text-indigo-600">*</td><td className="py-2">Wildcard. All objects/elements.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface">Practical Query Examples</h2>
          <div className="space-y-4">
            <div className="bg-surface-container rounded-2xl border border-outline-variant p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <span className="text-[10px] font-bold uppercase text-outline">Example JSON</span>
                   <pre className="bg-white p-3 rounded-lg text-[10px] font-mono border border-slate-100">
{`{
  "store": {
    "book": [
      { "category": "reference", "price": 8.95 },
      { "category": "fiction", "price": 12.99 }
    ]
  }
}`}
                   </pre>
                </div>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface">Query all prices:</p>
                      <code className="text-xs bg-indigo-50 text-indigo-700 p-1 rounded">$.store.book[*].price</code>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface">Query fiction books:</p>
                      <code className="text-xs bg-indigo-50 text-indigo-700 p-1 rounded">$..book[?(@.category=="fiction")]</code>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {seo.faqs.length > 0 && (
          <section className="bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant">
            <h2 className="text-2xl font-bold text-on-surface mb-8">Frequently Asked Questions</h2>
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
            { name: 'JSON Formatter', path: '/tools/json/formatter', desc: 'Formats and validates JSON objects' },
            { name: 'JSON Validator', path: '/tools/json/validator', desc: 'Checks for errors in JSON structure' },
            { name: 'JSON Diff', path: '/tools/json/diff', desc: 'Compares JSON files visually' },
            { name: 'JSON Escape', path: '/tools/json/escape', desc: 'Escapes characters for use in strings' },
            { name: 'JSON Minifier', path: '/tools/json/minify', desc: 'Compresses JSON code' },
          ]}
          categories={[
            { name: 'JSON Hub', path: '/tools/json' },
            { name: 'API Tools', path: '/tools/api' }
          ]}
          guides={[
            { name: 'Basic JSONPath Syntax', path: '/docs/jsonpath-syntax' },
            { name: 'How to Extract Complex JSON Data', path: '/docs/extract-json-data' }
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
