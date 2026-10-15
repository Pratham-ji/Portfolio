import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Sidebar } from './index';

vi.mock('../../hooks/usePlatform', () => ({
  usePlatform: vi.fn(() => ({ os: 'macos' }))
}));

vi.mock('../../motion/MotionScheduler', () => ({
  MotionScheduler: { schedule: vi.fn() }
}));

describe('Sidebar', () => {
  it('renders correctly with default props', () => {
    render(<Sidebar>Content</Sidebar>);
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('exposes metadata', () => {
    // @ts-ignore
    expect(Sidebar.metadata.since).toBe('2.5.3');
  });
});
