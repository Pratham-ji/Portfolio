import React, { ReactNode } from 'react';
import { SettingsProvider } from '../settings-manager';
import { ThemeManagerProvider } from '../theme-manager/ThemeManagerProvider';
import { FileSystemProvider } from '../file-system';
import { NotificationProvider } from '../notification-manager';
import { ApplicationProvider } from '../application-manager';
import { WindowProvider } from '../window-manager';
import { DesktopProvider } from '../desktop-manager';

/**
 * Foundry is the core orchestrator.
 * It wraps the application in all necessary system providers.
 * Hierarchy:
 * Settings -> Theme -> FileSystem -> Notifications -> Applications -> Windows -> Desktop
 */
export const Foundry: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SettingsProvider>
      <ThemeManagerProvider>
        <FileSystemProvider>
          <NotificationProvider>
            <ApplicationProvider>
              <WindowProvider>
                <DesktopProvider>
                  {children}
                </DesktopProvider>
              </WindowProvider>
            </ApplicationProvider>
          </NotificationProvider>
        </FileSystemProvider>
      </ThemeManagerProvider>
    </SettingsProvider>
  );
};

export default Foundry;
