export type WallpaperTransitionType = 'static' | 'crossfade' | 'parallax' | 'video' | 'live';

export interface WallpaperMetadata {
  id: string;
  name: string;
  url: string;
  type: WallpaperTransitionType;
  author?: string;
  thumbnailUrl?: string;
}

export class Registry {
  private wallpapers: Map<string, WallpaperMetadata> = new Map();

  constructor() {
    this.wallpapers.set('default-1', {
      id: 'default-1',
      name: 'PrathamOS Default',
      url: '/assets/wallpapers/default.jpg', // Mock path
      type: 'static'
    });
    this.wallpapers.set('live-1', {
      id: 'live-1',
      name: 'Dynamic Waves',
      url: '/assets/wallpapers/waves.mp4',
      type: 'video'
    });
  }

  getWallpaper(id: string): WallpaperMetadata | undefined {
    return this.wallpapers.get(id);
  }

  getAllWallpapers(): WallpaperMetadata[] {
    return Array.from(this.wallpapers.values());
  }
}

export const WallpaperRegistry = new Registry();
