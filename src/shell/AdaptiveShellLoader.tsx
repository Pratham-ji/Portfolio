import React, { Suspense, useMemo } from 'react';
import { usePlatform } from '../core/hooks/usePlatform';
import { useSettings } from '../core/settings-manager';

// Lazy load the shells to avoid downloading unnecessary platform code
const WindowsShell = React.lazy(() => import('./windows/WindowsShell'));
const MacOSShell = React.lazy(() => import('./macos/MacOSShell'));
const LinuxShell = React.lazy(() => import('./linux/LinuxShell'));
const TabletShell = React.lazy(() => import('./tablet/TabletShell'));
const MobileShell = React.lazy(() => import('./mobile/MobileShell'));

export const AdaptiveShellLoader: React.FC = () => {
  const { deviceType, os } = usePlatform();
  const { settings } = useSettings();

  const activeShell = useMemo(() => {
    // 1. Mobile & Tablet always take precedence regardless of OS or override (they are physical constraints)
    if (deviceType === 'mobile') return 'mobile';
    if (deviceType === 'tablet') return 'tablet';

    // 2. Desktop shells can be overridden manually via Settings
    if (settings.platformTheme && settings.platformTheme !== 'auto') {
      return settings.platformTheme;
    }

    // 3. Fallback to automatic OS detection for desktop
    if (os === 'macos') return 'macos';
    if (os === 'linux') return 'linux';
    
    // Default to Windows for desktop if OS is Windows or unknown
    return 'windows';
  }, [deviceType, os, settings.platformTheme]);

  // Loading skeleton while shell chunks are fetched
  const fallback = (
    <div className="w-full h-screen bg-[var(--theme-bg)] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-[var(--theme-accent)] border-t-transparent animate-spin mb-4"></div>
        <div className="text-[var(--theme-text)] opacity-50 font-medium">Loading Environment...</div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      {activeShell === 'mobile' && <MobileShell />}
      {activeShell === 'tablet' && <TabletShell />}
      {activeShell === 'windows' && <WindowsShell />}
      {activeShell === 'macos' && <MacOSShell />}
      {activeShell === 'linux' && <LinuxShell />}
    </Suspense>
  );
};

export default AdaptiveShellLoader;
