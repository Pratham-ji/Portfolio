import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dock } from './index';

describe('Dock', () => {
  it('renders correctly with mock items', () => {
    render(<Dock />);
    expect(screen.getByLabelText('Dock')).toBeInTheDocument();
    
    // Check for dock items (using their aria-labels which represent the names)
    expect(screen.getByLabelText(/Explorer|Finder/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Terminal')).toBeInTheDocument();
  });
});
