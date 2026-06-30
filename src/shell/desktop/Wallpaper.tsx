import React from 'react';
import { useSettings } from '../../core/settings-manager';

/**
 * Renders the desktop wallpaper.
 * Responsive and supports dynamic themes.
 */
export const Wallpaper: React.FC = () => {
  const { settings } = useSettings();
  
  // Three production-quality CSS wallpapers
  const getWallpaperStyle = () => {
    switch(settings.wallpaper) {
      case 'ocean':
        return 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
      case 'sunset':
        return 'linear-gradient(135deg, #1f005c 0%, #5b0060 20%, #870160 40%, #ac255e 60%, #ca485c 80%, #e16b5c 100%)';
      case 'cyber':
        return 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #000000 100%)';
      case 'default':
      default: {
        // Default clean gradient
        const isDark = settings.theme === 'dark' || 
          (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        return isDark 
          ? 'linear-gradient(135deg, #111827 0%, #1e1b4b 100%)' 
          : 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)';
      }
    }
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-700 ease-in-out bg-cover bg-center"
      style={{ 
        background: settings.wallpaper === 'default' 
          ? 'url(/wallpapers/background.jpg) center/cover no-repeat' 
          : getWallpaperStyle() 
      }}
      aria-hidden="true"
    />
  );
};
