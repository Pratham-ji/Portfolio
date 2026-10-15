import React, { useState, useEffect } from 'react';
import { usePlatform } from '../core/hooks/usePlatform';
import * as LucideIcons from 'lucide-react';

interface OSIconProps {
  appId: string;
  fallbackIcon?: string;
  size?: number;
  className?: string;
}

export const OSIcon: React.FC<OSIconProps> = ({ appId, fallbackIcon, size = 48, className = '' }) => {
  const { os } = usePlatform();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loadErrorLevel, setLoadErrorLevel] = useState<number>(0);

  useEffect(() => {
    // Reset state when appId or os changes
    setImgSrc(`/icons/${os}/${appId}.png`);
    setLoadErrorLevel(0);
  }, [appId, os]);

  const handleError = () => {
    if (loadErrorLevel === 0 && os !== 'windows') {
      // Fallback 1: Try windows icon
      setImgSrc(`/icons/windows/${appId}.png`);
      setLoadErrorLevel(1);
    } else {
      // Fallback 2: Use Lucide
      setImgSrc(null);
      setLoadErrorLevel(2);
    }
  };

  if (imgSrc) {
    return (
      <img 
        src={imgSrc} 
        alt={`${appId} icon`} 
        width={size} 
        height={size} 
        className={`object-contain ${className}`}
        onError={handleError}
        draggable={false}
      />
    );
  }

  // Render Lucide fallback
  const IconComponent = fallbackIcon && (LucideIcons as any)[fallbackIcon]
    ? (LucideIcons as any)[fallbackIcon]
    : LucideIcons.AppWindow;

  return <IconComponent size={size} className={className} strokeWidth={1.5} />;
};
