import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface ShellState {
  isStartMenuOpen: boolean;
  isSpotlightOpen: boolean;
  isNotificationCenterOpen: boolean;
  isDeveloperModeOpen: boolean;
  powerState: 'booting' | 'on' | 'shutting_down' | 'off';
}

interface ShellContextValue {
  state: ShellState;
  toggleStartMenu: () => void;
  toggleSpotlight: () => void;
  toggleNotificationCenter: () => void;
  toggleDeveloperMode: () => void;
  closeAllOverlays: () => void;
  setPowerState: (state: 'booting' | 'on' | 'shutting_down' | 'off') => void;
}

const ShellContext = createContext<ShellContextValue | undefined>(undefined);

export const ShellProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ShellState>({
    isStartMenuOpen: false,
    isSpotlightOpen: false,
    isNotificationCenterOpen: false,
    isDeveloperModeOpen: false,
    powerState: 'booting',
  });

  const setPowerState = useCallback((powerState: 'booting' | 'on' | 'shutting_down' | 'off') => {
    setState(prev => ({ ...prev, powerState }));
  }, []);

  const toggleStartMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isStartMenuOpen: !prev.isStartMenuOpen,
      isSpotlightOpen: false,
      isNotificationCenterOpen: false,
    }));
  }, []);

  const toggleSpotlight = useCallback(() => {
    setState(prev => ({
      ...prev,
      isSpotlightOpen: !prev.isSpotlightOpen,
      isStartMenuOpen: false,
      isNotificationCenterOpen: false,
    }));
  }, []);

  const toggleNotificationCenter = useCallback(() => {
    setState(prev => ({
      ...prev,
      isNotificationCenterOpen: !prev.isNotificationCenterOpen,
      isStartMenuOpen: false,
      isSpotlightOpen: false,
    }));
  }, []);

  const toggleDeveloperMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDeveloperModeOpen: !prev.isDeveloperModeOpen,
    }));
  }, []);

  const closeAllOverlays = useCallback(() => {
    setState(prev => ({
      ...prev,
      isStartMenuOpen: false,
      isSpotlightOpen: false,
      isNotificationCenterOpen: false,
    }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllOverlays();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeAllOverlays]);

  return (
    <ShellContext.Provider value={{ 
      state, 
      toggleStartMenu, 
      toggleSpotlight, 
      toggleNotificationCenter, 
      toggleDeveloperMode,
      closeAllOverlays,
      setPowerState 
    }}>
      {children}
    </ShellContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShell = () => {
  const context = useContext(ShellContext);
  if (!context) throw new Error('useShell must be used within a ShellProvider');
  return context;
};
