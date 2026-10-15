import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { WindowFrame } from './index';

// Mock the hooks so we can test the behavior
vi.mock('../../hooks/useLayer', () => ({
  useLayer: vi.fn(() => ({
    zIndex: 105,
    bringToFront: vi.fn()
  }))
}));

vi.mock('../../hooks/useFocus', () => ({
  useFocus: vi.fn(() => ({
    focus: vi.fn(),
    blur: vi.fn()
  }))
}));

describe('WindowFrame', () => {
  it('renders with title', () => {
    render(<WindowFrame id="test-1" title="Test App">Content</WindowFrame>);
    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(<WindowFrame id="test-2" onClose={handleClose}>Content</WindowFrame>);
    
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
