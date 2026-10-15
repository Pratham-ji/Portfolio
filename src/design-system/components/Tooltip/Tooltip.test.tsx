import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { Tooltip } from './index';

// Mock infrastructure
vi.mock('../../hooks/useLayer', () => ({
  useLayer: vi.fn(() => ({ zIndex: 10000, bringToFront: vi.fn() }))
}));

vi.mock('../../motion/MotionScheduler', () => ({
  MotionScheduler: {
    schedule: vi.fn()
  }
}));

describe('Tooltip', () => {
  it('shows tooltip on hover with no delay', () => {
    render(
      <Tooltip content="Tooltip Content">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover Me');
    fireEvent.mouseEnter(trigger);
    
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip Content">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover Me');
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
    
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });
});
