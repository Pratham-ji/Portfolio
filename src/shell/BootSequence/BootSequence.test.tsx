import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BootSequence } from './index';

describe('BootSequence', () => {
  it('renders logo and unmounts on completion', async () => {
    const onComplete = vi.fn();
    const { container } = render(<BootSequence onComplete={onComplete} />);
    
    expect(screen.getByText('P')).toBeInTheDocument();
    
    // Wait for the simulated boot to finish
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    }, { timeout: 2000 });
    
    // It should be completely empty (returned null)
    expect(container.firstChild).toBeNull();
  });
});
