import { describe, it, expect } from 'vitest';
import { settingsReducer } from './reducer';
import { defaultSettings } from './defaultSettings';

describe('Settings Reducer', () => {
  it('should update a setting', () => {
    const initialState = { settings: defaultSettings };
    const action = { type: 'UPDATE_SETTING' as const, payload: { key: 'theme' as const, value: 'light' as const } };
    
    const nextState = settingsReducer(initialState, action);
    expect(nextState.settings.theme).toBe('light');
  });

  it('should toggle animations', () => {
    const initialState = { settings: defaultSettings };
    const action = { type: 'UPDATE_SETTING' as const, payload: { key: 'animationsEnabled' as const, value: false } };
    
    const nextState = settingsReducer(initialState, action);
    expect(nextState.settings.animationsEnabled).toBe(false);
  });
});
