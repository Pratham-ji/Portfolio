import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SoundEngine } from '../SoundEngine';
import { SettingsStore } from '../../../apps/settings/store/SettingsStore';
import { Volume } from '../../../shell/StatusArea/widgets/Volume';
import { TerminalPrompt } from '../../../apps/terminal/renderer/TerminalPrompt';
import { PageRenderer } from '../../../apps/settings/components/SettingsComponents';
import { WindowRenderer } from '../../../window-manager/renderer/WindowRenderer';

describe('Acoustics Integrations', () => {
  beforeEach(() => {
    SettingsStore.resetToDefaults();
    vi.restoreAllMocks();
  });

  it('plays key tick when typing in TerminalPrompt', () => {
    const playTickSpy = vi.spyOn(SoundEngine, 'playKeyTick');
    render(<TerminalPrompt />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'a' });

    expect(playTickSpy).toHaveBeenCalledTimes(1);
  });

  it('plays switch click when toggling switches in PageRenderer', () => {
    const playClickSpy = vi.spyOn(SoundEngine, 'playSwitchClick');
    const mockOnSettingChange = vi.fn();

    render(
      <PageRenderer
        category="sound"
        isSearching={false}
        searchQuery=""
        onSettingChange={mockOnSettingChange}
      />
    );

    const switchBtn = screen.getByRole('switch', { name: /Tactile Sound Effects/i });
    expect(switchBtn).toBeInTheDocument();

    fireEvent.click(switchBtn);
    expect(playClickSpy).toHaveBeenCalledTimes(1);
    expect(mockOnSettingChange).toHaveBeenCalledWith('tactileSound', false);
  });

  it('toggles tactile sound and plays switch click when clicking Volume widget', () => {
    const playClickSpy = vi.spyOn(SoundEngine, 'playSwitchClick');
    render(<Volume />);

    const volumeWidget = screen.getByTitle(/Volume:/i);
    expect(volumeWidget).toBeInTheDocument();
    expect(volumeWidget).toHaveTextContent('🔊');

    // Click to mute
    fireEvent.click(volumeWidget);
    expect(playClickSpy).toHaveBeenCalledTimes(1);
    expect(SettingsStore.getValue('tactileSound')).toBe(false);
    expect(volumeWidget).toHaveTextContent('🔇');
    expect(volumeWidget).toHaveTextContent('Muted');

    // Click to un-mute
    fireEvent.click(volumeWidget);
    expect(playClickSpy).toHaveBeenCalledTimes(2);
    expect(SettingsStore.getValue('tactileSound')).toBe(true);
    expect(volumeWidget).toHaveTextContent('🔊');
  });

  it('supports keyboard Enter/Space activation on Volume widget', () => {
    const playClickSpy = vi.spyOn(SoundEngine, 'playSwitchClick');
    render(<Volume />);

    const volumeWidget = screen.getByRole('button');
    fireEvent.keyDown(volumeWidget, { key: 'Enter' });

    expect(playClickSpy).toHaveBeenCalledTimes(1);
    expect(SettingsStore.getValue('tactileSound')).toBe(false);
  });

  it('calls SoundEngine.playWindowSnap on window close, minimize, and maximize', () => {
    const snapSpy = vi.spyOn(SoundEngine, 'playWindowSnap');
    const mockWindowState = {
      windowId: 'win-1',
      applicationId: 'terminal',
      title: 'Terminal',
      focused: true,
      state: 'normal',
      capabilities: { move: true, resize: true, minimize: true, maximize: true, close: true },
      position: { x: 100, y: 100 },
      size: { width: 400, height: 300 },
      zIndex: 10,
    };
    const compositorRef = { current: document.createElement('div') };

    render(<WindowRenderer windowState={mockWindowState as any} compositorRef={compositorRef as any} />);

    // Click close traffic light
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    expect(snapSpy).toHaveBeenCalledTimes(1);

    // Click minimize traffic light
    const minBtn = screen.getByLabelText('Minimize');
    fireEvent.click(minBtn);
    expect(snapSpy).toHaveBeenCalledTimes(2);

    // Click maximize traffic light
    const maxBtn = screen.getByLabelText('Maximize');
    fireEvent.click(maxBtn);
    expect(snapSpy).toHaveBeenCalledTimes(3);
  });
});
