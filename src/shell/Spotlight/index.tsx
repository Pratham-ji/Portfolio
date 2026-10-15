import React, { useState, useEffect, useRef } from 'react';
import styles from './Spotlight.module.css';
import { SpotlightEngine, SearchResult } from './SpotlightEngine';

// In a real implementation we would import KeyboardManager and LayerManager
// import { KeyboardManager, LayerManager } from '../../providers';

export const Spotlight: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Meta+K) or Ctrl+K toggle
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Also support legacy Cmd+Space (Meta+Space) toggle
      if (e.metaKey && e.code === 'Space') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      setResults(SpotlightEngine.search(query));
    }
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter') {
      if (results.length > 0) {
        SpotlightEngine.execute(results[selectedIndex]);
        setIsOpen(false);
      }
      e.preventDefault();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => {
      if (e.target === e.currentTarget) setIsOpen(false);
    }}>
      <div className={styles.spotlightContainer} role="dialog" aria-modal="true" aria-label="Spotlight Search">
        <input 
          ref={inputRef}
          className={styles.inputField}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Spotlight Search"
          aria-autocomplete="list"
        />
        
        {results.length > 0 && (
          <div className={styles.resultsContainer} role="listbox">
            {results.map((res, i) => (
              <div 
                key={res.id}
                role="option"
                aria-selected={i === selectedIndex}
                className={`${styles.resultItem} ${i === selectedIndex ? styles.selected : ''}`}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={() => {
                  SpotlightEngine.execute(res);
                  setIsOpen(false);
                }}
              >
                <div className={styles.resultType}>{res.type}</div>
                <div className={styles.resultTitle}>{res.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
