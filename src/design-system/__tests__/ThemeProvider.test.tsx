import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from '../providers/ThemeProvider';

const TestComponent = () => {
  // @ts-ignore
  const { theme, resolvedTheme } = useContext(ThemeContext);
  return (
    <div data-testid="theme-output">
      {theme}-{resolvedTheme}
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to system theme and resolves to dark if system prefers dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-output').textContent).toBe('system-dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('system');
  });

  it('loads theme from localStorage', () => {
    localStorage.setItem('prathamos-theme', 'light');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-output').textContent).toBe('light-light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
