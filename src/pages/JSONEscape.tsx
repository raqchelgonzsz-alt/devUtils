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
    title: 'JSON Escape Online - Escape Special Characters | Stoolzen',
    description: 'Convert your JSON to an escaped text string safe for source code strings. Fast and free tool.',
    keywords: 'json escape online, escape json, json stringify online, convert json to string, dev tools',
    h1: 'JSON Escape',
    subtitle: 'Escape special characters from your JSON to use it in text strings.',
    intro: 'Our JSON Escape tool allows you to convert a structured JSON object into an escaped text string. This is essential when you need to include a JSON snippet inside another JSON, or as a string variable in languages like C#, Java, or JavaScript.',
    faqs: [
      { q: "Which characters are escaped?", a: "Double quotes (\"), backslashes (\\), and control characters like line feeds (\\n) and carriage returns (\\r) are escaped." },
      { q: "Why do I need to escape the JSON?", a: "So that a language's parsing engine does not confuse the quotes of the inner JSON with those of the string containing it." }
    ]
  },
  '/tools/json/unescape': {
    title: 'JSON Unescape Online - Unescape JSON Strings | Stoolzen',
    description: 'Unescape JSON strings and convert them back to readable format. Recover the original structure of your escaped JSON data.',
    keywords: 'json unescape online, unescape json, json raw string conversion, dev tools',
    h1: 'JSON Unescape',
    subtitle: 'Convert escaped JSON strings back to their original readable format.',
    intro: 'If you have a text string containing an escaped JSON (with many backslashes), this tool allows you to clean it and recover the formatted original JSON object.',
    faqs: [
      { q: "Can the unescaping process fail?", a: "If the string is not a valid JSON after unescaping the backslashes, the process might not output a valid result. Make sure to copy the entire string." }
    ]
  }
};

const FALLBACK_SEO = {
  title: 'JSON Escape & Unescape Online | Stoolzen',
  description: 'Safely escape and unescape JSON strings.',
  keywords: 'json escape, json unescape, developer tools',
  h1: 'JSON Escape/Unescape',
  subtitle: 'Manipulate character escaping in your JSON data.',
  intro: 'A quick utility to convert between raw JSON and escaped strings.',
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
        setStatusMessage({ title: 'JSON Escaped', detail: 'Special characters converted successfully.' });
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
        setStatusMessage({ title: 'JSON Unescaped', detail: 'Original structure recovered.' });
      }
      setError(null);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    } catch (err) {
      setError('Process error. Ensure the input is valid for this operation.');
      setOutput('');
    }
  };

  useEffect(() => {
    handleProcess();
  }, [input, pathname]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setStatusMessage({ title: 'Copied to clipboard', detail: 'Result ready to use.' });
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
            About {seo.h1}
          </h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              <strong>JSON character escaping</strong> is the process of converting reserved characters (like double quotes, backslashes, or control characters) into safe sequences that can be transmitted within a JSON string without breaking the object's structure. 
              This is vital when you need to send HTML code, Windows file paths, or text blocks with line breaks through an API.
            </p>
            <h3 className="text-xl font-bold text-on-surface pt-4">Why is it necessary to escape JSON?</h3>
            <p>
              In JSON, certain characters have special meanings. For example, a double quote (<code>"</code>) indicates the start or end of a field. If your text contains a quote, the JSON parser will fail unless you escape it as <code>\"</code>.
            </p>
          </div>
        </section>

        {/* Examples Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface">Escaped vs Unescaped Example</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-outline font-bold">Plain Text (Unescaped)</span>
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
           <h3 className="text-xl font-bold text-on-surface">Common Use Cases</h3>
           <ul className="list-disc pl-5 text-outline space-y-2">
              <li><strong>Database Integration:</strong> Preparing strings to be saved in JSON or TEXT type fields.</li>
              <li><strong>API Development:</strong> Sending code snippets or HTML within a JSON response.</li>
              <li><strong>Configurations:</strong> Escaping system paths in <code>.json</code> files (e.g., <code>C:\\Users\\Path</code>).</li>
           </ul>
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
            { name: 'JSON Formatter', path: '/tools/json/formatter', desc: 'Beautify and format your JSON objects' },
            { name: 'JSON Validator', path: '/tools/json/validator', desc: 'Validate syntax and find errors' },
            { name: 'JSON Diff', path: '/tools/json/diff', desc: 'Compare JSON file versions' },
            { name: 'JSONPath Explorer', path: '/tools/json/path-explorer', desc: 'Execute queries on JSON data' },
            { name: 'JSON Minifier', path: '/tools/json/minify', desc: 'Reduce the size of your files' },
          ]}
          categories={[
            { name: 'JSON Category', path: '/tools/json' },
            { name: 'Text Tools', path: '/tools/text' }
          ]}
          guides={[
            { name: 'Character Escaping Guide', path: '/docs/escape-characters-guide' },
            { name: 'Best Practices for JSON Strings', path: '/docs/json-strings-best-practices' }
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
