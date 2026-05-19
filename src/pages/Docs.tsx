import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { FileText, Shield, Terminal, Code, Search, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const KNOWLEDGE_HUBS = [
  {
    category: 'Data Formats',
    icon: Database,
    hubs: [
      {
        id: 'json',
        title: 'JSON Format & Validation',
        description: 'Master JSON formatting, validation, schema design, and resolve common parsing errors.',
        keywords: ['JSON', 'Parsing', 'Schema', 'SyntaxError']
      }
    ]
  },
  {
    category: 'Security & Auth',
    icon: Shield,
    hubs: [
      {
        id: 'jwt',
        title: 'JWT Authentication',
        description: 'Understand JSON Web Tokens structure, signing algorithms, and security best practices.',
        keywords: ['JWT', 'RS256', 'Payload', 'Security']
      }
    ]
  },
  {
    category: 'Encoding & Strings',
    icon: Code,
    hubs: [
      {
        id: 'base64',
        title: 'Base64 Encoding',
        description: 'Learn how Base64 works, when to use it, and differences from encryption.',
        keywords: ['Base64', 'Encoding', 'Padding']
      },
      {
        id: 'regex',
        title: 'Regular Expressions',
        description: 'Stop copy-pasting Regex. Learn patterns, lookaheads, and performance optimization.',
        keywords: ['Regex', 'Patterns', 'Validation']
      }
    ]
  },
  {
    category: 'Web Development',
    icon: Globe,
    hubs: [
      {
        id: 'api-debugging',
        title: 'API Debugging & CORS',
        description: 'Resolve CORS errors, understand HTTP headers, and debug REST APIs effectively.',
        keywords: ['CORS', 'HTTP', 'REST', 'Debugging']
      }
    ]
  }
];

export const Docs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stoolzen Developer Knowledge Hub",
    "url": "https://stoolzen.com/docs",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://stoolzen.com/docs?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const filteredHubs = KNOWLEDGE_HUBS.map(group => ({
    ...group,
    hubs: group.hubs.filter(hub => 
      hub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      hub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(group => group.hubs.length > 0);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <SEO 
        title="Developer Knowledge Hub | Stoolzen Docs"
        description="Master developer tools, data formats, and web security. In-depth technical guides on JSON, JWT, Regex, Base64, and API debugging."
        keywords="developer documentation, json guide, jwt authentication, base64 encoding, regex tutorial, api debugging, stoolzen docs"
        jsonLd={jsonLd}
      />
      
      {/* Hero Section */}
      <div className="mb-12 text-center bg-surface-bright border border-outline-variant rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-container text-primary mb-6">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-6">
          Developer Knowledge Hub
        </h1>
        <p className="text-outline text-xl max-w-3xl mx-auto mb-8">
          Technical deep-dives, best practices, and interactive examples. Stop guessing and start mastering the core technologies you use every day.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-outline" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-surface border-2 border-outline-variant rounded-xl text-on-surface placeholder-outline focus:ring-0 focus:border-primary transition-colors text-lg"
            placeholder="Search for JSON formatting, JWT security, Regex..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Hubs Grid */}
      <div className="space-y-12">
        {filteredHubs.length > 0 ? (
          filteredHubs.map((group, index) => (
            <div key={index} className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-outline-variant">
                <group.icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-on-surface">{group.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {group.hubs.map((hub) => (
                  <Link 
                    key={hub.id} 
                    to={`/docs/${hub.id}`}
                    className="block group bg-surface-bright border border-outline-variant rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all"
                  >
                    <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
                      {hub.title}
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">&rarr;</span>
                    </h3>
                    <p className="text-outline mb-4 line-clamp-2">
                      {hub.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {hub.keywords.map(keyword => (
                        <span key={keyword} className="px-2 py-1 bg-surface text-outline text-xs font-medium rounded-md border border-outline-variant">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Terminal className="w-12 h-12 text-outline-variant mx-auto mb-4" />
            <h3 className="text-xl font-bold text-on-surface mb-2">No guides found</h3>
            <p className="text-outline">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      <div className="mt-16 p-8 bg-primary-container/30 rounded-2xl text-center border border-primary/20">
        <h3 className="text-2xl font-bold text-on-surface mb-3">Looking for a specific tool?</h3>
        <p className="text-outline mb-6 max-w-2xl mx-auto">
          Our knowledge base is directly integrated with our developer tools. Learn the theory here, then test it live.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
          <Terminal className="w-5 h-5" />
          Open Tools Workspace
        </Link>
      </div>
    </div>
  );
};

