import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type OSType = 'windows' | 'macos' | 'linux' | 'unknown';

export interface PlatformInfo {
  deviceType: DeviceType;
  os: OSType;
  isTouch: boolean;
}

const getOSType = (): OSType => {
  if (typeof window === 'undefined') return 'unknown';
  
  // Use userAgentData if available (modern browsers)
  const nav = navigator as any;
  if (nav.userAgentData && nav.userAgentData.platform) {
    const platform = nav.userAgentData.platform.toLowerCase();
    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'macos';
    if (platform.includes('linux')) return 'linux';
  }

  // Fallback to legacy platform/userAgent
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  
  if (platform.includes('win') || ua.includes('windows')) return 'windows';
  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os x')) return 'macos';
  if (platform.includes('linux') || ua.includes('x11')) return 'linux';
  
  return 'unknown';
};

const getDeviceType = (): { deviceType: DeviceType; isTouch: boolean } => {
  if (typeof window === 'undefined') {
    return { deviceType: 'desktop', isTouch: false };
  }

  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const width = window.innerWidth;

  if (isTouch) {
    // Phone vs Tablet
    if (width < 768) return { deviceType: 'mobile', isTouch: true };
    return { deviceType: 'tablet', isTouch: true };
  }

  // Pointer device
  return { deviceType: 'desktop', isTouch: false };
};

export const usePlatform = (): PlatformInfo => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    deviceType: 'desktop',
    os: 'unknown',
    isTouch: false
  });

  useEffect(() => {
    const handleResize = () => {
      const { deviceType, isTouch } = getDeviceType();
      const os = getOSType();
      
      setPlatformInfo(prev => {
        if (prev.deviceType === deviceType && prev.os === os && prev.isTouch === isTouch) {
          return prev;
        }
        return { deviceType, os, isTouch };
      });
    };

    // Initial detection
    handleResize();

    // Listen for resize and orientation changes
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return platformInfo;
};
