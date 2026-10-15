import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Modal } from './index';

vi.mock('../../hooks/useLayer', () => ({
  useLayer: vi.fn(() => ({ zIndex: 4000, bringToFront: vi.fn() }))
}));

vi.mock('../../hooks/useFocus', () => ({
  useFocus: vi.fn(() => ({
    focus: vi.fn(),
    restorePreviousFocus: vi.fn()
  }))
}));

vi.mock('../../motion/MotionScheduler', () => ({
  MotionScheduler: { schedule: vi.fn() }
}));

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('closes on Escape', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('exposes metadata', () => {
    expect(Modal.metadata.since).toBe('2.5.3');
  });
});
