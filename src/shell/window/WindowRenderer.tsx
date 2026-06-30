import { useWindowContext } from '../../core/window-manager';
import { useApplication } from '../../core/application-manager';
import { WindowFrame } from './WindowFrame';
import { AnimatePresence } from 'motion/react';
import { Suspense } from 'react';

export const WindowRenderer: React.FC = () => {
  const { windows } = useWindowContext();
  const { getAppManifest } = useApplication();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 100 }}>
      <AnimatePresence>
        {windows.map(win => {
          const manifest = getAppManifest(win.appId);
          const isKnownApp = Boolean(manifest && manifest.component);

          return (
            <div key={win.id} className="pointer-events-auto">
              <WindowFrame windowConfig={win}>
                {isKnownApp ? (
                  <Suspense fallback={
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[var(--theme-text-muted)] animate-pulse">Loading app...</span>
                    </div>
                  }>
                    {manifest?.component && <manifest.component />}
                  </Suspense>
                ) : (
                  <div className="p-4 text-[var(--theme-text)]">
                    <p>App not found or component missing.</p>
                  </div>
                )}
              </WindowFrame>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
