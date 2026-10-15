import { useEffect } from 'react';
import { TerminalStore } from '../runtime/TerminalStore';

export const useClipboard = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      // Extract plain text from selection (React Virtual renders visible only,
      // but native copy will grab what is selected in DOM).
      // A more robust implementation would hook into the selection model, 
      // but native selection + plain text extract is standard.
      const text = selection.toString();
      
      e.clipboardData?.setData('text/plain', text);
      e.preventDefault();
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('copy', handleCopy);
    }
    return () => {
      if (el) el.removeEventListener('copy', handleCopy);
    };
  }, [containerRef]);
};
