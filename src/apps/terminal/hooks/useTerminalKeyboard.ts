import { useEffect } from 'react';
import { TerminalHistory } from '../runtime/TerminalHistory';
import { TerminalStore } from '../runtime/TerminalStore';

export const useTerminalKeyboard = (
  inputRef: React.RefObject<HTMLInputElement>,
  inputValue: string,
  setInputValue: (val: string) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const el = inputRef.current;
      if (!el) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = TerminalHistory.getPrevious();
        if (prev !== null) setInputValue(prev);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = TerminalHistory.getNext(inputValue);
        if (next !== null) setInputValue(next);
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        TerminalStore.clearHistory();
      }
    };

    const el = inputRef.current;
    if (el) {
      el.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (el) el.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef, inputValue, setInputValue]);
};
