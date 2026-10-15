import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { ToastContainer, toast } from './index';

// Mock dependencies
vi.mock('../../hooks/useLayer', () => ({
  useLayer: vi.fn(() => ({ zIndex: 9900, bringToFront: vi.fn() }))
}));

vi.mock('../../motion/MotionScheduler', () => ({
  MotionScheduler: { 
    schedule: vi.fn(() => ({ finished: Promise.resolve() })) 
  }
}));

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a toast when toast.show is called', () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.show('Hello World', 'This is a message');
    });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('This is a message')).toBeInTheDocument();
  });

  it('dismisses toast automatically after duration', () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.show('Auto Dismiss', 'Message', 1000);
    });
    
    expect(screen.getByText('Auto Dismiss')).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // It gets removed from the queue
    expect(screen.queryByText('Auto Dismiss')).not.toBeInTheDocument();
  });
});
