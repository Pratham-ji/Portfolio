import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PlatformProvider } from '../providers/PlatformProvider';
import { usePlatform } from '../hooks/usePlatform';

const TestComponent = () => {
  const { os, modifierKey } = usePlatform();
  return (
    <div data-testid="platform-output">
      {os}-{modifierKey}
    </div>
  );
};

describe('PlatformProvider', () => {
  let originalUserAgent: string;

  beforeEach(() => {
    originalUserAgent = window.navigator.userAgent;
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true
    });
  });

  it('detects macOS and sets command key', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      configurable: true
    });

    render(
      <PlatformProvider>
        <TestComponent />
      </PlatformProvider>
    );

    expect(screen.getByTestId('platform-output').textContent).toBe('macOS-⌘');
  });

  it('detects Windows and sets control key', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      configurable: true
    });

    render(
      <PlatformProvider>
        <TestComponent />
      </PlatformProvider>
    );

    expect(screen.getByTestId('platform-output').textContent).toBe('Windows-Ctrl');
  });
});
