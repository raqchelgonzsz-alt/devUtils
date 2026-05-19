import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, FileText, Lightbulb, AlertTriangle, CheckCircle, Info, Zap, Shield, Database, Code, Server, Settings, Globe } from 'lucide-react';
import { SEO } from '../components/SEO';

// Reusable custom UI components for the articles
const Callout = ({ title, children, type = 'info' }: { title?: string, children: React.ReactNode, type?: 'info' | 'warning' | 'success' | 'tip' }) => {
  const config = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500', icon: Info, iconColor: 'text-blue-500' },
    warning: { bg: 'bg-red-500/10', border: 'border-red-500', icon: AlertTriangle, iconColor: 'text-red-500' },
    success: { bg: 'bg-green-500/10', border: 'border-green-500', icon: CheckCircle, iconColor: 'text-green-500' },
    tip: { bg: 'bg-primary-container/40', border: 'border-primary', icon: Lightbulb, iconColor: 'text-primary' }
  };
  const { bg, border, icon: Icon, iconColor } = config[type];
  
  return (
    <div className={`my-8 p-6 ${bg} border-l-4 ${border} rounded-r-xl flex gap-4 items-start shadow-sm not-prose`}>
      <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${iconColor}`} />
      <div className="text-on-surface text-base leading-relaxed">
        {title && <h4 className="font-bold text-lg mb-2">{title}</h4>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, children }: { icon: React.ElementType, children: React.ReactNode }) => (
  <h2 className="flex items-center gap-3 mt-12 mb-6 text-2xl font-bold text-on-surface border-b border-outline-variant pb-4">
    <Icon className="w-6 h-6 text-primary" />
    {children}
  </h2>
);

const PILLAR_PAGES: Record<string, { title: string; description: string; date: string; readTime: string; category: string; content: React.ReactNode }> = {
  'json': {
    title: "JSON Format: The Complete Guide for Developers",
    description: "Master JSON formatting, validation, and schema design. Learn to read, parse, and debug JSON data with real-world examples and interactive tools.",
    date: 'May 19, 2026',
    readTime: '8 min read',
    category: 'Data Formats',
    content: (
      <>
        <p className="lead text-xl text-outline mb-8">JavaScript Object Notation (JSON) is the undisputed standard for data exchange on the web. Despite its simplicity, poor JSON structuring is the root cause of countless API failures and performance bottlenecks.</p>
        
        <SectionHeader icon={Database}>The Anatomy of a JSON Payload</SectionHeader>
        <p>JSON is built on two universal structures:</p>
        <ul>
          <li><strong>Objects:</strong> A collection of key/value pairs enclosed in <code>{`{}`}</code>.</li>
          <li><strong>Arrays:</strong> An ordered list of values enclosed in <code>{`[]`}</code>.</li>
        </ul>

        <h3>Allowed Data Types</h3>
        <p>Unlike JavaScript, JSON is strictly typed. You can only use:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 not-prose my-6">
          {['String', 'Number', 'Boolean', 'Null', 'Object', 'Array'].map(type => (
            <div key={type} className="bg-surface-container border border-outline-variant px-4 py-2 rounded-lg text-center font-mono text-sm text-primary">
              {type}
            </div>
          ))}
        </div>

        <SectionHeader icon={AlertTriangle}>Common JSON Formatting Errors</SectionHeader>
        <p>When APIs throw a <code>SyntaxError: Unexpected token</code>, it's usually one of these culprits:</p>

        <h3>1. Trailing Commas</h3>
        <p>JSON does <strong>not</strong> allow a comma after the last element of an object or array.</p>
        <pre><code>{`// ❌ Invalid:
{"name": "Alice", "age": 30,}

// ✅ Valid:
{"name": "Alice", "age": 30}`}</code></pre>

        <h3>2. Single Quotes vs. Double Quotes</h3>
        <p>Keys and string values MUST use double quotes.</p>
        <pre><code>{`// ❌ Invalid:
{'status': 'active'}

// ✅ Valid:
{"status": "active"}`}</code></pre>

        <Callout type="tip" title="Pro Tip: Validate instantly">
          Stop guessing if your JSON is valid. Use the <Link to="/json" className="text-primary font-bold hover:underline">Stoolzen JSON Formatter & Validator</Link> to instantly detect and fix syntax errors with line-by-line debugging.
        </Callout>

        <SectionHeader icon={Code}>Real-World Example: Designing Responses</SectionHeader>
        <p>When building REST APIs, wrap your data in a standardized envelope. This prevents top-level array vulnerabilities and provides metadata context.</p>

        <pre><code>{`{
  "meta": {
    "requestId": "req_8f73b9",
    "timestamp": "2026-05-19T10:38:10Z",
    "status": 200
  },
  "data": {
    "user": {
      "id": "1042",
      "email": "dev@example.com"
    }
  }
}`}</code></pre>

        <Callout type="warning" title="Watch out for Number precision">
          JavaScript numbers are double-precision 64-bit floats. Numbers larger than <code>9007199254740991</code> will lose precision. Always pass large identifiers (like Snowflake IDs) as Strings (e.g. <code>"1042"</code>), not Numbers.
        </Callout>
      </>
    )
  },
  'jwt': {
    title: "JWT Authentication: Security Essentials",
    description: "Understand the core concepts of JSON Web Tokens (JWT) and how to securely implement stateless authentication in your applications.",
    date: 'May 19, 2026',
    readTime: '6 min read',
    category: 'Security',
    content: (
      <>
        <p className="lead text-xl text-outline mb-8">JSON Web Tokens (JWT) are the modern standard for stateless authentication in single-page applications (SPAs) and microservices. However, their simplicity and flexibility often lead to severe security vulnerabilities if implemented incorrectly.</p>

        <SectionHeader icon={Shield}>The Structure of a JWT</SectionHeader>
        <p>A JWT is a string composed of three parts, separated by dots (<code>.</code>): <strong>Header</strong>, <strong>Payload</strong>, and <strong>Signature</strong>.</p>
        
        <pre><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. // Header (Algorithm)
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ. // Payload
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c // Signature`}</code></pre>

        <Callout type="warning" title="JWTs are Encoded, Not Encrypted">
          This is the most common misconception. The Header and Payload are merely <em>Base64Url encoded</em>. Anyone who intercepts the token can decode it and read the contents.
        </Callout>
        
        <Callout type="tip" title="Try it yourself">
          Copy any JWT from your browser's local storage and paste it into the <Link to="/jwt" className="text-primary font-bold hover:underline">Stoolzen JWT Decoder</Link>. You'll instantly see the decoded payload data.
        </Callout>

        <SectionHeader icon={CheckCircle}>Security Best Practices</SectionHeader>
        
        <h3>1. Never Store Sensitive Data</h3>
        <p>Because the payload is readable by anyone, never put passwords, API keys, or sensitive PII inside a JWT.</p>
        <pre><code>{`// ❌ Bad Practice:
{ "id": 101, "role": "admin", "ssn": "000-00-0000" }

// ✅ Good Practice:
{ "sub": "user_101", "role": "admin" }`}</code></pre>

        <h3>2. Keep Tokens Short-Lived</h3>
        <p>Because JWTs are stateless, they cannot be easily revoked before they expire. If an attacker steals a token, they have access until it dies.</p>
        <ul>
          <li><strong>Access Tokens:</strong> Set the <code>exp</code> claim to 15-60 minutes.</li>
          <li><strong>Refresh Tokens:</strong> Use opaque refresh tokens stored securely in HttpOnly cookies.</li>
        </ul>

        <SectionHeader icon={Shield}>The "None" Algorithm Vulnerability</SectionHeader>
        <p>Some JWT libraries historically supported an algorithm of <code>"alg": "none"</code>, allowing tokens to bypass signature validation entirely. An attacker can strip the signature, change the payload, set alg to "none", and gain unauthorized access.</p>
        
        <Callout type="success" title="The Fix">
          Always explicitly specify the expected algorithm when verifying a token on your backend.
        </Callout>
        
        <pre><code>{`// Node.js example using jsonwebtoken
jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
  // Safe verification
});`}</code></pre>
      </>
    )
  },
  'regex': {
    title: "Mastering Regular Expressions: Stop Copy-Pasting",
    description: "Learn how to read, write, and optimize Regex patterns. Covering capture groups, lookarounds, and avoiding catastrophic backtracking (ReDoS).",
    date: 'May 19, 2026',
    readTime: '7 min read',
    category: 'Encoding & Strings',
    content: (
      <>
        <p className="lead text-xl text-outline mb-8">Regular Expressions (Regex) often look like line noise to developers, making it tempting to just copy-paste from StackOverflow. But understanding the core syntax unlocks one of the most powerful text-processing tools in programming.</p>

        <SectionHeader icon={Code}>The Building Blocks</SectionHeader>
        <p>At its core, a Regex is just a sequence of characters that define a search pattern. Here are the essentials:</p>
        <ul>
          <li><strong>Character Classes (<code>\d</code>, <code>\w</code>, <code>\s</code>):</strong> Match digits, word characters, or whitespace.</li>
          <li><strong>Quantifiers (<code>*</code>, <code>+</code>, <code>?</code>, <code>{'{'}n,m{'}'}</code>):</strong> Specify how many times a pattern should occur.</li>
          <li><strong>Anchors (<code>^</code>, <code>$</code>):</strong> Tie the match to the start (<code>^</code>) or end (<code>$</code>) of a string.</li>
        </ul>

        <SectionHeader icon={Database}>Capture Groups vs. Non-Capturing</SectionHeader>
        <p>When you wrap part of a regex in parentheses <code>( )</code>, you create a capture group. This allows you to extract that specific part of the match later in your code.</p>
        <pre><code>{`const dateRegex = /^(\\d{4})-(\\d{2})-(\\d{2})$/;
const match = "2026-05-19".match(dateRegex);
console.log(match[1]); // "2026" (The year)`}</code></pre>
        
        <Callout type="info" title="Performance Tip">
          If you need parentheses just for grouping logic (like <code>(a|b)</code>), but don't want to save the result in memory, use a non-capturing group <code>(?: )</code> for better performance.
        </Callout>

        <SectionHeader icon={AlertTriangle}>ReDoS: Catastrophic Backtracking</SectionHeader>
        <p>A poorly written Regex can crash your server. Regular Expression Denial of Service (ReDoS) happens when an engine uses backtracking to evaluate overlapping groups with quantifiers (like <code>(a+)+$</code>).</p>
        <Callout type="warning">
          An attacker can supply a long, almost-matching string that takes exponential time to evaluate, freezing your Node.js event loop instantly.
        </Callout>
      </>
    )
  },
  'base64': {
    title: "Base64 Encoding Explained",
    description: "Learn how Base64 works, why it inflates file sizes, and the critical differences between encoding, encryption, and hashing.",
    date: 'May 19, 2026',
    readTime: '5 min read',
    category: 'Encoding & Strings',
    content: (
      <>
        <p className="lead text-xl text-outline mb-8">Base64 is everywhere: Data URIs, email attachments, and JWTs. But despite its prevalence, many developers confuse it with encryption. Let's break down what Base64 actually does.</p>

        <SectionHeader icon={Shield}>What is Base64? (And What It Isn't)</SectionHeader>
        <Callout type="warning" title="Base64 is Encoding, NOT Encryption">
          It provides zero security. Anyone can decode a Base64 string instantly. Its sole purpose is to safely transport raw binary data across channels that were designed to only handle text.
        </Callout>

        <SectionHeader icon={Settings}>How It Works Under the Hood</SectionHeader>
        <p>Computers store data in bytes (8 bits). Base64 takes 3 bytes of binary data (24 bits total) and divides them into 4 chunks of 6 bits each.</p>
        <p>Each 6-bit chunk has 64 possible values (2<sup>6</sup> = 64). These values are mapped to a standard ASCII alphabet: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, and <code>/</code>.</p>
        
        <h3>The Cost: 33% Size Inflation</h3>
        <p>Because it takes 4 characters (4 bytes of text) to represent 3 bytes of raw binary, Base64 encoding inflates the size of your data by exactly <strong>33.3%</strong>.</p>

        <Callout type="tip" title="Need to encode a file?">
          Use the <Link to="/base64" className="text-primary font-bold hover:underline">Stoolzen Base64 Tool</Link> to instantly encode text, images, or decode Base64 strings safely in your browser.
        </Callout>
      </>
    )
  },
  'api-debugging': {
    title: "API Debugging & The CORS Guide",
    description: "Stop fighting CORS errors. Understand the Same-Origin Policy, preflight requests, and how to debug REST APIs like a senior engineer.",
    date: 'May 19, 2026',
    readTime: '6 min read',
    category: 'Web Development',
    content: (
      <>
        <p className="lead text-xl text-outline mb-8">Nothing frustrates a frontend developer quite like seeing the dreaded <code>No Access-Control-Allow-Origin header is present</code> error in the browser console. Let's demystify CORS and API debugging.</p>

        <SectionHeader icon={Globe}>The Same-Origin Policy</SectionHeader>
        <p>By default, browsers restrict a script loaded from <code>https://myapp.com</code> from requesting data from <code>https://api.com</code>. This is a crucial security mechanism.</p>
        <p><strong>CORS (Cross-Origin Resource Sharing)</strong> is the mechanism that allows servers to punch a hole in this policy.</p>

        <SectionHeader icon={Server}>How to Fix CORS Errors</SectionHeader>
        <Callout type="info" title="It's a Backend Problem">
          A CORS error is almost always a Backend issue. Your API server must send the correct HTTP headers in its response.
        </Callout>
        
        <pre><code>{`// A standard backend configuration must include:
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization`}</code></pre>

        <SectionHeader icon={Zap}>Preflight Requests (OPTIONS)</SectionHeader>
        <p>If you're making a "complex" request (like a <code>POST</code> with a JSON body), the browser automatically sends a transparent <code>OPTIONS</code> request first to ask the server for permission.</p>
        <p>If your API server doesn't respond to the <code>OPTIONS</code> method with a <code>200 OK</code> and the correct CORS headers, the actual <code>POST</code> request is blocked before it even starts.</p>
      </>
    )
  }
};

export const DocArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? PILLAR_PAGES[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <Navigate to="/docs" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "datePublished": new Date(article.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Stoolzen"
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <SEO 
        title={`${article.title} | Stoolzen Docs`}
        description={article.description}
        keywords={`${article.category.toLowerCase()}, developer guide, stoolzen docs, ${id}`}
        jsonLd={jsonLd}
      />
      
      <Link 
        to="/docs" 
        className="inline-flex items-center text-sm font-bold text-outline hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Knowledge Hub
      </Link>

      <article className="bg-surface-bright border border-outline-variant rounded-2xl p-6 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 text-sm font-medium text-outline mb-8 flex-wrap">
          <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {article.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-8 leading-tight">
          {article.title}
        </h1>

        <div className="prose prose-slate prose-lg dark:prose-invert max-w-none 
          prose-headings:text-on-surface prose-headings:font-bold 
          prose-p:text-on-surface/90 
          prose-a:text-primary hover:prose-a:text-primary-dark prose-a:font-bold
          prose-code:text-primary prose-code:bg-primary-container/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded 
          prose-pre:bg-surface-container prose-pre:border prose-pre:border-outline-variant prose-pre:text-on-surface prose-pre:shadow-sm prose-pre:rounded-xl
          prose-ul:text-on-surface/90 prose-li:marker:text-primary">
          {article.content}
        </div>
      </article>

      {/* Dynamic CTA block based on category/article */}
      <div className="mt-12 text-center bg-primary-container/20 rounded-2xl p-10 border border-primary/20 shadow-sm">
        <h3 className="text-2xl font-bold text-on-surface mb-4">Ready to put this into practice?</h3>
        <p className="text-outline text-lg mb-8 max-w-2xl mx-auto">Test your knowledge with our live developer tools. Formatting, decoding, and parsing made easy.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/json" className="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Open JSON Formatter
          </Link>
          <Link to="/jwt" className="px-6 py-3 bg-surface-bright border-2 border-outline-variant text-on-surface font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
            Open JWT Decoder
          </Link>
        </div>
      </div>
    </div>
  );
};
