export interface OS_Settings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  animationsEnabled: boolean;
  wallpaper: string;
}

export const defaultSettings: OS_Settings = {
  theme: 'dark',
  accentColor: 'os-blue',
  animationsEnabled: true,
  wallpaper: 'default',
};
