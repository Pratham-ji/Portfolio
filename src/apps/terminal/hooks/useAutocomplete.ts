import { useEffect } from 'react';
import { TerminalAutocomplete } from '../runtime/TerminalAutocomplete';

export const useAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  inputValue: string,
  setInputValue: (val: string) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault(); // prevent losing focus
        const completion = TerminalAutocomplete.complete(inputValue);
        if (completion) {
          setInputValue(completion);
        }
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
