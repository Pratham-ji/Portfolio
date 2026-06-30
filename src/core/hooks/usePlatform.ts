import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type OSType = 'windows' | 'macos' | 'linux' | 'unknown';

export interface PlatformInfo {
  deviceType: DeviceType;
  os: OSType;
  isTouch: boolean;
}

const checkPlatform = (platformStr: string, checks: string[]) => 
  checks.some(c => platformStr.includes(c));

const getOsFromStr = (str: string): OSType | null => {
  if (checkPlatform(str, ['win'])) return 'windows';
  if (checkPlatform(str, ['mac', 'os x'])) return 'macos';
  if (checkPlatform(str, ['linux', 'x11'])) return 'linux';
  return null;
};

const getOSType = (): OSType => {
  if (typeof window === 'undefined') return 'unknown';
  
  const nav = navigator as unknown as { userAgentData?: { platform?: string } };
  const uaPlatform = nav.userAgentData?.platform?.toLowerCase() || '';
  const uaOs = getOsFromStr(uaPlatform);
  if (uaOs) return uaOs;

  const combined = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  return getOsFromStr(combined) || 'unknown';
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
