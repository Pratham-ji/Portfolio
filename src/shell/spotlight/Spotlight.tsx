import { useShell } from '../context';
import { useWindowContext } from '../../core/window-manager';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useSpotlightSearch, SearchResult } from './useSpotlightSearch';
import { SearchIcon, FileIcon, AppWindowIcon } from 'lucide-react';

export const Spotlight: React.FC = () => {
  const { state, toggleSpotlight, closeAllOverlays } = useShell();
  const { openWindow } = useWindowContext();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce logic is simplified here; the hook handles memoized filtering
  const results = useSpotlightSearch(query);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSpotlight();
      }
      if (e.key === 'Escape' && state.isSpotlightOpen) {
        closeAllOverlays();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [state.isSpotlightOpen, toggleSpotlight, closeAllOverlays]);

  // Focus input when opened
  useEffect(() => {
    if (state.isSpotlightOpen) {
      setTimeout(() => {
        setQuery('');
        inputRef.current?.focus();
      }, 50);
    }
  }, [state.isSpotlightOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (state.isSpotlightOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeAllOverlays();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isSpotlightOpen, closeAllOverlays]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'app') {
      openWindow(result.data.id, result.data.name);
    } else {
      if (result.data.type === 'directory') {
        openWindow('explorer', result.data.name);
      } else if (result.data.appId) {
        openWindow(result.data.appId, result.data.name);
      } else {
        openWindow('notepad', result.data.name);
      }
    }
    closeAllOverlays();
  };

  return (
    <AnimatePresence>
      {state.isSpotlightOpen && (
        <div className="absolute inset-0 z-[10000] flex justify-center items-start pt-[15vh] bg-black/20 backdrop-blur-sm">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-[var(--theme-surface)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--theme-border)] flex flex-col"
          >
            <div className="flex items-center px-4 py-3 border-b border-[var(--theme-border)] gap-3">
              <SearchIcon size={24} className="text-[var(--theme-text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, files, and more..."
                className="flex-1 bg-transparent border-none outline-none text-xl text-[var(--theme-text)] placeholder-[var(--theme-text-muted)]"
              />
            </div>

            {query && (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {results.map((result) => (
                      <button
                        key={`${result.type}-${result.data.id}`}
                        onClick={() => handleResultClick(result)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--theme-surface-hover)] rounded-lg transition-colors text-left"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-[var(--theme-bg)] rounded-md">
                          {result.type === 'app' ? <AppWindowIcon size={16} /> : <FileIcon size={16} />}
                        </div>
                        <span className="text-[var(--theme-text)] text-sm font-medium">{result.data.name}</span>
                        <span className="text-[var(--theme-text-muted)] text-xs ml-auto uppercase tracking-wider">{result.type}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-[var(--theme-text-muted)]">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
