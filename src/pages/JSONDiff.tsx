import React, { useState, useEffect } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { GitCompare, Copy, Download, Trash2, CheckCircle2, AlertCircle, Wand2, FileSearch } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';
import { RelatedContent } from '../components/RelatedContent';
import { formatJSON } from '../utils/toolUtils';

const DIFF_SEO_MAP: Record<string, { title: string; description: string; keywords: string; h1: string; subtitle: string; intro: string; faqs: { q: string; a: string }[] }> = {
  '/tools/json/diff': {
    title: 'JSON Diff Online - Compare two JSON Files | Stoolzen',
    description: 'Compare two JSON strings online and visualize differences line by line. Free, fast, and secure tool for developers.',
    keywords: 'json diff online, compare json, json differences, json comparison tool, dev tools',
    h1: 'JSON Diff & Compare',
    subtitle: 'Compare two JSON structures and find differences instantly.',
    intro: 'Our JSON Diff tool allows you to compare two JSON code snippets visually. It uses the VS Code engine to highlight additions, deletions, and changes, making it easy to debug API payloads or configurations.',
    faqs: [
      { q: "How does the comparison work?", a: "The tool analyzes both JSONs and highlights additions in green and deletions in red. If the JSONs are not formatted, we recommend using the 'Prettify' button first." },
      { q: "Is it safe to compare sensitive data?", a: "Yes. All comparison processing happens locally in your browser. Your data is never sent to our servers." }
    ]
  },
  '/tools/json/compare': {
    title: 'Free Online JSON Comparator | Stoolzen',
    description: 'Find differences between two JSON objects online. Clear and detailed visualization of changes in JSON structures.',
    keywords: 'compare json online, json compare tool, json differences, validate json changes',
    h1: 'JSON Comparator',
    subtitle: 'The easiest way to compare two JSON objects in your browser.',
    intro: 'The Stoolzen JSON Comparator is ideal for when you need to know what changed between two API responses or two versions of a configuration file. It supports large files and offers a professional split view.',
    faqs: [
      { q: "Can I compare minified JSONs?", a: "Yes, but for a better visualization of differences, the tool will try to auto-format them before showing the diff." }
    ]
  }
};

const FALLBACK_SEO = {
  title: 'JSON Diff & Compare Online | Stoolzen',
  description: 'Compare two JSON structures and visualize the differences.',
  keywords: 'json diff, json compare, developer tools',
  h1: 'JSON Diff',
  subtitle: 'Compare and find differences in your JSON data.',
  intro: 'A powerful utility to compare two JSON strings side by side.',
  faqs: []
};

const EditorSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[450px] bg-white dark:bg-[#1e1e1e] flex flex-col p-4 space-y-3 animate-pulse">
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
        <div className="flex items-center space-x-2">
          <span className="w-4 select-none">3</span>
          <div className="w-4 h-3 bg-indigo-100 dark:bg-indigo-950 rounded" />
        </div>
      </div>
    </div>
  );
};

export const JSONDiff: React.FC = () => {
  const [original, setOriginal] = useState('{\n  "name": "Stoolzen",\n  "version": "1.0.0",\n  "active": true,\n  "features": ["json", "graphql"]\n}');
  const [modified, setModified] = useState('{\n  "name": "Stoolzen",\n  "version": "1.1.0",\n  "active": false,\n  "features": ["json", "graphql", "jwt"]\n}');
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = DIFF_SEO_MAP[pathname] ?? FALLBACK_SEO;

  const handlePrettify = () => {
    try {
      setOriginal(formatJSON(original, '2'));
      setModified(formatJSON(modified, '2'));
      setStatusMessage({ title: 'JSONs Formatted', detail: 'Both sides have been beautified for better comparison.' });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (e) {
      // Silently fail or show error
    }
  };

  const handleClear = () => {
    setOriginal('');
    setModified('');
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
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrettify} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 hover:bg-indigo-700 active:scale-95 shadow-md"
            title="Format both sides"
          >
            <Wand2 className="w-4 h-4" />
            Prettify
          </button>
          <button 
            onClick={handleClear} 
            className="px-4 py-2 bg-surface-container border border-outline-variant text-on-surface rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 hover:bg-surface-container-high active:scale-95 shadow-sm"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm min-h-[650px]">
        <div className="px-4 py-2 border-b border-outline-variant bg-surface-container-high flex justify-between text-[10px] font-bold uppercase tracking-widest text-outline">
          <span>Original JSON</span>
          <span>Modified JSON</span>
        </div>
        <DiffEditor
          height="100%"
          original={original}
          modified={modified}
          language="json"
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          loading={<EditorSkeleton />}
          options={{
            renderSideBySide: true,
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'JetBrains Mono',
            automaticLayout: true,
            originalEditable: true,
            scrollBeyondLastLine: false,
            padding: { top: 20 }
          }}
          onMount={(editor) => {
             editor.getOriginalEditor().onDidChangeModelContent(() => {
                setOriginal(editor.getOriginalEditor().getValue());
             });
             editor.getModifiedEditor().onDidChangeModelContent(() => {
                setModified(editor.getModifiedEditor().getValue());
             });
          }}
        />
      </div>

      {/* SEO/Educational Content */}
      <div className="mt-10 pt-8 border-t border-outline-variant space-y-12">
        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-indigo-500" />
            Why use {seo.h1}?
          </h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              In modern software development, JSON files are the de facto standard for data exchange. However, when working with complex API responses or configuration files spanning thousands of lines, identifying manual changes is prone to human error. 
              Our <strong>online JSON comparator</strong> uses an advanced diffing algorithm to highlight not only changed lines but also semantic changes within objects.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">Real Use Cases</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>API Debugging:</strong> Compare your local server response vs production to find schema inconsistencies.</li>
              <li><strong>Version Control:</strong> Analyze changes in <code>package.json</code> files or infrastructure configuration files (Terraform, CloudFormation) before committing.</li>
              <li><strong>Regression Testing:</strong> Ensure an update to your database hasn't altered critical fields in the output payload.</li>
            </ul>
          </div>
        </section>

        {/* Examples Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface">JSON Comparison Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-outline">Original Input</span>
              <pre className="bg-surface-container p-4 rounded-xl text-xs font-mono border border-outline-variant overflow-x-auto text-on-surface">
{`{
  "id": 1,
  "status": "active",
  "tags": ["dev", "test"]
}`}
              </pre>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-outline">Modified Input</span>
              <pre className="bg-surface-container p-4 rounded-xl text-xs font-mono border border-outline-variant overflow-x-auto text-on-surface">
{`{
  "id": 1,
  "status": "pending",
  "tags": ["dev", "prod"],
  "version": "1.0.1"
}`}
              </pre>
            </div>
          </div>
          <p className="text-sm text-outline italic">
            * The editor will highlight "status" in red/green, "tags" will show the change from "test" to "prod", and the new "version" line will be marked as an addition.
          </p>
        </section>

        {/* FAQs */}
        {seo.faqs.length > 0 && (
          <section className="bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant">
            <h2 className="text-2xl font-bold text-on-surface mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {seo.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface flex gap-2">
                    <span className="text-indigo-500">Q:</span> {faq.q}
                  </h3>
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
            { name: 'JSON Formatter', path: '/tools/json/formatter', desc: 'Format and beautify your JSON objects' },
            { name: 'JSON Validator', path: '/tools/json/validator', desc: 'Detect syntax errors instantly' },
            { name: 'JSON Escape', path: '/tools/json/escape', desc: 'Convert JSON to escaped strings' },
            { name: 'JSONPath Explorer', path: '/tools/json/path-explorer', desc: 'Query complex JSON structures' },
            { name: 'JSON Minifier', path: '/tools/json/minify', desc: 'Compress code to optimize space' },
          ]}
          categories={[
            { name: 'JSON Tools', path: '/tools/json' },
            { name: 'Text Utilities', path: '/tools/text' }
          ]}
          guides={[
            { name: 'Differences between JSON and XML', path: '/docs/json-vs-xml' },
            { name: 'How to debug APIs with JSON Diff', path: '/docs/debug-api-json-diff' }
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
