import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TerminalApp } from '../TerminalApp';

describe('Terminal App', () => {
  it('renders correctly and parses mock boot sequence', () => {
    render(<TerminalApp />);
    
    // Boot message
    expect(screen.getByText(/PrathamOS Terminal/i)).toBeInTheDocument();
    
    // Input prompt
    expect(screen.getByText(/pratham@prathamos/i)).toBeInTheDocument();
  });

  it('can execute echo command', async () => {
    render(<TerminalApp />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'echo hello world' } });
    fireEvent.submit(input.closest('form')!);
    
    const matches = await screen.findAllByText('hello world');
    expect(matches.length).toBeGreaterThan(0);
  });
});
