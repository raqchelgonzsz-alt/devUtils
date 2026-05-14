import React from 'react';
import { SEO } from '../components/SEO';
import { FileText, BookOpen, Terminal, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const DOCS_ARTICLES = [
  {
    id: 'json-formatting-guide',
    title: 'A Developer\'s Guide to JSON Formatting',
    description: 'Learn the best practices for formatting, validating, and structuring JSON data in your modern web applications.',
    icon: Terminal,
    date: 'May 06, 2026',
    readTime: '4 min read',
    category: 'Guides'
  },
  {
    id: 'graphql-best-practices',
    title: 'GraphQL API Design Best Practices',
    description: 'Discover how to design scalable and maintainable GraphQL schemas, including error handling and performance optimizations.',
    icon: Code,
    date: 'May 07, 2026',
    readTime: '6 min read',
    category: 'API Design'
  },
  {
    id: 'jwt-security-essentials',
    title: 'JWT Security Essentials',
    description: 'Understand the core concepts of JSON Web Tokens (JWT) and how to securely implement authentication in your apps.',
    icon: BookOpen,
    date: 'May 08, 2026',
    readTime: '5 min read',
    category: 'Security'
  },
  {
    id: 'cors-errors-explained',
    title: 'Understanding and Fixing CORS Errors',
    description: 'A comprehensive guide to understanding Cross-Origin Resource Sharing (CORS) and how to resolve common errors in modern web apps.',
    icon: BookOpen,
    date: 'May 09, 2026',
    readTime: '7 min read',
    category: 'Web Dev'
  },
  {
    id: 'base64-encoding-guide',
    title: 'When to Use Base64 Encoding: A Practical Guide',
    description: 'Learn what Base64 encoding actually is, why it exists, and the best use cases for encoding data in web applications.',
    icon: Code,
    date: 'May 10, 2026',
    readTime: '5 min read',
    category: 'Fundamentals'
  },
  {
    id: 'regex-for-developers',
    title: 'Mastering Regex: Common Patterns for Devs',
    description: 'Stop copy-pasting Regex. Learn how to write and understand common regular expressions used for validation and parsing.',
    icon: Terminal,
    date: 'May 11, 2026',
    readTime: '8 min read',
    category: 'Snippets'
  }
];

export const Docs: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "Stoolzen Documentation & Developer Blog",
    "description": "Tutorials, guides, and best practices for developers using JSON, GraphQL, JWT, and other tools.",
    "publisher": {
      "@type": "Organization",
      "name": "Stoolzen",
      "logo": {
        "@type": "ImageObject",
        "url": "https://stoolzen.com/logo.png"
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEO 
        title="Documentation & Blog | Stoolzen Developer Tools"
        description="Explore in-depth tutorials, guides, and best practices on JSON, GraphQL, JWT security, and general web development."
        keywords="developer documentation, programming blog, json guide, graphql best practices, jwt tutorial, stoolzen docs"
        jsonLd={jsonLd}
      />
      
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-4 flex items-center justify-center md:justify-start gap-3">
          <FileText className="w-8 h-8 text-primary" />
          Documentation & Guides
        </h1>
        <p className="text-outline text-lg max-w-2xl">
          Deep dives, tutorials, and practical advice to help you build better software and master our developer tools.
        </p>
      </div>

      <div className="grid gap-6">
        {DOCS_ARTICLES.map((article) => (
          <article 
            key={article.id} 
            className="bg-surface-bright border border-outline-variant rounded-xl p-6 hover:shadow-md transition-all group flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <article.icon className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs font-semibold text-outline mb-2 uppercase tracking-wider">
                <span className="text-primary">{article.category}</span>
                <span>&bull;</span>
                <span>{article.date}</span>
                <span>&bull;</span>
                <span>{article.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                <Link to={`/docs/${article.id}`}>
                  {article.title}
                </Link>
              </h2>
              
              <p className="text-outline mb-4 line-clamp-2">
                {article.description}
              </p>
              
              <Link 
                to={`/docs/${article.id}`}
                className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors"
              >
                Read full article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-surface-container rounded-2xl text-center border border-outline-variant">
        <h3 className="text-2xl font-bold text-on-surface mb-3">More Content Coming Soon</h3>
        <p className="text-outline mb-6">We're constantly working on new guides and tools to improve your development workflow.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
          Return to Tools
        </Link>
      </div>
    </div>
  );
};
