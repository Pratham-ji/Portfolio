import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsApp } from '../SettingsApp';
import { SettingsStore, getWallpaperGradient } from '../store/SettingsStore';

describe('Settings App', () => {
  beforeEach(() => {
    SettingsStore.resetToDefaults();
  });

  it('renders default category', () => {
    render(<SettingsApp />);
    expect(screen.getAllByText('Appearance').length).toBeGreaterThan(0);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Accent Color')).toBeInTheDocument();
  });

  it('filters results instantly based on search', () => {
    render(<SettingsApp />);

    const searchInput = screen.getByPlaceholderText('Search Settings...');
    fireEvent.change(searchInput, { target: { value: 'Reduce Motion' } });

    // Page title should change to Search Results
    expect(screen.getByText('Search Results')).toBeInTheDocument();

    // Search result should appear
    expect(screen.getByText('Reduce Motion')).toBeInTheDocument();

    // Context should be visible for search results
    expect(screen.getByText('in accessibility')).toBeInTheDocument();
  });

  it('switches categories properly and renders wallpapers', () => {
    render(<SettingsApp />);

    // Click Wallpaper category
    const wallpaperNav = screen.getByRole('menuitem', { name: /Wallpaper/i });
    fireEvent.click(wallpaperNav);

    expect(screen.getByText('Desktop Wallpaper')).toBeInTheDocument();
    // Verify 12 wallpapers are rendered
    expect(screen.getByText('Sequoia Light')).toBeInTheDocument();
    expect(screen.getByText('Sequoia Dark')).toBeInTheDocument();
    expect(screen.getByText('Sonoma Light')).toBeInTheDocument();
    expect(screen.getByText('Sonoma Dark')).toBeInTheDocument();
    expect(screen.getByText('Ventura Light')).toBeInTheDocument();
    expect(screen.getByText('Ventura Dark')).toBeInTheDocument();
    expect(screen.getByText('Monterey Light')).toBeInTheDocument();
    expect(screen.getByText('Monterey Dark')).toBeInTheDocument();
    expect(screen.getByText('Abstract Prism')).toBeInTheDocument();
    expect(screen.getByText('Abstract Flow')).toBeInTheDocument();
    expect(screen.getByText('Abstract Grid')).toBeInTheDocument();
    expect(screen.getByText('Minimal Void')).toBeInTheDocument();
  });

  it('navigates to About section and displays system specs', () => {
    render(<SettingsApp />);

    const aboutNav = screen.getByRole('menuitem', { name: /About/i });
    fireEvent.click(aboutNav);

    expect(screen.getByText('About PrathamOS')).toBeInTheDocument();
    expect(screen.getByText('Version 3.2 (Anodized Void)')).toBeInTheDocument();
    expect(screen.getByText('Prathamraj Giri')).toBeInTheDocument();
    expect(screen.getByText('Hybrid rAF / 60FPS Window Compositor')).toBeInTheDocument();
    expect(screen.getByText('Reset All Settings to Defaults')).toBeInTheDocument();
  });

  it('allows toggling switches and updates aria-checked', () => {
    render(<SettingsApp />);

    const a11yNav = screen.getByRole('menuitem', { name: /Accessibility/i });
    fireEvent.click(a11yNav);

    const toggle = screen.getByRole('switch', { name: /Reduce Motion/i });
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(SettingsStore.getValue('reducedMotion')).toBe(true);

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(SettingsStore.getValue('reducedMotion')).toBe(false);
  });

  it('updates accent color selection', () => {
    render(<SettingsApp />);

    const redDot = screen.getByRole('radio', { name: 'Red' });
    fireEvent.click(redDot);

    expect(redDot).toHaveAttribute('aria-checked', 'true');
    expect(SettingsStore.getValue('accentColor')).toBe('os-red');
  });

  it('updates wallpaper selection', () => {
    render(<SettingsApp />);

    const wallpaperNav = screen.getByRole('menuitem', { name: /Wallpaper/i });
    fireEvent.click(wallpaperNav);

    const flowCard = screen.getByRole('radio', { name: 'Abstract Flow' });
    fireEvent.click(flowCard);

    expect(flowCard).toHaveAttribute('aria-checked', 'true');
    expect(SettingsStore.getValue('wallpaper')).toBe('abstract-flow');
  });

  it('resets settings to defaults from About section', () => {
    render(<SettingsApp />);

    // Change accent color to red
    const redDot = screen.getByRole('radio', { name: 'Red' });
    fireEvent.click(redDot);
    expect(SettingsStore.getValue('accentColor')).toBe('os-red');

    // Go to About and reset
    const aboutNav = screen.getByRole('menuitem', { name: /About/i });
    fireEvent.click(aboutNav);

    const resetBtn = screen.getByText('Reset All Settings to Defaults');
    fireEvent.click(resetBtn);

    expect(SettingsStore.getValue('accentColor')).toBe('os-blue');
  });

  it('generates distinct CSS gradients for wallpapers', () => {
    const g1 = getWallpaperGradient('sequoia-light');
    const g2 = getWallpaperGradient('sequoia-dark');
    const g3 = getWallpaperGradient('abstract-grid');
    expect(g1).toContain('linear-gradient');
    expect(g2).toContain('linear-gradient');
    expect(g3).toContain('radial-gradient');
    expect(g1).not.toBe(g2);
  });
});
