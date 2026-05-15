import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import {
  FileCode, Code2, Lock, Terminal, Braces, Search, Wand2, Minimize, AlignLeft,
  GitCompare, ArrowLeftRight, FileSearch, Filter, Hash, Type, Palette, Layers,
  ChevronRight, Activity, Link as LinkIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

interface Tool {
  name: string;
  description: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    id: 'json',
    label: 'JSON',
    icon: Braces,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    tools: [
      { name: 'JSON Formatter', description: 'Beautify y valida JSON al instante', path: '/tools/json/formatter', icon: Wand2 },
      { name: 'JSON Validator', description: 'Detecta errores de sintaxis en JSON', path: '/tools/json/validator', icon: Search },
      { name: 'JSON Editor', description: 'Editor con resaltado de sintaxis', path: '/tools/json/editor', icon: Code2 },
      { name: 'JSON Minifier', description: 'Comprime JSON para producción', path: '/tools/json/minify', icon: Minimize },
      { name: 'JSON Pretty Print', description: 'Indenta y embellece JSON comprimido', path: '/tools/json/pretty-print', icon: AlignLeft },
      { name: 'JSON Viewer', description: 'Vista de árbol interactiva', path: '/tools/json/viewer', icon: Layers },
      { name: 'JSON Sorter', description: 'Ordena claves alfabéticamente', path: '/tools/json/sorter', icon: Filter },
      { name: 'JSON Compare', description: 'Compara dos JSONs al instante', path: '/tools/json/compare', icon: GitCompare },
      { name: 'JSON Escape', description: 'Escapa caracteres especiales', path: '/tools/json/escape', icon: Code2 },
      { name: 'JSON Unescape', description: 'Desescapa cadenas JSON', path: '/tools/json/unescape', icon: ArrowLeftRight },
      { name: 'JSONPath Explorer', description: 'Prueba expresiones JSONPath', path: '/tools/json/path-explorer', icon: FileSearch, badge: 'New' },
      { name: 'JSON Diff', description: 'Visualiza diferencias entre JSONs', path: '/tools/json/diff', icon: GitCompare, badge: 'New' },
    ],
  },
  {
    id: 'graphql',
    label: 'GraphQL',
    icon: FileCode,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 border-pink-200',
    tools: [
      { name: 'GraphQL Formatter', description: 'Formatea queries GraphQL', path: '/tools/graphql/formatter', icon: Wand2 },
      { name: 'GraphQL Validator', description: 'Valida sintaxis de queries', path: '/tools/graphql/validator', icon: Search },
      { name: 'GraphQL Editor', description: 'Editor con resaltado de sintaxis', path: '/tools/graphql/editor', icon: Code2 },
      { name: 'GraphQL Beautifier', description: 'Embellece queries GraphQL', path: '/tools/graphql/beautifier', icon: AlignLeft },
      { name: 'GraphQL Minifier', description: 'Minifica queries para producción', path: '/tools/graphql/minifier', icon: Minimize },
      { name: 'GraphQL Viewer', description: 'Visualiza la estructura del schema', path: '/tools/graphql/viewer', icon: Layers },
      { name: 'GraphQL Checker', description: 'Verifica errores en queries', path: '/tools/graphql/checker', icon: Search },
      { name: 'GraphQL Parser', description: 'Parsea y analiza queries', path: '/tools/graphql/parser', icon: FileSearch },
    ],
  },
  {
    id: 'api',
    label: 'API & Auth',
    icon: Lock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    tools: [
      { name: 'JWT Decoder', description: 'Decodifica y verifica tokens JWT', path: '/tools/api/jwt-decoder', icon: Lock },
      { name: 'OAuth Debugger', description: 'Simula y depura flujos OAuth2', path: '/tools/api/oauth-debugger', icon: Activity, badge: 'Soon' },
      { name: 'REST Client', description: 'Prueba peticiones HTTP online', path: '/tools/api/rest-client', icon: Terminal, badge: 'Soon' },
      { name: 'CURL to Fetch', description: 'Convierte comandos CURL a JS', path: '/tools/api/curl-converter', icon: Code2, badge: 'Soon' },
    ],
  },
  {
    id: 'text',
    label: 'Texto & Codificación',
    icon: Type,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    tools: [
      { name: 'Base64 Encoder', description: 'Codifica texto a Base64', path: '/tools/text/base64-encoder', icon: Hash },
      { name: 'Base64 Decoder', description: 'Decodifica Base64 a texto', path: '/tools/text/base64-decoder', icon: AlignLeft },
      { name: 'URL Encoder', description: 'Codifica URLs para transporte', path: '/tools/text/url-encoder', icon: LinkIcon, badge: 'Soon' },
      { name: 'URL Decoder', description: 'Decodifica parámetros de URL', path: '/tools/text/url-decoder', icon: ArrowLeftRight, badge: 'Soon' },
      { name: 'Case Converter', description: 'Cambia entre camelCase, snake_case...', path: '/tools/text/case-converter', icon: Type, badge: 'Soon' },
    ],
  },
  {
    id: 'css',
    label: 'CSS & Diseño',
    icon: Palette,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    tools: [
      { name: 'CSS Formatter', description: 'Embellece y organiza tu CSS', path: '/tools/css/formatter', icon: Wand2, badge: 'Soon' },
      { name: 'CSS Minifier', description: 'Comprime CSS para producción', path: '/tools/css/minifier', icon: Minimize, badge: 'Soon' },
      { name: 'Flexbox Generator', description: 'Crea layouts Flexbox visualmente', path: '/tools/css/flexbox', icon: Layers, badge: 'Soon' },
      { name: 'Grid Generator', description: 'Generador de CSS Grid interactivo', path: '/tools/css/grid', icon: Palette, badge: 'Soon' },
    ],
  },
];

interface ToolsHubProps {
  category?: string;
}

const CATEGORY_CONTENT: Record<string, { description: React.ReactNode; useCases: string[]; faqs: { q: string; a: string }[] }> = {
  json: {
    description: (
      <>
        <p>
          El formato <strong>JSON (JavaScript Object Notation)</strong> se ha convertido en el estándar indiscutible para el intercambio de datos en la web moderna. Su simplicidad, legibilidad tanto para humanos como para máquinas, y su compatibilidad universal lo hacen ideal para APIs REST, archivos de configuración y almacenamiento de datos NoSQL.
        </p>
        <p className="mt-4">
          Sin embargo, trabajar con JSON crudo puede ser un desafío. Las respuestas de las APIs a menudo vienen minificadas para ahorrar ancho de banda, lo que las hace casi imposibles de leer. Un simple error de sintaxis, como una coma de más o una llave mal cerrada, puede detener por completo el desarrollo.
        </p>
        <p className="mt-4">
          Nuestra suite de <strong>herramientas JSON online</strong> está diseñada para solventar estos problemas. Desde formateadores que devuelven la estructura jerárquica a tus datos, hasta validadores que señalan errores exactos, y exploradores de JSONPath para consultas complejas. Todo procesado localmente en tu navegador para garantizar la máxima privacidad.
        </p>
      </>
    ),
    useCases: [
      "Depuración de respuestas de APIs REST minificadas.",
      "Validación de archivos de configuración como package.json o tsconfig.json.",
      "Limpieza y ordenación de datos extraídos de bases de datos NoSQL.",
      "Conversión de objetos complejos a cadenas seguras para transporte (Escaping).",
      "Comparación de versiones de payloads para detectar cambios en integraciones."
    ],
    faqs: [
      { q: "¿Es seguro procesar mi JSON aquí?", a: "Absolutamente. Todo el procesamiento ocurre en el lado del cliente (tu navegador). Tus datos nunca se envían a nuestros servidores ni se guardan en ninguna base de datos externa." },
      { q: "¿Hay un límite de tamaño para los archivos JSON?", a: "No hay un límite técnico estricto, pero el rendimiento depende de la memoria de tu navegador. Hemos probado archivos de hasta 10MB sin problemas significativos." },
      { q: "¿Vuestras herramientas cumplen con el estándar RFC 8259?", a: "Sí, nuestros validadores y formateadores siguen estrictamente el estándar oficial de JSON para asegurar la compatibilidad con cualquier sistema." }
    ]
  },
  graphql: {
    description: (
      <>
        <p>
          <strong>GraphQL</strong> revolucionó la forma en que consumimos datos al permitir que los clientes soliciten exactamente lo que necesitan. Aunque es potente, la sintaxis de las consultas y la estructura de los esquemas pueden volverse complejas rápidamente.
        </p>
        <p className="mt-4">
          Nuestras <strong>herramientas GraphQL online</strong> te ayudan a mantener tus queries limpias, válidas y eficientes. Ya sea que necesites formatear una consulta larga para mejorar la legibilidad del código o validar la sintaxis antes de enviarla a tu servidor Apollo o Relay.
        </p>
      </>
    ),
    useCases: [
      "Formateo de queries y mutaciones para commits de Git más limpios.",
      "Validación rápida de sintaxis de consultas complejas.",
      "Minificación de queries para reducir el tamaño de las peticiones en producción.",
      "Visualización de la estructura de objetos devueltos por servidores GraphQL."
    ],
    faqs: [
      { q: "¿Soportáis fragmentos y variables?", a: "Sí, nuestro formateador y validador maneja la sintaxis completa de GraphQL, incluyendo fragments, variables, directivas y mutaciones." },
      { q: "¿Necesito conectar mi servidor para usar las herramientas?", a: "No. Estas son herramientas de manipulación de texto y sintaxis. No requieren una conexión activa con tu endpoint de GraphQL." }
    ]
  },
  api: {
    description: (
      <>
        <p>
          El desarrollo de <strong>APIs modernas</strong> requiere un conjunto de herramientas robustas para la depuración y la seguridad. El manejo de tokens de autenticación, la inspección de cabeceras y la validación de protocolos son tareas diarias para cualquier desarrollador backend o frontend.
        </p>
        <p className="mt-4">
          En esta sección, agrupamos utilidades críticas para el trabajo con protocolos de red y autenticación, empezando por nuestro potente decodificador de <strong>JWT (JSON Web Tokens)</strong>. Estas herramientas te permiten inspeccionar payloads, verificar firmas y depurar flujos OAuth2 sin comprometer la seguridad de tus claves.
        </p>
      </>
    ),
    useCases: [
      "Inspección de payloads y claims en tokens JWT.",
      "Verificación de fechas de expiración (exp) y emisión (iat) de tokens.",
      "Depuración de problemas de autorización en integraciones OAuth2.",
      "Análisis de cabeceras de seguridad y estructuras de autenticación.",
      "Conversión de comandos CURL a código funcional para peticiones API."
    ],
    faqs: [
      { q: "¿Se envían mis tokens JWT a algún sitio?", a: "Nunca. La decodificación de la base64 del JWT se hace íntegramente en tu navegador. Tu información sensible permanece privada." },
      { q: "¿Podéis verificar la firma del token?", a: "Nuestro decodificador muestra la información de la firma y permite validarla localmente si proporcionas el secreto, garantizando que el secreto nunca viaje por la red." }
    ]
  },
  text: {
    description: (
      <>
        <p>
          La manipulación de cadenas de texto y la codificación de datos son pilares fundamentales en el desarrollo de software. Ya sea que necesites codificar una URL para enviarla como parámetro, convertir un archivo a <strong>Base64</strong> para embeberlo en un JSON, o simplemente cambiar el estilo de las variables entre <em>camelCase</em> y <em>snake_case</em>.
        </p>
        <p className="mt-4">
          Nuestras <strong>herramientas de texto online</strong> están optimizadas para la velocidad. Soporta múltiples formatos de codificación y decodificación al instante, ayudándote a transformar datos sin tener que escribir scripts rápidos o usar la terminal.
        </p>
      </>
    ),
    useCases: [
      "Conversión de imágenes o archivos a strings Base64 para CSS o JSON.",
      "Codificación y decodificación de parámetros URL para depurar webhooks.",
      "Transformación masiva de nombres de variables entre diferentes convenciones (Case Conversion).",
      "Limpieza de espacios en blanco y caracteres ocultos en payloads de texto.",
      "Generación de hashes rápidos para verificación de integridad."
    ],
    faqs: [
      { q: "¿Qué diferencia hay entre Base64 y encriptación?", a: "Base64 es un método de codificación, no de encriptación. Su objetivo es representar datos binarios en texto ASCII, no ocultar la información." },
      { q: "¿Soportáis caracteres Unicode en las URLs?", a: "Sí, nuestro decodificador de URL maneja correctamente caracteres especiales y emojis siguiendo el estándar de codificación por porcentaje." }
    ]
  },
  css: {
    description: (
      <>
        <p>
          El diseño web moderno depende de un <strong>CSS</strong> limpio, eficiente y bien estructurado. Con la llegada de Flexbox y CSS Grid, la complejidad de los layouts ha aumentado, haciendo que herramientas visuales de generación de código sean más valiosas que nunca.
        </p>
        <p className="mt-4">
          Aquí encontrarás desde formateadores que limpian tu CSS sucio hasta generadores visuales que te permiten prototipar layouts complejos en segundos. Todas las herramientas generan código estándar compatible con los navegadores modernos, ahorrándote horas de prueba y error en el navegador.
        </p>
      </>
    ),
    useCases: [
      "Embellecimiento de archivos CSS minificados para facilitar su lectura.",
      "Reducción del tamaño de archivos CSS para producción mediante minificación.",
      "Generación visual de estructuras complejas con CSS Grid y Flexbox.",
      "Conversión de unidades (px to rem) para diseños responsivos modernos.",
      "Optimización de paletas de colores y variables CSS (Custom Properties)."
    ],
    faqs: [
      { q: "¿El código generado es compatible con todos los navegadores?", a: "Sí, generamos CSS estándar que funciona en todos los navegadores modernos. En casos específicos, indicamos si se requieren prefijos de navegador." },
      { q: "¿Puedo usar el minificador para archivos de gran tamaño?", a: "Nuestras herramientas están optimizadas para manejar hojas de estilo de gran escala sin bloquear la interfaz del usuario." }
    ]
  }
};

export const ToolsHub: React.FC<ToolsHubProps> = ({ category }) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  const filteredCategories = CATEGORIES
    .filter(cat => !category || cat.id === category)
    .map(cat => ({
      ...cat,
      tools: cat.tools.filter(tool =>
        !search || tool.name.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.tools.length > 0);

  const currentCategory = category ? CATEGORIES.find(c => c.id === category) : null;
  const seoTitle = currentCategory
    ? `Herramientas ${currentCategory.label} Online Gratis | Stoolzen`
    : 'Todas las Herramientas para Desarrolladores | Stoolzen';
  const seoDesc = currentCategory
    ? `Explora todas las herramientas ${currentCategory.label} online gratuitas de Stoolzen. Formateadores, validadores, editores y más.`
    : 'El hub definitivo de herramientas para desarrolladores. JSON, GraphQL, JWT, CSS, Texto y más. Gratuito y sin registro.';

  return (
    <div className="space-y-8">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={`herramientas desarrolladores, dev tools online, ${currentCategory?.label.toLowerCase() ?? 'json graphql jwt css'} tools, stoolzen`}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
          ...(currentCategory ? [{ name: currentCategory.label, item: `/tools/${currentCategory.id}` }] : []),
        ]}
      />

      {/* Hero */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-outline">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/tools" className="hover:text-primary transition-colors">Tools</Link>
          {currentCategory && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-on-surface font-medium">{currentCategory.label}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">
          {currentCategory ? `Herramientas ${currentCategory.label}` : 'Todas las Herramientas'}
        </h1>
        <p className="text-outline max-w-2xl">
          {seoDesc}
        </p>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="search"
          placeholder="Buscar herramienta..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={cn(
            "w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
            theme === 'dark'
              ? 'bg-surface-container border-outline-variant text-on-surface placeholder:text-outline'
              : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400'
          )}
        />
      </div>

      {/* Category tabs (only shown on /tools) */}
      {!category && (
        <div className="flex flex-wrap gap-2">
          <Link
            to="/tools"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white"
          >
            All
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/tools/${cat.id}`}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all hover:opacity-90",
                cat.bgColor, cat.color
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}

      {/* Tool grids per category */}
      <div className="space-y-10">
        {filteredCategories.map(cat => (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-2 rounded-lg border", cat.bgColor)}>
                <cat.icon className={cn("w-4 h-4", cat.color)} />
              </div>
              <h2 id={`cat-${cat.id}`} className="text-lg font-bold text-on-surface">{cat.label} Tools</h2>
              <span className="text-xs text-outline bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant">
                {cat.tools.length} herramientas
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {cat.tools.map(tool => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={cn(
                    "group relative flex flex-col gap-2 p-4 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5",
                    theme === 'dark'
                      ? 'bg-surface-container border-outline-variant hover:border-indigo-500'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  )}
                >
                  {tool.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  )}
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border", cat.bgColor)}>
                    <tool.icon className={cn("w-4 h-4", cat.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface group-hover:text-indigo-600 transition-colors">{tool.name}</p>
                    <p className="text-xs text-outline mt-0.5 leading-relaxed">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Rich Category SEO Content */}
      {category && CATEGORY_CONTENT[category] && (
        <div className="mt-20 pt-16 border-t border-outline-variant space-y-16 pb-12">
          {/* Main Description */}
          <section className="max-w-4xl space-y-6">
            <h2 className="text-2xl font-bold text-on-surface">Guía Completa de Herramientas {currentCategory?.label}</h2>
            <div className="text-outline text-lg leading-relaxed space-y-4">
              {CATEGORY_CONTENT[category].description}
            </div>
          </section>

          {/* Use Cases Grid */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-on-surface text-center">Casos de Uso Comunes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORY_CONTENT[category].useCases.map((useCase, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-surface-container border border-outline-variant flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-on-surface font-medium leading-relaxed">{useCase}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed FAQs */}
          <section className="space-y-8 bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant">
            <h2 className="text-2xl font-bold text-on-surface text-center">Preguntas Frecuentes sobre {currentCategory?.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {CATEGORY_CONTENT[category].faqs.map((faq, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface flex gap-2">
                    <span className="text-indigo-500">Q:</span> {faq.q}
                  </h3>
                  <p className="text-outline leading-relaxed pl-7 border-l-2 border-indigo-100 italic">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="text-center space-y-6 py-12 bg-indigo-600 rounded-3xl text-white">
            <h2 className="text-3xl font-bold">¿Listo para mejorar tu flujo de trabajo?</h2>
            <p className="text-indigo-100 max-w-xl mx-auto">
              Empieza a usar nuestras herramientas {currentCategory?.label} hoy mismo. Sin instalaciones, sin registros, totalmente gratis.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/docs" 
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all"
              >
                Leer Documentación
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
