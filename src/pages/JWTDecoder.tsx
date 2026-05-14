import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Lock, Info, ShieldCheck, AlertCircle, Copy, CheckCircle2, FileCode, Activity } from 'lucide-react';
import { decodeJWT, JWTData } from '../utils/toolUtils';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

export const JWTDecoder: React.FC = () => {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [decoded, setDecoded] = useState<JWTData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ title: '', detail: '' });
  const { theme } = useTheme();

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
        title="Decodificador JWT Online - Validar y Analizar Tokens | DevUtils"
        description="Decodifica tus JSON Web Tokens (JWT) de forma segura. Analiza headers, payloads y verifica firmas online con nuestra herramienta gratuita."
        keywords="validadores de jwt, jwt decoder, decodificador jwt, analizar jwt, jwt debugger, verificar jwt online"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Stoolzen JWT Decoder",
          "url": "https://stoolzen.com/jwt",
          "description": "Herramienta para decodificar e inspeccionar JSON Web Tokens de forma segura.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any"
        }}
      />



      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Decodificador JWT</h1>
          <p className="text-outline">Decodifica, verifica y analiza tus JSON Web Tokens de forma segura.</p>
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

      {/* SEO Content Section */}
      <article className="mt-12 space-y-10 bg-surface-bright p-8 lg:p-12 rounded-3xl border border-outline-variant shadow-sm text-on-surface">
        <section className="space-y-4">
          <div className="flex items-center gap-4 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 bg-primary-container text-primary rounded-2xl flex items-center justify-center shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Todo lo que necesitas saber sobre los JWT</h2>
          </div>
          <p className="text-outline leading-relaxed text-lg">
            Un <strong>JSON Web Token (JWT)</strong> es un estándar abierto (RFC 7519) que define un formato compacto y autónomo para transmitir información de forma segura entre distintas partes como un objeto JSON. Esta información puede ser verificada y validada porque está firmada digitalmente utilizando un secreto (con el algoritmo HMAC) o un par de claves pública/privada usando RSA o ECDSA.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-l-4 border-primary pl-4">¿Cómo funciona y cómo decodificar un JWT?</h3>
          <p className="text-outline leading-relaxed">
            Un JWT se compone de tres partes separadas por puntos (<code>.</code>): <strong>Header</strong>, <strong>Payload</strong>, y <strong>Signature</strong>. Al ser cadenas codificadas en Base64Url, pueden ser decodificadas fácilmente sin necesidad de la clave secreta. Sin embargo, para <em>verificar</em> que la información no ha sido alterada, es indispensable la firma.
          </p>
          <ul className="list-disc list-inside space-y-2 text-outline ml-4">
            <li><strong>Header (Encabezado):</strong> Contiene el tipo de token (JWT) y el algoritmo de firma utilizado (como HMAC SHA256 o RSA).</li>
            <li><strong>Payload (Carga útil):</strong> Contiene las afirmaciones o "claims", que son declaraciones sobre una entidad (típicamente, el usuario) y metadatos adicionales.</li>
            <li><strong>Signature (Firma):</strong> Se crea tomando el header codificado, el payload codificado, un secreto, y aplicando el algoritmo especificado en el header. Esto garantiza la integridad del token.</li>
          </ul>
        </section>

        <section className="space-y-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileCode className="w-5 h-5 text-secondary" /> 
            Ejemplo real de un JWT
          </h3>
          <p className="text-outline leading-relaxed">
            Imagina que un usuario inicia sesión en tu aplicación. El servidor genera un JWT y se lo envía al cliente. El token lucirá algo así:
          </p>
          <div className="font-mono text-sm break-all bg-surface p-4 rounded-lg border border-outline-variant">
            <span className="text-error">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.
            <span className="text-primary">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>.
            <span className="text-secondary">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
          </div>
          <p className="text-outline text-sm mt-4">
            Al decodificar la parte roja (Header), vemos que el algoritmo es HS256. La parte azul (Payload) nos revela que el token pertenece al usuario "John Doe". La parte verde es la firma criptográfica.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-l-4 border-secondary pl-4">Casos de Uso más Comunes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-surface-bright border border-outline-variant p-5 rounded-xl">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-primary">
                <Lock className="w-4 h-4" /> Autorización (Autenticación sin estado)
              </h4>
              <p className="text-sm text-outline">
                Es el uso más común. Una vez que el usuario inicia sesión, cada petición posterior incluye el JWT. El servidor verifica la firma y confía en los datos del token sin necesidad de consultar una base de datos de sesiones, haciéndolo ideal para APIs REST y Single Page Applications (SPAs).
              </p>
            </div>
            <div className="bg-surface-bright border border-outline-variant p-5 rounded-xl">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-secondary">
                <Activity className="w-4 h-4" /> Intercambio seguro de información
              </h4>
              <p className="text-sm text-outline">
                Los JWTs son excelentes para transmitir datos de forma segura entre sistemas. Gracias a la firma, el receptor puede estar seguro de que la información provino de la fuente esperada y no fue modificada en tránsito.
              </p>
            </div>
          </div>
        </section>
      </article>

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
