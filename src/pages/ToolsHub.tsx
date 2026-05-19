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
      { name: 'JSON Formatter', description: 'Beautify and validate JSON instantly', path: '/tools/json/formatter', icon: Wand2 },
      { name: 'JSON Validator', description: 'Detect syntax errors in JSON', path: '/tools/json/validator', icon: Search },
      { name: 'JSON Editor', description: 'Editor with syntax highlighting', path: '/tools/json/editor', icon: Code2 },
      { name: 'JSON Minifier', description: 'Compress JSON for production', path: '/tools/json/minify', icon: Minimize },
      { name: 'JSON Pretty Print', description: 'Indent and beautify compressed JSON', path: '/tools/json/pretty-print', icon: AlignLeft },
      { name: 'JSON Viewer', description: 'Interactive tree view', path: '/tools/json/viewer', icon: Layers },
      { name: 'JSON Sorter', description: 'Sort keys alphabetically', path: '/tools/json/sorter', icon: Filter },
      { name: 'JSON Compare', description: 'Compare two JSONs instantly', path: '/tools/json/compare', icon: GitCompare },
      { name: 'JSON Escape', description: 'Escape special characters', path: '/tools/json/escape', icon: Code2 },
      { name: 'JSON Unescape', description: 'Unescape JSON strings', path: '/tools/json/unescape', icon: ArrowLeftRight },
      { name: 'JSONPath Explorer', description: 'Test JSONPath expressions', path: '/tools/json/path-explorer', icon: FileSearch, badge: 'New' },
      { name: 'JSON Diff', description: 'Visualize differences between JSONs', path: '/tools/json/diff', icon: GitCompare, badge: 'New' },
    ],
  },
  {
    id: 'graphql',
    label: 'GraphQL',
    icon: FileCode,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 border-pink-200',
    tools: [
      { name: 'GraphQL Formatter', description: 'Format GraphQL queries', path: '/tools/graphql/formatter', icon: Wand2 },
      { name: 'GraphQL Validator', description: 'Validate query syntax', path: '/tools/graphql/validator', icon: Search },
      { name: 'GraphQL Editor', description: 'Editor with syntax highlighting', path: '/tools/graphql/editor', icon: Code2 },
      { name: 'GraphQL Beautifier', description: 'Beautify GraphQL queries', path: '/tools/graphql/beautifier', icon: AlignLeft },
      { name: 'GraphQL Minifier', description: 'Minify queries for production', path: '/tools/graphql/minifier', icon: Minimize },
      { name: 'GraphQL Viewer', description: 'Visualize schema structure', path: '/tools/graphql/viewer', icon: Layers },
      { name: 'GraphQL Checker', description: 'Check for query errors', path: '/tools/graphql/checker', icon: Search },
      { name: 'GraphQL Parser', description: 'Parse and analyze queries', path: '/tools/graphql/parser', icon: FileSearch },
    ],
  },
  {
    id: 'api',
    label: 'API & Auth',
    icon: Lock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    tools: [
      { name: 'JWT Decoder', description: 'Decode and verify JWT tokens', path: '/tools/api/jwt-decoder', icon: Lock },
      { name: 'OAuth Debugger', description: 'Simulate and debug OAuth2 flows', path: '/tools/api/oauth-debugger', icon: Activity, badge: 'Soon' },
      { name: 'REST Client', description: 'Test HTTP requests online', path: '/tools/api/rest-client', icon: Terminal, badge: 'Soon' },
      { name: 'CURL to Fetch', description: 'Convert CURL commands to JS', path: '/tools/api/curl-converter', icon: Code2, badge: 'Soon' },
    ],
  },
  {
    id: 'text',
    label: 'Text & Encoding',
    icon: Type,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    tools: [
      { name: 'Base64 Encoder', description: 'Encode text to Base64', path: '/tools/text/base64-encoder', icon: Hash },
      { name: 'Base64 Decoder', description: 'Decode Base64 to text', path: '/tools/text/base64-decoder', icon: AlignLeft },
      { name: 'URL Encoder', description: 'Encode URLs for transport', path: '/tools/text/url-encoder', icon: LinkIcon, badge: 'Soon' },
      { name: 'URL Decoder', description: 'Decode URL parameters', path: '/tools/text/url-decoder', icon: ArrowLeftRight, badge: 'Soon' },
      { name: 'Case Converter', description: 'Switch between camelCase, snake_case...', path: '/tools/text/case-converter', icon: Type, badge: 'Soon' },
    ],
  },
  {
    id: 'css',
    label: 'CSS & Design',
    icon: Palette,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    tools: [
      { name: 'CSS Formatter', description: 'Beautify and organize your CSS', path: '/tools/css/formatter', icon: Wand2, badge: 'Soon' },
      { name: 'CSS Minifier', description: 'Compress CSS for production', path: '/tools/css/minifier', icon: Minimize, badge: 'Soon' },
      { name: 'Flexbox Generator', description: 'Create Flexbox layouts visually', path: '/tools/css/flexbox', icon: Layers, badge: 'Soon' },
      { name: 'Grid Generator', description: 'Interactive CSS Grid generator', path: '/tools/css/grid', icon: Palette, badge: 'Soon' },
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
          The <strong>JSON (JavaScript Object Notation)</strong> format has become the undisputed standard for data exchange on the modern web. Its simplicity, readability for both humans and machines, and universal compatibility make it ideal for REST APIs, configuration files, and NoSQL data storage.
        </p>
        <p className="mt-4">
          However, working with raw JSON can be a challenge. API responses often come minified to save bandwidth, making them almost impossible to read. A simple syntax error, like an extra comma or an unclosed brace, can completely halt development.
        </p>
        
        <div className="mt-8 p-6 bg-surface-container rounded-2xl border border-outline-variant">
           <h3 className="text-xl font-bold text-on-surface mb-4">Differences between Formatting, Validating, and Comparing</h3>
           <div className="space-y-4 text-sm">
              <p>
                <strong>Format (Beautify):</strong> Takes a messy or compact JSON string and applies indentation and line breaks so it is human-readable. It does not change the data, only its presentation.
              </p>
              <p>
                <strong>Validate:</strong> Analyzes the JSON structure against the rules of the RFC 8259 standard. Detects common errors like trailing commas, missing quotes on keys, or unbalanced braces.
              </p>
              <p>
                <strong>Compare (Diff):</strong> Identifies semantic changes between two JSON objects. It is vital for detecting differences in API payloads between staging and production environments.
              </p>
           </div>
        </div>

        <p className="mt-8">
          Our suite of <strong>online JSON tools</strong> is designed to solve these problems. Everything is processed locally in your browser to guarantee maximum privacy.
        </p>
      </>
    ),
    useCases: [
      "Debugging minified REST API responses.",
      "Validating configuration files like package.json or tsconfig.json.",
      "Cleaning and organizing data extracted from NoSQL databases.",
      "Converting complex objects into secure strings for transport (Escaping).",
      "Comparing payload versions to detect changes in integrations."
    ],
    faqs: [
      { q: "Is it safe to process my JSON here?", a: "Absolutely. All processing occurs on the client side (your browser). Your data is never sent to our servers or saved in any external database." },
      { q: "Is there a size limit for JSON files?", a: "There is no strict technical limit, but performance depends on your browser's memory. We have tested files up to 10MB without significant issues." },
      { q: "Do your tools comply with the RFC 8259 standard?", a: "Yes, our validators and formatters strictly follow the official JSON standard to ensure compatibility with any system." }
    ]
  },
  graphql: {
    description: (
      <>
        <p>
          <strong>GraphQL</strong> revolutionized the way we consume data by allowing clients to request exactly what they need. While powerful, the query syntax and schema structure can quickly become complex.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="p-5 bg-pink-50/50 border border-pink-100 rounded-2xl">
              <h4 className="font-bold text-pink-700 mb-2">Smart Formatting</h4>
              <p className="text-xs text-pink-800/80 leading-relaxed">
                 Apply Prettier style rules to your queries to maintain a consistent structure of fields and arguments.
              </p>
           </div>
           <div className="p-5 bg-surface-container border border-outline-variant rounded-2xl">
              <h4 className="font-bold text-on-surface mb-2">Schema Validation</h4>
              <p className="text-xs text-outline leading-relaxed">
                 Check the validity of your GraphQL documents before integrating them into your client code.
              </p>
           </div>
        </div>
        <p className="mt-8">
          Our <strong>online GraphQL tools</strong> help you keep your queries clean, valid, and efficient. All without installations and with local processing.
        </p>
      </>
    ),
    useCases: [
      "Formatting queries and mutations for cleaner Git commits.",
      "Quick syntax validation for complex queries.",
      "Minifying queries to reduce request size in production.",
      "Visualizing the structure of objects returned by GraphQL servers."
    ],
    faqs: [
      { q: "Do you support fragments and variables?", a: "Yes, our formatter and validator handle the complete GraphQL syntax, including fragments, variables, directives, and mutations." },
      { q: "Do I need to connect my server to use the tools?", a: "No. These are text and syntax manipulation tools. They do not require an active connection to your GraphQL endpoint." }
    ]
  },
  api: {
    description: (
      <>
        <p>
          Developing <strong>modern APIs</strong> requires a robust set of tools for debugging and security. Handling authentication tokens, inspecting headers, and validating protocols are daily tasks for any backend or frontend developer.
        </p>
        <p className="mt-4">
          In this section, we group critical utilities for working with network protocols and authentication, starting with our powerful <strong>JWT (JSON Web Tokens)</strong> decoder. These tools allow you to inspect payloads, verify signatures, and debug OAuth2 flows without compromising the security of your keys.
        </p>
      </>
    ),
    useCases: [
      "Inspecting payloads and claims in JWT tokens.",
      "Verifying expiration (exp) and issued at (iat) dates of tokens.",
      "Debugging authorization issues in OAuth2 integrations.",
      "Analyzing security headers and authentication structures.",
      "Converting CURL commands to functional code for API requests."
    ],
    faqs: [
      { q: "Are my JWT tokens sent anywhere?", a: "Never. The decoding of the JWT base64 is done entirely in your browser. Your sensitive information remains private." },
      { q: "Can you verify the token signature?", a: "Our decoder displays the signature information and allows you to validate it locally if you provide the secret, guaranteeing that the secret never travels over the network." }
    ]
  },
  text: {
    description: (
      <>
        <p>
          String manipulation and data encoding are fundamental pillars in software development. Whether you need to encode a URL to send it as a parameter, convert a file to <strong>Base64</strong> to embed it in a JSON, or simply change the style of variables between <em>camelCase</em> and <em>snake_case</em>.
        </p>
        <p className="mt-4">
          Our <strong>online text tools</strong> are optimized for speed. They support multiple encoding and decoding formats instantly, helping you transform data without having to write quick scripts or use the terminal.
        </p>
      </>
    ),
    useCases: [
      "Converting images or files to Base64 strings for CSS or JSON.",
      "Encoding and decoding URL parameters to debug webhooks.",
      "Massive transformation of variable names between different conventions (Case Conversion).",
      "Cleaning whitespace and hidden characters in text payloads.",
      "Generating quick hashes for integrity verification."
    ],
    faqs: [
      { q: "What is the difference between Base64 and encryption?", a: "Base64 is an encoding method, not encryption. Its purpose is to represent binary data in ASCII text, not to hide information." },
      { q: "Do you support Unicode characters in URLs?", a: "Yes, our URL decoder correctly handles special characters and emojis following the percent-encoding standard." }
    ]
  },
  css: {
    description: (
      <>
        <p>
          Modern web design relies on clean, efficient, and well-structured <strong>CSS</strong>. With the advent of Flexbox and CSS Grid, layout complexity has increased, making visual code generation tools more valuable than ever.
        </p>
        <p className="mt-4">
          Here you will find everything from formatters that clean your messy CSS to visual generators that allow you to prototype complex layouts in seconds. All tools generate standard code compatible with modern browsers, saving you hours of trial and error in the browser.
        </p>
      </>
    ),
    useCases: [
      "Beautifying minified CSS files to make them easier to read.",
      "Reducing the size of CSS files for production through minification.",
      "Visual generation of complex structures with CSS Grid and Flexbox.",
      "Converting units (px to rem) for modern responsive designs.",
      "Optimizing color palettes and CSS variables (Custom Properties)."
    ],
    faqs: [
      { q: "Is the generated code compatible with all browsers?", a: "Yes, we generate standard CSS that works in all modern browsers. In specific cases, we indicate if browser prefixes are required." },
      { q: "Can I use the minifier for large files?", a: "Our tools are optimized to handle large-scale stylesheets without blocking the user interface." }
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
  
  // SEO Optimization based on user suggestions
  const getPageTitle = () => {
    if (!category) return 'Developer Tools for JSON, API, Regex and Data Transformation | Stoolzen';
    switch (category) {
      case 'json': return 'Free Online JSON Tools - Formatter, Validator & Editor | Stoolzen';
      case 'graphql': return 'Developer Tools for GraphQL - Formatter & Validator | Stoolzen';
      case 'api': return 'Free Online API Tools - JWT Decoder & OAuth Debugger | Stoolzen';
      case 'text': return 'Data Transformation Tools - Base64, URL & Text Encoding | Stoolzen';
      case 'css': return 'Online CSS Tools - Formatter, Minifier & Layout Generators | Stoolzen';
      default: return `${currentCategory?.label} Tools Online | Stoolzen`;
    }
  };

  const getH1 = () => {
    if (!category) return 'Developer Tools for JSON, API, Regex and Data Transformation';
    switch (category) {
      case 'json': return 'Free Online JSON Tools for Data Formatting';
      case 'graphql': return 'Developer Tools for GraphQL and API Schema';
      case 'api': return 'Free Online API Tools and Auth Debugging';
      case 'text': return 'Online Data Transformation and Encoding Tools';
      case 'css': return 'Free Online CSS Tools and Design Utilities';
      default: return `${currentCategory?.label} Tools`;
    }
  };

  const seoTitle = getPageTitle();
  const seoDesc = currentCategory
    ? `Explore all free online ${currentCategory.label} tools from Stoolzen. Formatters, validators, editors and more.`
    : 'The ultimate hub for developer tools. JSON, GraphQL, JWT, CSS, Text and more. Free and no registration required.';

  return (
    <div className="space-y-8">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={`developer tools, dev tools online, ${currentCategory?.label.toLowerCase() ?? 'json graphql jwt css'} tools, stoolzen`}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
          ...(currentCategory ? [{ name: currentCategory.label, item: `/tools/${currentCategory.id}` }] : []),
        ]}
      />

      {/* Hero */}
      <div className="relative py-4">
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-outline">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-primary transition-colors">Tools</Link>
            {currentCategory && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-primary">{currentCategory.label}</span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface leading-tight">
              {getH1()}
            </h1>
            <div className="h-1.5 w-20 bg-primary rounded-full" />
          </div>
          <p className="text-lg text-outline max-w-3xl leading-relaxed font-medium">
            {seoDesc}
          </p>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Search bar */}
      <div className="relative max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
        <input
          type="search"
          placeholder="Search tool..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={cn(
            "w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none transition-all shadow-sm",
            theme === 'dark'
              ? 'bg-surface-container border-outline-variant text-on-surface placeholder:text-outline focus:border-primary/50 focus:ring-4 focus:ring-primary/10'
              : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50'
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
                {cat.tools.length} tools
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map(tool => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={cn(
                    "group relative flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300",
                    "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1",
                    theme === 'dark'
                      ? 'bg-surface-container border-outline-variant hover:border-indigo-500/50 hover:bg-surface-container-high'
                      : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/5'
                  )}
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/5 blur-[80px]" />
                  </div>

                  {tool.badge && (
                    <span className="absolute top-4 right-4 text-[9px] font-black px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-[0.1em] shadow-sm z-10">
                      {tool.badge}
                    </span>
                  )}
                  
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", 
                    cat.bgColor
                  )}>
                    <tool.icon className={cn("w-5 h-5", cat.color)} />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-on-surface group-hover:text-indigo-600 transition-colors tracking-tight">{tool.name}</p>
                    <p className="text-[11px] text-outline mt-1.5 leading-relaxed font-medium group-hover:text-on-surface/70 transition-colors">
                      {tool.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
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
            <h2 className="text-2xl font-bold text-on-surface">Complete Guide to {currentCategory?.label} Tools</h2>
            <div className="text-outline text-lg leading-relaxed space-y-4">
              {CATEGORY_CONTENT[category].description}
            </div>
          </section>

          {/* Use Cases Grid */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-on-surface text-center">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORY_CONTENT[category].useCases.map((useCase, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-surface-container border border-outline-variant flex gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-on-surface font-medium leading-relaxed text-sm">{useCase}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed FAQs */}
          <section className="space-y-8 bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant">
            <h2 className="text-2xl font-bold text-on-surface text-center">Frequently Asked Questions about {currentCategory?.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {CATEGORY_CONTENT[category].faqs.map((faq, idx) => (
                <div key={idx} className="space-y-3 group">
                  <h3 className="text-lg font-bold text-on-surface flex gap-2 group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-black">Q.</span> {faq.q}
                  </h3>
                  <p className="text-outline leading-relaxed pl-7 border-l-2 border-outline-variant group-hover:border-primary/30 transition-colors">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="text-center space-y-6 py-12 bg-indigo-600 rounded-3xl text-white">
            <h2 className="text-3xl font-bold">Ready to improve your workflow?</h2>
            <p className="text-indigo-100 max-w-xl mx-auto">
              Start using our {currentCategory?.label} tools today. No installations, no registrations, totally free.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/docs" 
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all"
              >
                Read Documentation
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
