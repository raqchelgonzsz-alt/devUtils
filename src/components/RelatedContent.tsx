import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, LayoutGrid, Tool } from 'lucide-react';
import { cn } from '../lib/utils';

interface RelatedItem {
  name: string;
  path: string;
  desc?: string;
}

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
    { name: 'Guía Completa JSON', path: '/docs/json-guide' },
    { name: 'Mejores Prácticas API', path: '/docs/api-best-practices' }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {relatedTools
            .filter(t => t.path !== currentPath)
            .slice(0, 5)
            .map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group p-4 rounded-2xl border border-outline-variant bg-surface-container hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-on-surface group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </span>
                  {tool.desc && <span className="text-[11px] text-outline line-clamp-2">{tool.desc}</span>}
                  <div className="mt-2 flex items-center text-[10px] font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    USAR AHORA <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
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
