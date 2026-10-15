import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { GlassPanel } from './index';

describe('GlassPanel', () => {
  it('renders with default variant correctly', () => {
    const { container } = render(<GlassPanel>Test</GlassPanel>);
    expect(container.firstChild).toHaveClass('glassPanel');
    expect(container.firstChild).toHaveClass('variant-default');
  });

  it('renders dynamicContent variant correctly', () => {
    const { container } = render(<GlassPanel variant="dynamicContent">Test</GlassPanel>);
    expect(container.firstChild).toHaveClass('variant-dynamicContent');
  });

  it('applies interactive class if interactive=true', () => {
    const { container } = render(<GlassPanel interactive>Test</GlassPanel>);
    expect(container.firstChild).toHaveClass('interactive');
  });
});
