import { WallpaperRegistry, WallpaperMetadata } from './WallpaperRegistry';

class Service {
  private cache: Map<string, HTMLImageElement | HTMLVideoElement> = new Map();
  private preloading: Set<string> = new Set();

  preload(id: string) {
    if (this.cache.has(id) || this.preloading.has(id)) return;
    
    const meta = WallpaperRegistry.getWallpaper(id);
    if (!meta) return;

    this.preloading.add(id);

    if (meta.type === 'static' || meta.type === 'crossfade' || meta.type === 'parallax') {
      const img = new Image();
      img.src = meta.url;
      img.onload = () => {
        this.cache.set(id, img);
        this.preloading.delete(id);
      };
    } else if (meta.type === 'video') {
      const vid = document.createElement('video');
      vid.src = meta.url;
      vid.onloadeddata = () => {
        this.cache.set(id, vid);
        this.preloading.delete(id);
      };
    }
  }

  getAsset(id: string) {
    return this.cache.get(id);
  }
  
  // Triggers visual transition
  transitionTo(id: string, element: HTMLElement) {
    const meta = WallpaperRegistry.getWallpaper(id);
    if (!meta) return;
    
    // In actual implementation, we might append the element and run a CSS crossfade
    // For now we set the background directly
    element.style.backgroundImage = `url(${meta.url})`;
  }
}

export const WallpaperService = new Service();
