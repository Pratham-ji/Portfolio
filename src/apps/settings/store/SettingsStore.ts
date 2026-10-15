export interface SettingsCategory {
  id: string;
  title: string;
  icon: string; // Lucide icon name: 'palette', 'image', 'monitor', 'accessibility', 'volume-2', 'code', 'info'
  description: string;
}

export interface SettingOption {
  label: string;
  value: string;
}

export interface SettingColor {
  id: string;
  hex: string;
  label: string;
}

export interface SettingWallpaper {
  id: string;
  name: string;
  thumbnail: string;
}

export interface SettingItem {
  id: string;
  categoryId: string;
  title: string;
  description?: string;
  keywords?: string[];
  type: 'toggle' | 'select' | 'color-picker' | 'wallpaper-grid' | 'button' | 'info';
  value: any;
  options?: SettingOption[];
  colors?: SettingColor[];
  wallpapers?: SettingWallpaper[];
  commandId?: string;
}

export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'palette',
    description: 'Customize themes, window styles, and accent highlights.'
  },
  {
    id: 'wallpaper',
    title: 'Wallpaper',
    icon: 'image',
    description: 'Personalize desktop wallpapers and visual gradients.'
  },
  {
    id: 'shell',
    title: 'Shell Persona',
    icon: 'monitor',
    description: 'Select platform behavior and desktop shell aesthetics.'
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: 'accessibility',
    description: 'Adjust motion, visual aids, and interactive comfort.'
  },
  {
    id: 'sound',
    title: 'Sound & Haptics',
    icon: 'volume-2',
    description: 'Configure system audio feedback and UI sounds.'
  },
  {
    id: 'developer',
    title: 'Developer',
    icon: 'code',
    description: 'Kernel diagnostics, compositor debuggers, and inspection overlays.'
  },
  {
    id: 'about',
    title: 'About',
    icon: 'info',
    description: 'System specifications, kernel version, and build info.'
  }
];

export const ACCENT_COLOR_PRESETS: SettingColor[] = [
  { id: 'os-blue', hex: '#0A84FF', label: 'Blue' },
  { id: 'os-red', hex: '#FF453A', label: 'Red' },
  { id: 'os-green', hex: '#30D158', label: 'Green' },
  { id: 'os-purple', hex: '#BF5AF2', label: 'Purple' },
  { id: 'os-orange', hex: '#FF9F0A', label: 'Orange' },
  { id: 'os-pink', hex: '#FF375F', label: 'Pink' }
];

export const WALLPAPER_PRESETS: SettingWallpaper[] = [
  { id: 'sequoia-light', name: 'Sequoia Light', thumbnail: '' },
  { id: 'sequoia-dark', name: 'Sequoia Dark', thumbnail: '' },
  { id: 'sonoma-light', name: 'Sonoma Light', thumbnail: '' },
  { id: 'sonoma-dark', name: 'Sonoma Dark', thumbnail: '' },
  { id: 'ventura-light', name: 'Ventura Light', thumbnail: '' },
  { id: 'ventura-dark', name: 'Ventura Dark', thumbnail: '' },
  { id: 'monterey-light', name: 'Monterey Light', thumbnail: '' },
  { id: 'monterey-dark', name: 'Monterey Dark', thumbnail: '' },
  { id: 'abstract-prism', name: 'Abstract Prism', thumbnail: '' },
  { id: 'abstract-flow', name: 'Abstract Flow', thumbnail: '' },
  { id: 'abstract-grid', name: 'Abstract Grid', thumbnail: '' },
  { id: 'minimal-void', name: 'Minimal Void', thumbnail: '' }
];

export const INITIAL_SETTINGS: SettingItem[] = [
  // Appearance
  {
    id: 'theme',
    categoryId: 'appearance',
    title: 'Theme',
    description: 'Dark Mode',
    keywords: ['theme', 'dark mode', 'light mode', 'dark', 'light', 'system', 'appearance', 'mode'],
    type: 'select',
    value: 'dark',
    options: [
      { label: 'Dark', value: 'dark' },
      { label: 'Light', value: 'light' },
      { label: 'System', value: 'system' }
    ],
    commandId: 'OS_TOGGLE_THEME'
  },
  {
    id: 'accentColor',
    categoryId: 'appearance',
    title: 'Accent Color',
    description: 'System highlight tone for buttons, focus rings, and active states.',
    keywords: ['accent', 'color', 'tint', 'highlight', 'blue', 'red', 'green', 'purple', 'orange', 'pink'],
    type: 'color-picker',
    value: 'os-blue',
    colors: ACCENT_COLOR_PRESETS
  },

  // Wallpaper
  {
    id: 'wallpaper',
    categoryId: 'wallpaper',
    title: 'Desktop Wallpaper',
    description: 'Select your preferred desktop backdrop and ambient aesthetic.',
    keywords: [
      'wallpaper', 'background', 'desktop', 'backdrop',
      'sequoia', 'sonoma', 'ventura', 'monterey', 'prism', 'flow', 'grid', 'void'
    ],
    type: 'wallpaper-grid',
    value: 'sequoia-dark',
    wallpapers: WALLPAPER_PRESETS
  },

  // Shell Persona
  {
    id: 'platformTheme',
    categoryId: 'shell',
    title: 'Desktop Shell Persona',
    description: 'Emulate desktop operating system chrome and ergonomics.',
    keywords: ['shell', 'persona', 'os', 'macos', 'windows', 'linux', 'platform', 'dock', 'taskbar'],
    type: 'select',
    value: 'auto',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'macOS', value: 'macos' },
      { label: 'Windows', value: 'windows' },
      { label: 'Linux', value: 'linux' }
    ]
  },

  // Accessibility
  {
    id: 'reducedMotion',
    categoryId: 'accessibility',
    title: 'Reduce Motion',
    description: 'Minimize window scaling physics, dock magnification, and blur transitions.',
    keywords: ['reduce motion', 'reduced motion', 'motion', 'animations', 'physics', 'accessibility'],
    type: 'toggle',
    value: false,
    commandId: 'OS_TOGGLE_REDUCED_MOTION'
  },

  // Sound & Haptics
  {
    id: 'tactileSound',
    categoryId: 'sound',
    title: 'Tactile Sound Effects',
    description: 'Produce acoustic feedback on window clicks, toggles, and keystrokes.',
    keywords: ['sound', 'audio', 'tactile', 'clicks', 'feedback', 'haptics', 'volume'],
    type: 'toggle',
    value: true
  },

  // Developer
  {
    id: 'debugFpsOverlay',
    categoryId: 'developer',
    title: 'Debug FPS Overlay',
    description: 'Display an on-screen HUD with window compositor frame rate and drop counters.',
    keywords: ['debug', 'fps', 'frame rate', 'performance', 'hud', 'developer', 'compositor'],
    type: 'toggle',
    value: false
  },
  {
    id: 'showLayerBorders',
    categoryId: 'developer',
    title: 'Show Layer Borders',
    description: 'Render high-contrast outlines indicating GPU composition and redraw boundaries.',
    keywords: ['layer', 'borders', 'gpu', 'compositor', 'debug', 'developer', 'redraw'],
    type: 'toggle',
    value: false
  }
];

export const getWallpaperGradient = (id: string): string => {
  switch (id) {
    case 'sequoia-light':
      return 'linear-gradient(135deg, #f7ba2c 0%, #ea5455 50%, #7367f0 100%)';
    case 'sequoia-dark':
      return 'linear-gradient(135deg, #1f1c2c 0%, #302b63 50%, #0f0c29 100%)';
    case 'sonoma-light':
      return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    case 'sonoma-dark':
      return 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)';
    case 'ventura-light':
      return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    case 'ventura-dark':
      return 'linear-gradient(135deg, #434343 0%, #000000 50%, #1a1a2e 100%)';
    case 'monterey-light':
      return 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)';
    case 'monterey-dark':
      return 'linear-gradient(135deg, #182848 0%, #4b6cb7 50%, #182848 100%)';
    case 'abstract-prism':
      return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
    case 'abstract-flow':
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    case 'abstract-grid':
      return 'radial-gradient(circle at 50% 50%, #3b82f6 0%, #1d4ed8 40%, #0f172a 100%)';
    case 'minimal-void':
    default:
      return 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)';
  }
};

class SettingsStoreImpl {
  private listeners: Set<() => void> = new Set();
  readonly categories: SettingsCategory[] = SETTINGS_CATEGORIES;
  settings: SettingItem[] = JSON.parse(JSON.stringify(INITIAL_SETTINGS));

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.error('SettingsStore listener error:', err);
      }
    });
  }

  updateValue(id: string, value: any): void {
    const item = this.settings.find(s => s.id === id);
    if (item) {
      item.value = value;
      this.notify();
    }
  }

  getValue<T = any>(id: string): T | undefined {
    const item = this.settings.find(s => s.id === id);
    return item ? (item.value as T) : undefined;
  }

  resetToDefaults(): void {
    this.settings = JSON.parse(JSON.stringify(INITIAL_SETTINGS));
    this.notify();
  }

  syncWithOS(osSettings: {
    theme?: 'light' | 'dark' | 'system';
    accentColor?: string;
    animationsEnabled?: boolean;
    wallpaper?: string;
    platformTheme?: 'auto' | 'windows' | 'macos' | 'linux';
  }): void {
    let changed = false;

    if (osSettings.theme) {
      const item = this.settings.find(s => s.id === 'theme');
      if (item && item.value !== osSettings.theme) {
        item.value = osSettings.theme;
        changed = true;
      }
    }

    if (osSettings.accentColor) {
      const item = this.settings.find(s => s.id === 'accentColor');
      if (item && item.value !== osSettings.accentColor) {
        item.value = osSettings.accentColor;
        changed = true;
      }
    }

    if (osSettings.animationsEnabled !== undefined) {
      const item = this.settings.find(s => s.id === 'reducedMotion');
      const shouldReduce = !osSettings.animationsEnabled;
      if (item && item.value !== shouldReduce) {
        item.value = shouldReduce;
        changed = true;
      }
    }

    if (osSettings.wallpaper) {
      const item = this.settings.find(s => s.id === 'wallpaper');
      if (item && item.value !== osSettings.wallpaper) {
        item.value = osSettings.wallpaper;
        changed = true;
      }
    }

    if (osSettings.platformTheme) {
      const item = this.settings.find(s => s.id === 'platformTheme');
      if (item && item.value !== osSettings.platformTheme) {
        item.value = osSettings.platformTheme;
        changed = true;
      }
    }

    if (changed) {
      this.notify();
    }
  }

  search(query: string): SettingItem[] {
    if (!query || !query.trim()) return [];
    const q = query.trim().toLowerCase();
    return this.settings.filter(s => {
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchDesc = s.description ? s.description.toLowerCase().includes(q) : false;
      const matchCategory = s.categoryId.toLowerCase().includes(q);
      const matchKeywords = s.keywords ? s.keywords.some(k => k.toLowerCase().includes(q)) : false;
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });
  }

  getByCategory(categoryId: string): SettingItem[] {
    return this.settings.filter(s => s.categoryId === categoryId);
  }
}

export const SettingsStore = new SettingsStoreImpl();
