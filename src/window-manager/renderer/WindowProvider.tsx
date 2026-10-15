import React, { createContext } from 'react';
import { ViewportProvider } from '../layout/viewport';

// Plugin API Preparation
export interface WindowProviderAPI {
  registerWindow: () => void;
  registerWindowType: () => void;
  registerWindowCapabilities: () => void;
}

const WindowContext = createContext<WindowProviderAPI | null>(null);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api: WindowProviderAPI = {
    registerWindow: () => {},
    registerWindowType: () => {},
    registerWindowCapabilities: () => {}
  };

  return (
    <ViewportProvider>
      <WindowContext.Provider value={api}>
        {children}
      </WindowContext.Provider>
    </ViewportProvider>
  );
};
