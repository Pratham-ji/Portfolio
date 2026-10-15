import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Scrollbar } from './index';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock('../../hooks/usePlatform', () => ({
  usePlatform: vi.fn(() => ({ os: 'macos' }))
}));

describe('Scrollbar', () => {
  it('renders children inside viewport', () => {
    render(
      <Scrollbar>
        <div data-testid="content">Content</div>
      </Scrollbar>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
