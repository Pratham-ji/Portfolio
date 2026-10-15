import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickSettings } from './index';

describe('QuickSettings', () => {
  it('renders correctly when toggled', () => {
    render(<QuickSettings />);
    
    // Toggle open
    fireEvent(window, new CustomEvent('toggle-quick-settings', { detail: true }));
    
    expect(screen.getByLabelText('Quick Settings')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Bluetooth')).toBeInTheDocument();
    expect(screen.getByText('System Settings...')).toBeInTheDocument();
  });
  
  it('updates volume state and dispatches event', () => {
    render(<QuickSettings />);
    fireEvent(window, new CustomEvent('toggle-quick-settings', { detail: true }));
    
    let eventFired = false;
    window.addEventListener('os-volume-change', () => { eventFired = true; });
    
    const volumeSlider = screen.getByLabelText('Volume');
    fireEvent.change(volumeSlider, { target: { value: '75' } });
    
    expect(volumeSlider).toHaveValue('75');
    expect(eventFired).toBe(true);
  });
});
