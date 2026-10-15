import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { Switch } from './index';

vi.mock('../../motion/MotionScheduler', () => ({
  MotionScheduler: { schedule: vi.fn() }
}));

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch checked={false} onChange={vi.fn()} aria-label="Toggle setting" />);
    const sw = screen.getByRole('switch');
    expect(sw).toBeInTheDocument();
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles on click', () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('toggles on space and enter', () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const sw = screen.getByRole('switch');
    
    fireEvent.keyDown(sw, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(true);

    fireEvent.keyDown(sw, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('exposes metadata', () => {
    expect(Switch.metadata.since).toBe('2.5.3');
  });
});
