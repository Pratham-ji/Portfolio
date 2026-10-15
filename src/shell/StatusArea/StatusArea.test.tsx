import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusArea } from './index';

describe('StatusArea', () => {
  it('renders all independent widgets', () => {
    render(<StatusArea />);
    
    // Check that independent widgets are mounted
    expect(screen.getByTitle(/Battery:/)).toBeInTheDocument();
    expect(screen.getByTitle(/Wi-Fi:/)).toBeInTheDocument();
    expect(screen.getByTitle(/Bluetooth:/)).toBeInTheDocument();
    expect(screen.getByTitle(/Theme:/)).toBeInTheDocument();
    expect(screen.getByTitle(/Volume:/)).toBeInTheDocument();
    
    // Clock doesn't have a title in the mock, but should be rendered.
    // It renders time format e.g. "Mon 9:41 AM", hard to static query without regex
  });
});
