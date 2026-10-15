import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationCenter } from './index';

// We mock the state toggle by artificially triggering the event before rendering
describe('NotificationCenter', () => {
  it('groups notifications by app', () => {
    render(<NotificationCenter />);
    
    // Simulate opening it
    fireEvent(window, new CustomEvent('toggle-notification-center', { detail: true }));
    
    // Check for group headers
    expect(screen.getByText('Mail')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
    
    // Check for specific notification titles
    expect(screen.getByText('New Email')).toBeInTheDocument();
    expect(screen.getByText('Update Available')).toBeInTheDocument();
  });

  it('can clear notifications', () => {
    render(<NotificationCenter />);
    fireEvent(window, new CustomEvent('toggle-notification-center', { detail: true }));
    
    const clearBtn = screen.getByText('Clear All');
    fireEvent.click(clearBtn);
    
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
  });
});
