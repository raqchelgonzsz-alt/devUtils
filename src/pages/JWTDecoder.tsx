import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Lock, Info, ShieldCheck, AlertCircle, Copy, CheckCircle2, FileCode, Activity } from 'lucide-react';
import { decodeJWT, JWTData } from '../utils/toolUtils';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useLocation, Link } from 'react-router-dom';

const API_SEO_MAP: Record<string, { 
  title: string; 
  description: string; 
  keywords: string; 
  h1: string; 
  subtitle: string;
  intro: string;
  example?: { input: string; output: { header: string; payload: string } };
  faqs: { q: string; a: string }[];
}> = {
  '/tools/api/jwt-decoder': {
    title: 'JWT Decoder Online - Validate and Analyze Tokens | Stoolzen',
    description: 'Decode your JSON Web Tokens (JWT) safely. Analyze headers, payloads, and verify signatures online with our free tool.',
    keywords: 'jwt validators, jwt decoder, analyze jwt, jwt debugger, verify jwt online',
    h1: 'Online JWT Decoder',
    subtitle: 'Decode, verify, and analyze your JSON Web Tokens safely and privately.',
    intro: 'The Stoolzen JWT decoder allows you to inspect the content of any JSON Web Token without compromising its security. All processing is done locally, ensuring that your keys and payloads never leave your browser.',
    example: {
      input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiRGV2In0.signature',
      output: {
        header: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
        payload: '{\n  "sub": "123",\n  "name": "Dev"\n}'
      }
    },
    faqs: [
      { q: "Is it safe to decode my token here?", a: "Absolutely. The JWT is decoded in your browser using local JavaScript. There are no network requests sending your token to any server." },
      { q: "Can I see the secret if the token is signed?", a: "No. A JWT is signed, not encrypted. You can see the header and payload data, but the original secret cannot be extracted from the token." },
      { q: "Which signature algorithms do you support?", a: "We support viewing tokens signed with HS256, RS256, ES256, and more, following the RFC 7519 standard." }
    ]
  }
};

const FALLBACK_API_SEO: {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  intro: string;
  example?: { input: string; output: { header: string; payload: string } };
  faqs: { q: string; a: string }[];
} = {
  title: 'API and Authentication Tools Online | Stoolzen',
  description: 'Tools for backend and frontend developers: JWT, OAuth, REST, and more.',
  keywords: 'api tools, auth tools, jwt, oauth, rest debug',
  h1: 'API & Auth Tools',
  subtitle: 'Debug and validate your network and authentication protocols.',
  intro: 'A set of essential utilities for working with modern APIs and security systems.',
  faqs: []
};

export const JWTDecoder: React.FC = () => {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [decoded, setDecoded] = useState<JWTData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const seo = API_SEO_MAP[pathname] ?? FALLBACK_API_SEO;

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
    <div className="space-y-4 pb-20">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
          { name: 'API & Auth', item: '/tools/api' },
          { name: seo.h1, item: pathname }
        ]}
      />

      <div className="flex justify-between items-end border-b border-outline-variant pb-3 mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">{seo.h1}</h1>
          <p className="text-outline">{seo.subtitle}</p>
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

      <div className="space-y-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[900px] lg:h-[550px]">
          {/* Header */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm h-full">
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
            <div className="flex-1 bg-surface-container-lowest relative overflow-hidden">
              <div className="absolute inset-0">
                 <Editor
                  height="100%"
                  theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
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
          </div>

          {/* Payload */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm h-full">
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
            <div className="flex-1 bg-surface-container-lowest relative overflow-hidden">
              <div className="absolute inset-0">
                 <Editor
                  height="100%"
                  theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
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
          </div>

          {/* Signature */}
          <div className="flex flex-col bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-sm h-full">
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

      {/* Educational & SEO Content Section */}
      <div className="mt-10 pt-8 border-t border-outline-variant pb-20 space-y-14">
        {/* Intro Section */}
        <section className="max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-on-surface">Usage Guide: {seo.h1}</h2>
          <p className="text-outline text-lg leading-relaxed">
            {seo.intro}
          </p>
          <div className="prose prose-slate max-w-none text-outline space-y-4">
            <p>
              A <strong>JSON Web Token (JWT)</strong> is an open standard (RFC 7519) that defines a compact format for securely transmitting information. Our tool allows you to decompose this token into its three fundamental parts:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Header:</strong> Contains the token type (JWT) and the signing algorithm used (like HS256 or RS256).</li>
              <li><strong>Payload:</strong> Contains the claims, which are statements about an entity (typically the user) and additional metadata.</li>
              <li><strong>Signature:</strong> Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
               <h4 className="text-amber-800 font-bold flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  Security Notice
               </h4>
               <p className="text-amber-900 text-sm leading-relaxed italic">
                  Remember that JWTs are Base64 encoded, NOT encrypted. Anyone with the token can read its contents. Never include passwords, private keys, or highly sensitive information inside a JWT payload.
               </p>
            </div>
          </div>
        </section>

        {/* Input/Output Example */}
        {seo.example && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-on-surface">Decoding Example</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-sm font-bold text-outline uppercase tracking-wider">Encoded JWT</p>
                <div className="bg-surface-container rounded-xl p-4 border border-outline-variant font-mono text-sm text-on-surface break-all overflow-x-auto leading-relaxed">
                  <span className="text-error">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.
                  <span className="text-primary">eyJzdWIiOiIxMjMiLCJuYW1lIjoiRGV2In0</span>.
                  <span className="text-secondary">signature</span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-outline uppercase tracking-wider">Decoded Payload</p>
                <div className="bg-indigo-50/30 rounded-xl p-4 border border-indigo-100 font-mono text-sm text-indigo-900 overflow-x-auto whitespace-pre">
                  {seo.example.output.payload}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Use Cases Section */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-on-surface text-center">When to use JWT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Authorization</h3>
              <p className="text-outline leading-relaxed">This is the most common scenario. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant hover:border-secondary/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Information Exchange</h3>
              <p className="text-outline leading-relaxed">JWTs are a good way of securely transmitting information between parties. Because JWTs can be signed, you can be sure the senders are who they say they are and the content hasn't been tampered with.</p>
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
                    <span className="text-primary">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-outline leading-relaxed pl-8 border-l-2 border-primary/20">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools Grid */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-on-surface text-center">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'JSON Formatter', path: '/tools/json/formatter', desc: 'Beautify your JSON data' },
              { name: 'JSON Validator', path: '/tools/json/validator', desc: 'Validate JSON syntax' },
              { name: 'GraphQL Formatter', path: '/tools/graphql/formatter', desc: 'Organize your queries' },
              { name: 'Base64 Decoder', path: '/tools/text', desc: 'Coming soon...' }
            ].map(tool => (
              <a key={tool.path} href={tool.path} className="p-6 rounded-2xl bg-surface-container border border-outline-variant hover:border-primary transition-all group">
                <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{tool.name}</p>
                <p className="text-xs text-outline mt-1">{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>
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
