import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from './index';

describe('Button', () => {
  it('renders correctly with default variant', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('variant-secondary');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeDisabled();
    
    // Simulate pointer down to ensure it doesn't crash or throw
    fireEvent.pointerDown(button);
  });

  it('renders loading state', () => {
    render(<Button isLoading>Click Me</Button>);
    const button = screen.getByText('...');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });
});
