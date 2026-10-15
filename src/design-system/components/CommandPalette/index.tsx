import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './CommandPalette.module.css';
import { Modal } from '../Modal';
import { useCommandPalette } from '../../command/useCommandPalette';
import { SearchEngine } from '../../command/SearchEngine';

export interface CommandPaletteProps {
  // Can be controlled externally if needed, but defaults to hooking into useCommandPalette
}

/**
 * <CommandPalette />
 * The Spotlight UI of PrathamOS.
 * Decoupled from search logic, relies on CommandRegistry and useCommandPalette hook.
 */
export const CommandPalette: React.FC<CommandPaletteProps> & { metadata: any } = () => {
  const { 
    isOpen, 
    setIsOpen, 
    commands, 
    recentCommands, 
    pinnedCommands, 
    executeCommand 
  } = useCommandPalette();
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const results = useMemo(() => {
    if (!query) return [];
    return SearchEngine.search(query, commands);
  }, [query, commands]);

  // Display logic: if query, show results. Else, show Pinned + Recent
  const displayItems = query ? results : [...pinnedCommands, ...recentCommands];
  // Deduplicate for display
  const uniqueDisplayItems = Array.from(new Map(displayItems.map(item => [item.id, item])).values());

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Let modal mount first
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (uniqueDisplayItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % uniqueDisplayItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + uniqueDisplayItems.length) % uniqueDisplayItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedCmd = uniqueDisplayItems[selectedIndex];
      if (selectedCmd) {
        executeCommand(selectedCmd.id);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="dialog">
      <div onKeyDown={handleKeyDown}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, files, commands..."
            aria-label="Command palette input"
          />
        </div>
        
        <div className={styles.results} role="listbox">
          {!query && pinnedCommands.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupTitle}>Pinned</div>
            </div>
          )}
          
          {uniqueDisplayItems.map((cmd, idx) => (
            <div
              key={cmd.id}
              className={styles.commandItem}
              role="option"
              aria-selected={idx === selectedIndex}
              onClick={() => executeCommand(cmd.id)}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <div className={styles.commandTitle}>{cmd.title}</div>
              {cmd.shortcut && <div className={styles.shortcut}>{cmd.shortcut}</div>}
            </div>
          ))}

          {query && uniqueDisplayItems.length === 0 && (
            <div style={{ padding: 16, color: 'var(--pos-color-secondary)', textAlign: 'center' }}>
              No results found
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

CommandPalette.metadata = {
  material: "Material 01 via Modal",
  motion: "HERO (or 120ms fade)",
  elevation: 4000,
  accessibility: "AA",
  since: "2.5.3"
};
