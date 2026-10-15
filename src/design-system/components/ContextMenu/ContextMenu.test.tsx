// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ContextMenu } from './index';

// Mock dependencies
vi.mock('../../hooks/useLayer', () => ({
  useLayer: vi.fn(() => ({ zIndex: 3000, bringToFront: vi.fn() }))
}));

vi.mock('../../hooks/useFocus', () => ({
  useFocus: vi.fn(() => ({
    focus: vi.fn(),
    blur: vi.fn(),
    restorePreviousFocus: vi.fn()
  }))
}));

vi.mock('../../motion/MotionScheduler', () => ({
  MotionScheduler: { schedule: vi.fn() }
}));

describe('ContextMenu', () => {
  const items = [
    { id: '1', label: 'Copy', onClick: vi.fn() },
    'separator' as const,
    { id: '2', label: 'Paste', disabled: true, onClick: vi.fn() }
  ];

  it('renders menu items and separators', () => {
    render(<ContextMenu items={items} x={100} y={100} onClose={vi.fn()} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Paste')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('handles item clicks and closes', () => {
    const handleClose = vi.fn();
    render(<ContextMenu items={items} x={100} y={100} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Copy'));
    expect(items[0].onClick).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });

  it('ignores clicks on disabled items', () => {
    const handleClose = vi.fn();
    render(<ContextMenu items={items} x={100} y={100} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Paste'));
    expect(items[2].onClick).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('closes on Escape key', () => {
    const handleClose = vi.fn();
    render(<ContextMenu items={items} x={100} y={100} onClose={handleClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });
});
