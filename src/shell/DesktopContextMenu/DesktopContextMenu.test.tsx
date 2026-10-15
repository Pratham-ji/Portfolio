import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DesktopContextMenu } from './index';

describe('DesktopContextMenu', () => {
  it('opens on right click and can be navigated via keyboard', () => {
    render(<DesktopContextMenu />);
    
    // Simulate right click on window
    fireEvent.contextMenu(window, { clientX: 100, clientY: 100 });
    
    expect(screen.getByText('New Folder')).toBeInTheDocument();
    
    // Test keyboard nav
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    fireEvent.keyDown(window, { key: 'ArrowDown' }); // Skips over divider? Wait, New Folder (0), Sort By (1), Clean Up (2).
    
    // Clean up would be selected if we arrow down twice
    const cleanUpItem = screen.getByText('Clean Up').closest('div');
    expect(cleanUpItem?.className).toMatch(/selected/);
  });
});
