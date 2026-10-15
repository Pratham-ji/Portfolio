import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopBar } from './index';

describe('TopBar', () => {
  it('renders the OS logo and default app name', () => {
    render(<TopBar />);
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('PrathamOS')).toBeInTheDocument();
  });

  it('renders status icons', () => {
    render(<TopBar />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
