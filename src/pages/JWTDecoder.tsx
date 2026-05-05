import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Lock, Info, ShieldCheck, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';
import { decodeJWT, JWTData } from '../utils/toolUtils';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const JWTDecoder: React.FC = () => {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [decoded, setDecoded] = useState<JWTData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setStatusMessage({ title: 'Copied to clipboard', detail: `${label} has been saved to your clipboard.` });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  useEffect(() => {
    try {
      if (!token.trim()) {
        setDecoded(null);
        setError(null);
        return;
      }
      const data = decodeJWT(token);
      setDecoded(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid Token');
      setDecoded(null);
    }
  }, [token]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">JWT Decoder</h1>
          <p className="text-outline">Decode, verify and generate JSON Web Tokens.</p>
        </div>
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-all animate-fade-in",
          error ? "bg-error-container text-error border-error/20" : "bg-emerald-50 text-emerald-700 border-emerald-200"
        )}>
          <div className={cn("w-2 h-2 rounded-full animate-pulse", error ? "bg-error" : "bg-emerald-500")} />
          <span className="text-xs font-bold uppercase tracking-wider">
            {error ? 'Invalid Token' : 'Valid Format'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Input Token Area */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Encoded Token</label>
          <div className="bg-surface-container rounded-2xl border border-outline-variant p-1 shadow-inner focus-within:ring-1 ring-primary focus-within:border-primary transition-all">
            <textarea
              className="w-full h-32 bg-transparent border-none focus:ring-0 p-4 font-mono text-sm resize-none break-all"
              placeholder="Paste your JWT here..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </div>

        {/* Detailed Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
          {/* Header */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Header</span>
                <span className="text-[10px] text-outline lowercase font-medium italic">algorithm & token type</span>
              </div>
              <button 
                onClick={() => handleCopy(JSON.stringify(decoded?.header, null, 2), 'Header')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Copy Header"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 bg-surface-container-lowest relative">
               <Editor
                height="100%"
                defaultLanguage="json"
                theme="vs-light"
                value={decoded ? JSON.stringify(decoded.header, null, 2) : ''}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'off',
                  readOnly: true,
                  fontFamily: 'JetBrains Mono',
                  automaticLayout: true,
                  padding: { top: 16 }
                }}
              />
            </div>
          </div>

          {/* Payload */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
             <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Payload</span>
                <span className="text-[10px] text-outline lowercase font-medium italic">data</span>
              </div>
              <button 
                onClick={() => handleCopy(JSON.stringify(decoded?.payload, null, 2), 'Payload')}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Copy Payload"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 bg-surface-container-lowest relative">
               <Editor
                height="100%"
                defaultLanguage="json"
                theme="vs-light"
                value={decoded ? JSON.stringify(decoded.payload, null, 2) : ''}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'off',
                  readOnly: true,
                  fontFamily: 'JetBrains Mono',
                  automaticLayout: true,
                  padding: { top: 16 }
                }}
              />
            </div>
          </div>

          {/* Signature */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
             <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Signature</span>
            </div>
            <div className="flex-1 bg-surface-container-low p-6 space-y-6 overflow-auto">
              <div className="space-y-4">
                <div className="font-mono text-xs text-outline space-y-1">
                  <p>HMACSHA256(</p>
                  <p className="pl-4">base64UrlEncode(header) + "." +</p>
                  <p className="pl-4">base64UrlEncode(payload),</p>
                  <p className="pl-4 text-primary font-bold">your-256-bit-secret</p>
                  <p>)</p>
                </div>
                
                <div className="pt-8 space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline block">Verify Signature</label>
                  <input 
                    type="text" 
                    placeholder="your-256-bit-secret"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-primary"
                  />
                  <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] text-primary/80 leading-relaxed font-medium">
                      The signature is verified by calculating the hash of the header and payload with your secret.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-error-container border border-error/20 p-4 rounded-2xl flex items-center gap-3 text-error"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">{error}</span>
          </motion.div>
        )}
      </div>

      {/* Info Card */}
      <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant flex items-start gap-6">
        <div className="w-12 h-12 bg-primary-container text-primary rounded-2xl flex items-center justify-center shrink-0">
          <Info className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold">About JSON Web Tokens</h3>
          <p className="text-sm text-outline leading-relaxed max-w-4xl">
            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
          </p>
        </div>
      </section>

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
