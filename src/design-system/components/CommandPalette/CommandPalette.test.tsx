import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CommandPalette } from './index';

vi.mock('../../command/useCommandPalette', () => ({
  useCommandPalette: vi.fn(() => ({
    isOpen: true,
    setIsOpen: vi.fn(),
    commands: [{ id: '1', title: 'Test Command' }],
    recentCommands: [],
    pinnedCommands: [],
    executeCommand: vi.fn()
  }))
}));

// Mock Modal to just render children
vi.mock('../Modal', () => ({
  Modal: ({ isOpen, children }: any) => (isOpen ? <div>{children}</div> : null)
}));

describe('CommandPalette', () => {
  it('renders correctly', () => {
    render(<CommandPalette />);
    expect(screen.getByPlaceholderText('Search projects, files, commands...')).toBeInTheDocument();
  });

  it('filters results based on query', () => {
    render(<CommandPalette />);
    const input = screen.getByPlaceholderText('Search projects, files, commands...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(screen.getByText('Test Command')).toBeInTheDocument();
  });

  it('exposes metadata', () => {
    expect(CommandPalette.metadata.since).toBe('2.5.3');
  });
});
