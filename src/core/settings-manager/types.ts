export interface OS_Settings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  animationsEnabled: boolean;
  wallpaper: string;
}

export interface SettingsState {
  settings: OS_Settings;
}

export type SettingsAction =
  | { type: 'UPDATE_SETTING'; payload: { key: keyof OS_Settings; value: OS_Settings[keyof OS_Settings] } }
  | { type: 'RESET_SETTINGS' };
