import { describe, it, expect, vi } from 'vitest';
import { FocusManager } from '../managers/FocusManager';

describe('FocusManager', () => {
  it('focuses a window and panel', () => {
    FocusManager.focus('win1', 'panel1');
    expect(FocusManager.getFocusedWindow()).toBe('win1');
    expect(FocusManager.getFocusedPanel()).toBe('panel1');
  });

  it('notifies subscribers on focus change', () => {
    const listener = vi.fn();
    const unsubscribe = FocusManager.subscribe(listener);

    FocusManager.focus('win2');
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    FocusManager.focus('win3');
    expect(listener).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('blurs focus state', () => {
    FocusManager.focus('win1');
    FocusManager.blur();
    expect(FocusManager.getFocusedWindow()).toBeNull();
  });
});
