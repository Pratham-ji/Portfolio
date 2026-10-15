import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Avatar } from './index';

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="test.jpg" alt="User" />);
    const img = screen.getByAltText('User');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('renders initials when no src provided', () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('falls back to initials if image errors', () => {
    render(<Avatar src="bad.jpg" alt="User" initials="JD" />);
    const img = screen.getByAltText('User');
    
    fireEvent.error(img);
    
    expect(screen.queryByAltText('User')).not.toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders status badge with correct aria label', () => {
    render(<Avatar initials="JD" status="online" />);
    expect(screen.getByLabelText('User is online')).toBeInTheDocument();
  });
});
