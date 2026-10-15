import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Tabs } from './index';

describe('Tabs', () => {
  const items = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content 3', disabled: true }
  ];

  it('renders default selected tab', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('handles click to select', () => {
    render(<Tabs items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('supports keyboard navigation (ArrowRight)', () => {
    render(<Tabs items={items} />);
    const tablist = screen.getByRole('tablist');
    
    // Select first tab and press right
    fireEvent.keyDown(tablist, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
  });

  it('exposes metadata', () => {
    expect(Tabs.metadata.since).toBe('2.5.3');
  });
});
