import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

const ARTICLES: Record<string, { title: string; description: string; date: string; readTime: string; category: string; content: React.ReactNode }> = {
  'json-formatting-guide': {
    title: "A Developer's Guide to JSON Formatting",
    description: "Learn the best practices for formatting, validating, and structuring JSON data in your modern web applications.",
    date: 'May 06, 2026',
    readTime: '4 min read',
    category: 'Guides',
    content: (
      <>
        <p>JSON (JavaScript Object Notation) has become the de facto standard for data exchange on the web. Despite its simplicity, poor JSON structuring can lead to bloated payloads, difficult maintenance, and parsing errors.</p>
        
        <h2>1. Keep It Simple and Flat</h2>
        <p>While JSON supports deep nesting, keeping your data structures as flat as possible improves readability and parsing speed. Deeply nested objects often require complex recursive functions to traverse and can cause memory issues in constrained environments.</p>
        
        <h2>2. Use Consistent Naming Conventions</h2>
        <p>Stick to a single naming convention throughout your API. The most common standards are <code>camelCase</code> (preferred in JavaScript/TypeScript environments) and <code>snake_case</code> (popular in Python/Ruby ecosystems).</p>
        <pre><code>{`// Good
{ "userId": 123, "firstName": "Jane" }

// Bad (Mixed conventions)
{ "user_id": 123, "FirstName": "Jane" }`}</code></pre>
        
        <h2>3. Always Validate Payload</h2>
        <p>Never trust incoming JSON data. Use schema validation libraries like Zod, Joi, or JSON Schema to ensure the data matches your expected format before processing it.</p>
        
        <h2>4. Proper Formatting for Debugging</h2>
        <p>Minified JSON is great for production payloads, but during development, you should always format your JSON. Use tools like the <strong>Stoolzen JSON Formatter</strong> to quickly beautify, validate, and inspect your JSON strings.</p>
      </>
    )
  },
  'graphql-best-practices': {
    title: "GraphQL API Design Best Practices",
    description: "Discover how to design scalable and maintainable GraphQL schemas, including error handling and performance optimizations.",
    date: 'May 07, 2026',
    readTime: '6 min read',
    category: 'API Design',
    content: (
      <>
        <p>GraphQL offers immense flexibility for clients, but that flexibility comes with server-side responsibilities. Designing a great schema requires thought and adherence to best practices.</p>

        <h2>1. Design for the Client, Not the Database</h2>
        <p>Your GraphQL schema should not be a 1:1 mapping of your database tables. Design your schema based on how the UI and clients consume the data. Use custom resolvers to bridge the gap between your ideal client API and your underlying database schema.</p>

        <h2>2. Use Pagination from Day One</h2>
        <p>Any field that returns a list should support pagination. Relay's Connection specification (using <code>edges</code>, <code>node</code>, and <code>pageInfo</code>) is the industry standard. Even if a list seems small now, it will likely grow in the future.</p>

        <h2>3. Handle Errors Gracefully</h2>
        <p>GraphQL always returns a 200 OK HTTP status, even if there are errors. Use the <code>errors</code> array in the response properly. For user-facing errors (like validation failures), consider returning them as part of the schema payload instead of top-level GraphQL errors.</p>

        <h2>4. Prevent Malicious Queries</h2>
        <p>Because clients dictate what they request, a malicious user could craft a deeply nested query to perform a Denial of Service (DoS) attack. Implement query depth limiting and query complexity analysis to protect your servers.</p>
      </>
    )
  },
  'jwt-security-essentials': {
    title: "JWT Security Essentials",
    description: "Understand the core concepts of JSON Web Tokens (JWT) and how to securely implement authentication in your apps.",
    date: 'May 08, 2026',
    readTime: '5 min read',
    category: 'Security',
    content: (
      <>
        <p>JSON Web Tokens (JWT) are widely used for stateless authentication. However, their simplicity often leads to security vulnerabilities if not implemented correctly.</p>

        <h2>1. Keep Secrets Secret</h2>
        <p>The signing key (secret) is the only thing preventing users from forging their own tokens. Use strong, long, and randomly generated secrets. Never hardcode them in your application; use environment variables.</p>

        <h2>2. Don't Store Sensitive Data in the Payload</h2>
        <p>A JWT is signed, not encrypted. Anyone who intercepts the token can decode it (using tools like the <strong>Stoolzen JWT Decoder</strong>) and read the payload. Only store non-sensitive identifiers like User IDs and Roles.</p>

        <h2>3. Set a Short Expiration Time</h2>
        <p>Stateless tokens cannot be easily invalidated. To mitigate the risk of a stolen token, set a short <code>exp</code> (expiration) time—typically 15 to 60 minutes. Use Refresh Tokens to obtain new JWTs without requiring the user to log in again.</p>

        <h2>4. Use Appropriate Algorithms</h2>
        <p>Use strong algorithms like <code>RS256</code> (RSA Signature with SHA-256) instead of <code>HS256</code> if your system is distributed and different services need to verify the token without knowing the private key.</p>
      </>
    )
  },
  'cors-errors-explained': {
    title: "Understanding and Fixing CORS Errors",
    description: "A comprehensive guide to understanding Cross-Origin Resource Sharing (CORS) and how to resolve common errors in modern web apps.",
    date: 'May 09, 2026',
    readTime: '7 min read',
    category: 'Web Dev',
    content: (
      <>
        <p>If you're a frontend developer, you've likely seen it: the dreaded red text in your console complaining about "No Access-Control-Allow-Origin header is present on the requested resource". Let's break down why this happens and how to fix it.</p>

        <h2>What is CORS?</h2>
        <p>CORS (Cross-Origin Resource Sharing) is a browser security mechanism. By default, browsers restrict scripts from reading data from a different domain than the one that served the script. This is known as the <strong>Same-Origin Policy</strong>.</p>
        <p>CORS is the mechanism that allows servers to tell the browser: "It's okay, I allow requests from that specific domain."</p>

        <h2>Common Causes of CORS Errors</h2>
        <ul>
          <li><strong>Development vs Production:</strong> Your local app runs on <code>localhost:3000</code>, but your API is on <code>api.example.com</code>. The browser blocks the request.</li>
          <li><strong>Missing Headers:</strong> The backend server genuinely isn't sending the <code>Access-Control-Allow-Origin</code> header.</li>
          <li><strong>Preflight Failures:</strong> For complex requests (like PUT, DELETE, or requests with custom headers), the browser sends an <code>OPTIONS</code> preflight request first. If the server doesn't respond correctly to <code>OPTIONS</code>, the actual request fails.</li>
        </ul>

        <h2>How to Fix CORS Errors</h2>
        <p><strong>1. Fix it on the Backend (The Right Way):</strong> The API server needs to be configured to allow your frontend's domain. If you control the backend, configure your CORS middleware to accept your frontend's URL.</p>
        <p><strong>2. Local Proxy (The Dev Way):</strong> If you're building a React/Vite app, use a proxy in your <code>vite.config.ts</code> or <code>webpack.config.js</code> to trick the browser into thinking the request is going to the same domain.</p>
        <p><strong>3. Never Use "No-CORS" Extensions in Production:</strong> Browser extensions that disable CORS are for temporary debugging only. Your real users won't have them installed!</p>
      </>
    )
  },
  'base64-encoding-guide': {
    title: "When to Use Base64 Encoding: A Practical Guide",
    description: "Learn what Base64 encoding actually is, why it exists, and the best use cases for encoding data in web applications.",
    date: 'May 10, 2026',
    readTime: '5 min read',
    category: 'Fundamentals',
    content: (
      <>
        <p>Base64 is everywhere in web development. You see it in data URIs, in JWT tokens (which you can decode using our <strong>JWT Decoder</strong>), and in email attachments. But what exactly is it?</p>

        <h2>It's Encoding, Not Encryption</h2>
        <p>The most important thing to know: Base64 is not encryption. It provides zero security. Anyone can decode a Base64 string instantly. Its purpose is to safely transmit binary data across channels that only reliably support text.</p>

        <h2>How It Works</h2>
        <p>Base64 takes 3 bytes of binary data (24 bits) and splits them into 4 chunks of 6 bits. Each 6-bit chunk maps to one of 64 standard ASCII characters (A-Z, a-z, 0-9, +, and /). This guarantees that the resulting string contains no control characters that might break a text parser.</p>

        <h2>Best Use Cases</h2>
        <ul>
          <li><strong>Data URIs:</strong> Embedding small images directly in CSS or HTML (e.g., <code>data:image/png;base64,...</code>) to save an HTTP request.</li>
          <li><strong>JSON Payloads:</strong> JSON cannot store raw binary data. If you need to send a file via a JSON API, encoding it to Base64 is the standard approach.</li>
          <li><strong>JWTs:</strong> JSON Web Tokens use Base64Url encoding (a web-safe variant) so the token can be passed safely in URLs and HTTP headers.</li>
        </ul>

        <h2>The Drawback: Size</h2>
        <p>Because it uses 4 bytes to represent 3 bytes of data, Base64 encoding increases file size by roughly <strong>33%</strong>. For large files (like high-res images or videos), this overhead is significant and you should use multipart form uploads instead.</p>
      </>
    )
  },
  'regex-for-developers': {
    title: "Mastering Regex: Common Patterns for Devs",
    description: "Stop copy-pasting Regex. Learn how to write and understand common regular expressions used for validation and parsing.",
    date: 'May 11, 2026',
    readTime: '8 min read',
    category: 'Snippets',
    content: (
      <>
        <p>Regular Expressions (Regex) look like line noise to beginners, but they are incredibly powerful tools for string manipulation and validation. Here are a few patterns every developer should understand.</p>

        <h2>1. Validating an Email Address</h2>
        <p>While a perfectly compliant RFC email regex is pages long, a practical and widely used pattern looks like this:</p>
        <pre><code>{`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`}</code></pre>
        <p><strong>How it works:</strong> It ensures there is some text that isn't a space or @ symbol, followed by an @, followed by more valid text, a dot, and a final domain suffix.</p>

        <h2>2. Password Strength Requirements</h2>
        <p>Want to enforce a password with at least one uppercase letter, one lowercase letter, one number, and at least 8 characters?</p>
        <pre><code>{`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/`}</code></pre>
        <p><strong>How it works:</strong> This uses <em>Positive Lookaheads</em> (<code>?=</code>) to assert that the string contains the required character types anywhere before matching the whole string length.</p>

        <h2>3. Extracting Bearer Tokens</h2>
        <p>Often you need to extract the token string from an Authorization header:</p>
        <pre><code>{`/^Bearer\s+(.*)$/i`}</code></pre>
        <p><strong>How it works:</strong> It looks for the word "Bearer" (case insensitive due to the <code>i</code> flag), followed by whitespace, and captures everything after it into a capture group <code>(.*)</code>.</p>
        
        <p>Once you extract your token, you can always paste it into our <strong>JWT Decoder</strong> tool to inspect its contents!</p>
      </>
    )
  }
};

export const DocArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? ARTICLES[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <Navigate to="/docs" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "datePublished": new Date(article.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Stoolzen"
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <SEO 
        title={`${article.title} | Stoolzen Docs`}
        description={article.description}
        keywords={`${article.category.toLowerCase()}, developer guide, stoolzen blog`}
        jsonLd={jsonLd}
      />
      
      <Link 
        to="/docs" 
        className="inline-flex items-center text-sm font-bold text-outline hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to all guides
      </Link>

      <article className="bg-surface-bright border border-outline-variant rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="flex items-center gap-4 text-sm font-medium text-outline mb-6 flex-wrap">
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

        <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-6 leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-outline mb-10 leading-relaxed font-medium">
          {article.description}
        </p>

        <div className="prose prose-slate prose-lg dark:prose-invert max-w-none prose-headings:text-on-surface prose-headings:font-bold prose-p:text-on-surface prose-a:text-primary hover:prose-a:text-primary-dark prose-code:text-primary prose-code:bg-primary-container prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface-container prose-pre:border prose-pre:border-outline-variant prose-pre:text-on-surface">
          {article.content}
        </div>
      </article>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-on-surface mb-6">Need the right tool for the job?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/json" className="px-6 py-3 bg-surface-bright border border-outline-variant text-on-surface font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
            JSON Formatter
          </Link>
          <Link to="/graphql" className="px-6 py-3 bg-surface-bright border border-outline-variant text-on-surface font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
            GraphQL Formatter
          </Link>
          <Link to="/jwt" className="px-6 py-3 bg-surface-bright border border-outline-variant text-on-surface font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
            JWT Decoder
          </Link>
        </div>
      </div>
    </div>
  );
};
