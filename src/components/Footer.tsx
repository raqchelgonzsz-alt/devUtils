import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const jsonLinks = [
    { name: 'JSON Formatter', path: '/json' },
    { name: 'JSON Validator', path: '/json-validator' },
    { name: 'JSON Editor', path: '/json-editor' },
    { name: 'JSON Pretty Print', path: '/json-pretty-print' },
    { name: 'JSON Viewer', path: '/json-viewer' },
    { name: 'JSON Parser', path: '/json-parser' },
    { name: 'JSON Minifier', path: '/json-minifier' },
    { name: 'JSON Reader', path: '/json-reader' },
    { name: 'JSON Stringify', path: '/json-stringify' },
    { name: 'JSON Sorter', path: '/json-sorter' },
  ];

  const graphqlLinks = [
    { name: 'GraphQL Formatter', path: '/graphql' },
    { name: 'GraphQL Validator', path: '/graphql-validator' },
    { name: 'GraphQL Editor', path: '/graphql-editor' },
    { name: 'GraphQL Beautifier', path: '/graphql-beautifier' },
    { name: 'GraphQL Minifier', path: '/graphql-minifier' },
    { name: 'GraphQL Viewer', path: '/graphql-viewer' },
    { name: 'GraphQL Checker', path: '/graphql-checker' },
    { name: 'GraphQL Parser', path: '/graphql-parser' },
  ];

  return (
    <footer className="w-full mt-auto pt-10 pb-8 border-t border-outline-variant text-outline transition-colors">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface">JSON Tools</h3>
          <nav className="flex flex-col gap-2">
            {jsonLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-[11px] hover:text-primary transition-colors">{link.name}</Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface">GraphQL Tools</h3>
          <nav className="flex flex-col gap-2">
            {graphqlLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-[11px] hover:text-primary transition-colors">{link.name}</Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Resources</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/docs" className="text-[11px] hover:text-primary transition-colors">Documentation</Link>
            <Link to="/jwt" className="text-[11px] hover:text-primary transition-colors">JWT Decoder</Link>
            <Link to="/premium" className="text-[11px] hover:text-primary transition-colors">Premium Plans</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Company</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/privacy-policy" className="text-[11px] hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[11px] hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-[11px] hover:text-primary transition-colors">Contact Us</Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant/50">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold">© {new Date().getFullYear()} Stoolzen.com. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] opacity-60">Handcrafted for developers.</span>
        </div>
      </div>
    </footer>
  );
};
