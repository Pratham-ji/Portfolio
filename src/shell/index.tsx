import React from 'react';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { Spotlight } from './Spotlight';
import { QuickSettings } from './QuickSettings';
import { NotificationCenter } from './NotificationCenter';
import { PowerMenu } from './PowerMenu';
import { DesktopContextMenu } from './DesktopContextMenu';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { LockScreen } from './LockScreen';
import { BootSequence } from './BootSequence';
import { RecruiterDirector } from './RecruiterDirector';
import { WelcomeBanner } from './WelcomeBanner';

export const SystemShell: React.FC = () => {
  return (
    <>
      {/* Shell Chrome (Layer 1) - Pointer Events: Auto, Layout: Fixed */}
      <TopBar />
      <Dock />

      {/* Beginner-Friendly Onboarding Quick-Start Banner (Layer 1.5) - Z-Index 15000 */}
      <WelcomeBanner />

      {/* Global Overlays (Layer 2) - Z-Index 20000+ */}
      <Spotlight />
      <QuickSettings />
      <NotificationCenter />
      <PowerMenu />
      <DesktopContextMenu />
      <WorkspaceSwitcher />

      {/* Recruiter Director HUD Overlay (Layer 2.5) - Z-Index 45000+ */}
      <RecruiterDirector />

      {/* System Modals / Intercepts (Layer 3) - Z-Index 50000+ */}
      <LockScreen defaultLocked={false} />
      
      {/* Boot Animation (Highest Layer) - Z-Index 99999+ */}
      <BootSequence />
    </>
  );
};

export default SystemShell;
