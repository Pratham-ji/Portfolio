import React from 'react';
import { ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, GridIcon, ListIcon } from 'lucide-react';

interface BreadcrumbsProps {
  currentPath: string;
  history: string[];
  historyIndex: number;
  viewMode: 'grid' | 'list';
  onNavigate: (path: string) => void;
  onNavigateBack: () => void;
  onNavigateForward: () => void;
  onNavigateUp: () => void;
  onSetViewMode: (mode: 'grid' | 'list') => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPath, history, historyIndex, viewMode, onNavigate, onNavigateBack, onNavigateForward, onNavigateUp, onSetViewMode
}) => {
  const parts = currentPath === '/' ? [] : currentPath.split('/').filter(Boolean);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;
  const canGoUp = currentPath !== '/';

  return (
    <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-black/10">
      <div className="flex items-center gap-1">
        <button aria-label="Go Back" disabled={!canGoBack} onClick={onNavigateBack} className="p-1.5 rounded-md text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent">
          <ArrowLeftIcon size={16} />
        </button>
        <button aria-label="Go Forward" disabled={!canGoForward} onClick={onNavigateForward} className="p-1.5 rounded-md text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent">
          <ArrowRightIcon size={16} />
        </button>
        <button aria-label="Go Up" disabled={!canGoUp} onClick={onNavigateUp} className="p-1.5 rounded-md text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent">
          <ArrowUpIcon size={16} />
        </button>
      </div>

      <div className="flex-1 flex items-center gap-1 bg-black/20 rounded-md px-3 py-1.5 overflow-hidden border border-white/5">
        <button aria-label="Home Directory" onClick={() => onNavigate('/')} className="text-sm text-white/70 hover:text-white flex-shrink-0">
          Root
        </button>
        {parts.map((part, index) => {
          const path = '/' + parts.slice(0, index + 1).join('/');
          return (
            <React.Fragment key={path}>
              <ChevronRightIcon size={14} className="text-white/30 flex-shrink-0" />
              <button aria-label={`Navigate to ${part}`}
                onClick={() => onNavigate(path)}
                className="text-sm text-white/70 hover:text-white truncate"
              >
                {part}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex items-center gap-1 bg-black/20 rounded-md p-0.5 border border-white/5">
        <button aria-label="Reload Directory"
          onClick={() => onSetViewMode('grid')} 
          className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          <GridIcon size={14} />
        </button>
        <button aria-label="Search"
          onClick={() => onSetViewMode('list')} 
          className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          <ListIcon size={14} />
        </button>
      </div>
    </div>
  );
};
