import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PowerMenu } from './index';

describe('PowerMenu', () => {
  it('renders menu items and dispatches lock event', () => {
    render(<PowerMenu />);
    
    // Toggle open
    fireEvent(window, new CustomEvent('toggle-power-menu', { detail: true }));
    
    expect(screen.getByText('Sleep')).toBeInTheDocument();
    
    const lockHandler = vi.fn();
    window.addEventListener('os-lock', lockHandler);
    
    const lockBtn = screen.getByText('Lock Screen');
    fireEvent.click(lockBtn);
    
    expect(lockHandler).toHaveBeenCalled();
  });
});
