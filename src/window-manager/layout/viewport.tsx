import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ViewportContextValue {
  width: number;
  height: number;
}

const ViewportContext = createContext<ViewportContextValue | null>(null);

export const ViewportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewport, setViewport] = useState<ViewportContextValue>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  const ctx = useContext(ViewportContext);
  if (!ctx) throw new Error("useViewport must be used within a ViewportProvider");
  return ctx;
};
