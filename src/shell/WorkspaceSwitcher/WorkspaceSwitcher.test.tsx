import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkspaceSwitcher } from './index';

describe('WorkspaceSwitcher', () => {
  it('opens on Ctrl+ArrowUp', () => {
    render(<WorkspaceSwitcher />);
    
    // Toggle open
    fireEvent.keyDown(window, { ctrlKey: true, key: 'ArrowUp' });
    
    expect(screen.getByLabelText('Workspace Switcher')).toBeInTheDocument();
    expect(screen.getByText('Desktop 1')).toBeInTheDocument();
    expect(screen.getByText('Desktop 2')).toBeInTheDocument();
  });
});
