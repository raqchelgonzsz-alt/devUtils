import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Copy, Wand2, Trash2, CheckCircle2, History, Maximize2, Minimize2, Type } from 'lucide-react';
import { formatJSON } from '../utils/toolUtils';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const [spacing, setSpacing] = useState<string>('2');
  const [fontSize, setFontSize] = useState<number>(14);
  const [maximized, setMaximized] = useState<'input' | 'output' | null>(null);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const spacingValue = spacing === 'tab' ? '\t' : parseInt(spacing);
      const formatted = formatJSON(input, spacingValue);
      setOutput(formatted);
      setError(null);
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

  const toggleMaximize = (target: 'input' | 'output') => {
    if (maximized === target) setMaximized(null);
    else setMaximized(target);
  };

  return (
    <div className="h-full flex flex-col space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-6 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">JSON Formatter</h1>
          <p className="text-outline">Format, validate, and beautify minified JSON strings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-highest border border-outline-variant px-3 py-1.5 rounded-lg">
            <Type className="w-4 h-4 text-outline" />
            <input 
              type="number" 
              value={fontSize} 
              onChange={(e) => setFontSize(Math.max(10, Math.min(30, parseInt(e.target.value) || 14)))}
              className="w-12 bg-transparent text-sm font-bold focus:outline-none"
              title="Font Size"
            />
          </div>
          <select 
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="bg-surface-container-highest border border-outline-variant px-3 py-2 rounded-lg text-sm font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
          </select>
          <button 
            onClick={handleFormat}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
          >
            <Wand2 className="w-4 h-4" />
            Prettify
          </button>
        </div>
      </div>

      <div className={cn(
        "flex-1 min-h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20",
        maximized && "hidden"
      )}>
        {/* Input Area */}
        <div className="flex flex-col bg-surface-container border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">Input</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setInput('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => toggleMaximize('input')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
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
              theme="vs-light"
              value={input}
              onChange={(value) => setInput(value || '')}
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
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">Output</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="px-3 py-1 bg-white text-slate-700 border border-slate-200 rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
              <button 
                onClick={() => toggleMaximize('output')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
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
              theme="vs-light"
              value={output}
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

      {/* Maximized View Overlay */}
      <AnimatePresence>
        {maximized && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-4 md:inset-8 z-[60] bg-white border border-slate-300 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                {maximized === 'input' ? <Terminal className="w-5 h-5 text-indigo-600" /> : <History className="w-5 h-5 text-indigo-600" />}
                <span className="font-bold text-slate-900 capitalize tracking-tight">{maximized} Editor</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Maximized Mode</span>
              </div>
              <div className="flex items-center gap-4">
                {maximized === 'output' && (
                  <button 
                    onClick={handleCopy}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Result
                  </button>
                )}
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
                defaultLanguage="json"
                theme="vs-light"
                value={maximized === 'input' ? input : output}
                onChange={(value) => maximized === 'input' && setInput(value || '')}
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
    </div>
  );
};
