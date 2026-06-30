import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowContext } from '../../core/window-manager';
import { HistoryEntry, TerminalContextValue } from './types';
import { useCommandExecutor } from './utils/executor';

export const TerminalApp: React.FC = () => {
  const { activeWindowId, closeWindow } = useWindowContext();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/home/pratham');
  const [inputValue, setInputValue] = useState('');
  
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushHistory = useCallback((entry: Omit<HistoryEntry, 'id'>) => {
    setHistory(prev => [...prev, { ...entry, id: crypto.randomUUID() }]);
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);
  
  const addInputHistory = useCallback((cmd: string) => {
    setInputHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  }, []);

  const closeTerminal = useCallback(() => {
    if (activeWindowId) {
      closeWindow(activeWindowId);
    }
  }, [activeWindowId, closeWindow]);

  const ctx: TerminalContextValue = {
    history, currentPath, inputHistory, 
    pushHistory, clearHistory, setCurrentPath, addInputHistory, closeTerminal
  };

  const { executeCommand } = useCommandExecutor(ctx);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  useEffect(() => {
    // Avoid synchronous setState during render by scheduling
    setTimeout(() => {
      pushHistory({
        type: 'system',
        content: `Welcome to PrathamOS v1.0.0 (Foundry 1.0)\nType 'help' to see a list of available commands.\n`
      });
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleArrowUp = () => {
    if (inputHistory.length > 0) {
      const newIndex = historyIndex < inputHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInputValue(inputHistory[inputHistory.length - 1 - newIndex] || '');
    }
  };

  const handleArrowDown = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInputValue(inputHistory[inputHistory.length - 1 - newIndex] || '');
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearHistory();
    }
  };

  return (
    <div 
      className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-2 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      <div className="flex flex-col gap-1 pb-4">
        {history.map((entry) => (
          <div key={entry.id} className="whitespace-pre-wrap word-break">
            {entry.type === 'input' && <span className="font-semibold text-[#569cd6]">{entry.content}</span>}
            {entry.type === 'output' && <span className="text-[#d4d4d4]">{entry.content}</span>}
            {entry.type === 'error' && <span className="text-[#f44747]">{entry.content}</span>}
            {entry.type === 'system' && <span className="text-[#4ec9b0] italic">{entry.content}</span>}
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <span className="font-semibold text-[#569cd6] mr-2">{currentPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[#d4d4d4] shadow-none"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

export default TerminalApp;
