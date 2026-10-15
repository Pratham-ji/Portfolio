import React, { useEffect } from 'react';
import { TerminalViewport } from './renderer/TerminalViewport';
import { registerAllCommands } from './commands';
import { TerminalSession } from './runtime/TerminalSession';
import { TerminalStore } from './runtime/TerminalStore';

export const TerminalApp: React.FC = () => {
  useEffect(() => {
    registerAllCommands();
    
    // Print initial welcome message
    if (TerminalStore.getState().history.length === 0) {
      TerminalStore.appendHistory([{
        id: crypto.randomUUID(),
        segments: [
          { text: 'PrathamOS Terminal [Version 4.2.0]', color: 'var(--pos-text-secondary)' }
        ]
      }, {
        id: crypto.randomUUID(),
        segments: [
          { text: '(c) Pratham Corporation. All rights reserved.', color: 'var(--pos-text-secondary)' }
        ]
      }, {
        id: crypto.randomUUID(),
        segments: [{ text: '' }] // Blank line
      }, {
        id: crypto.randomUUID(),
        segments: [
          { text: 'Type ', color: 'var(--pos-text-primary)' },
          { text: "'help'", color: 'var(--pos-color-warning)' },
          { text: ' to see available commands.', color: 'var(--pos-text-primary)' }
        ]
      }]);
    }
  }, []);

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--pos-surface-0-dark, #1e1e1e)', // Terminal background
        color: 'var(--pos-text-primary-dark, #ffffff)',
        fontFamily: 'monospace',
        position: 'relative'
      }}
      onClick={() => {
        // If they click the background, try to focus the prompt input
        const inputs = document.querySelectorAll('#terminal-viewport-scroll input');
        if (inputs.length > 0) {
          (inputs[inputs.length - 1] as HTMLInputElement).focus();
        }
      }}
    >
      <TerminalViewport />
    </div>
  );
};
