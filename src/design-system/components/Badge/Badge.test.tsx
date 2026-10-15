import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Badge } from './index';

describe('Badge', () => {
  it('renders default neutral badge', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('variant-neutral');
  });

  it('renders semantic variants', () => {
    render(<Badge variant="error">Critical</Badge>);
    const badge = screen.getByText('Critical');
    expect(badge).toHaveClass('variant-error');
  });
});
