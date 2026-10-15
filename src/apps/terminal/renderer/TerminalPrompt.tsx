import React, { useRef, useState, useEffect } from 'react';
import { TerminalSession } from '../runtime/TerminalSession';
import { TerminalCommands } from '../runtime/TerminalCommands';
import { Cursor } from './Cursor';
import { useTerminalKeyboard } from '../hooks/useTerminalKeyboard';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { TerminalStore } from '../runtime/TerminalStore';
import { SoundEngine } from '../../../design-system/audio/SoundEngine';

export const TerminalPrompt: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = TerminalStore.subscribe(() => {
      setIsProcessing(TerminalStore.getState().isProcessing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handleSimInput = (e: CustomEvent<{ input?: string }>) => {
      if (typeof e.detail?.input === 'string') {
        setInput(e.detail.input);
      }
    };
    window.addEventListener('prathamos:terminal-simulate-input' as any, handleSimInput);
    return () => window.removeEventListener('prathamos:terminal-simulate-input' as any, handleSimInput);
  }, []);

  useTerminalKeyboard(inputRef, input, setInput);
  useAutocomplete(inputRef, input, setInput);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    
    const cmd = input;
    setInput('');
    await TerminalCommands.execute(cmd);
    
    // Defer scroll to bottom to allow virtualizer to catch up
    setTimeout(() => {
      const scrollable = document.getElementById('terminal-viewport-scroll');
      if (scrollable) {
        scrollable.scrollTop = scrollable.scrollHeight;
      }
    }, 50);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const cwd = TerminalSession.getCwdName();
  const displayCwd = cwd === 'pratham' ? '~' : `~/${cwd}`;

  return (
    <div 
      style={{ display: 'flex', fontFamily: 'monospace', fontSize: '13px', lineHeight: '20px', cursor: 'text' }}
      onClick={focusInput}
    >
      <span style={{ color: 'var(--pos-color-success)' }}>{TerminalSession.getUser()}@{TerminalSession.getHost()}</span>
      <span>:</span>
      <span style={{ color: 'var(--pos-accent-interactive)' }}>{displayCwd}</span>
      <span>$ </span>
      
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={() => SoundEngine.playKeyTick()}
          disabled={isProcessing}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'transparent', // We make input transparent and overlay our own text + cursor
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            caretColor: 'transparent',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', color: 'var(--pos-text-primary)' }}>
          {input}
          {!isProcessing && <Cursor />}
        </div>
      </form>
    </div>
  );
};
