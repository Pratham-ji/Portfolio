import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Splitter } from './index';

describe('Splitter', () => {
  it('renders correctly with aria attributes', () => {
    render(<Splitter orientation="vertical" />);
    const splitter = screen.getByRole('separator');
    expect(splitter).toBeInTheDocument();
    expect(splitter).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('handles keyboard resizing', () => {
    const handleResize = vi.fn();
    render(<Splitter orientation="vertical" onResize={handleResize} />);
    const splitter = screen.getByRole('separator');
    
    splitter.focus();
    fireEvent.keyDown(splitter, { key: 'ArrowRight' });
    expect(handleResize).toHaveBeenCalledWith(1);
    
    fireEvent.keyDown(splitter, { key: 'ArrowLeft' });
    expect(handleResize).toHaveBeenCalledWith(-1);
  });
});
