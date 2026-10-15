import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Paper } from './index';

describe('Paper', () => {
  it('renders default markdown mode', () => {
    render(<Paper>Markdown Content</Paper>);
    const paper = screen.getByText('Markdown Content');
    expect(paper).toBeInTheDocument();
    expect(paper).toHaveClass('mode-markdown');
  });

  it('renders resume mode', () => {
    render(<Paper mode="resume">Resume Content</Paper>);
    const paper = screen.getByText('Resume Content');
    expect(paper).toHaveClass('mode-resume');
  });

  it('exposes metadata', () => {
    // @ts-ignore
    expect(Paper.metadata.material).toBe('Material Paper');
  });
});
