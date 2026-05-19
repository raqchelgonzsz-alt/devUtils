import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  LayoutGrid, 
  ChevronRight, 
  Search, 
  GitCompare, 
  ArrowLeftRight, 
  FileSearch, 
  Minimize, 
  Wand2, 
  Lock,
  FileCode,
  Braces
} from 'lucide-react';
import { cn } from '../lib/utils';

interface RelatedItem {
  name: string;
  path: string;
  desc?: string;
  description?: string;
  icon?: React.ElementType;
}

const getIconForTool = (name: string, category: string) => {
  const n = name.toLowerCase();
  if (n.includes('validator') || n.includes('checker')) return Search;
  if (n.includes('diff') || n.includes('compare')) return GitCompare;
  if (n.includes('escape')) return ArrowLeftRight;
  if (n.includes('path') || n.includes('explorer')) return FileSearch;
  if (n.includes('minify') || n.includes('minifier')) return Minimize;
  if (n.includes('formatter') || n.includes('pretty')) return Wand2;
  if (n.includes('jwt') || n.includes('auth')) return Lock;
  if (n.includes('base64')) return FileCode;
  
  // Fallback by category
  if (category === 'json') return Braces;
  if (category === 'graphql') return FileCode;
  return LayoutGrid;
};

interface RelatedContentProps {
  category: string;
  currentPath: string;
  relatedTools: RelatedItem[];
  categories?: RelatedItem[];
  guides?: RelatedItem[];
}

export const RelatedContent: React.FC<RelatedContentProps> = ({ 
  category, 
  currentPath, 
  relatedTools,
  categories = [
    { name: 'JSON Tools', path: '/tools/json' },
    { name: 'API Tools', path: '/tools/api' }
  ],
  guides = [
    { name: 'Guía de Formateo JSON', path: '/docs/json-formatting-guide' },
    { name: 'Mejores Prácticas GraphQL', path: '/docs/graphql-best-practices' }
  ]
}) => {
  return (
    <div className="mt-20 pt-16 border-t border-outline-variant space-y-12">
      {/* 5 Tools Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-on-surface">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Herramientas Relacionadas</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedTools.map((tool) => {
            const Icon = tool.icon || getIconForTool(tool.name, category);
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="group relative bg-surface-bright p-5 rounded-2xl border border-outline-variant transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                    {tool.name}
                  </h4>
                </div>
                <p className="text-[11px] text-outline leading-relaxed line-clamp-2">
                  {tool.description || tool.desc}
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Categories Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-on-surface">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Explorar Categorías</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {categories.slice(0, 2).map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="flex items-center justify-between p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors group"
              >
                <span className="text-sm font-medium text-on-surface">{cat.name}</span>
                <ArrowRight className="w-4 h-4 text-outline group-hover:text-amber-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Guides Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-on-surface">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Guías y Recursos</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {guides.slice(0, 2).map((guide) => (
              <Link
                key={guide.path}
                to={guide.path}
                className="flex items-center justify-between p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors group"
              >
                <span className="text-sm font-medium text-on-surface">{guide.name}</span>
                <ArrowRight className="w-4 h-4 text-outline group-hover:text-emerald-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
