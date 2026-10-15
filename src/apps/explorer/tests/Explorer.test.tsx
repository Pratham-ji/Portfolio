import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExplorerApp } from '../ExplorerApp';

describe('Explorer App', () => {
  it('renders quick access and default folder contents', () => {
    render(<ExplorerApp />);
    
    // Quick Access
    expect(screen.getAllByText('Desktop').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Documents').length).toBeGreaterThan(0);
    
    // Breadcrumbs
    expect(screen.getByLabelText(/Breadcrumb/i)).toBeInTheDocument();
    
    // Files inside default (pratham) folder
    // desktop, documents, downloads should be visible in grid
    const desktopRows = screen.getAllByText('Desktop');
    expect(desktopRows.length).toBeGreaterThan(1); // One in sidebar, one in grid
  });

  it('navigates on double click', () => {
    render(<ExplorerApp />);
    
    const desktopGridItem = screen.getAllByText('Desktop')[1]; // The one in the grid
    fireEvent.doubleClick(desktopGridItem);
    
    // Should now be inside Desktop, so 'Portfolio' should be visible
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0);
  });
});
