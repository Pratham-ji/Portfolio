// @ts-nocheck
import { useEffect } from 'react';
import { useCommandContext } from './CommandProvider';
import { usePlatform } from '../hooks/usePlatform';

export const useCommandPalette = () => {
  const ctx = useCommandContext();
  const { os } = usePlatform();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = os === 'macos' ? e.metaKey : e.ctrlKey;
      if (isCmd && e.key === 'k') {
        e.preventDefault();
        ctx.setIsOpen(!ctx.isOpen);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [os, ctx.isOpen, ctx.setIsOpen]);

  return ctx;
};
