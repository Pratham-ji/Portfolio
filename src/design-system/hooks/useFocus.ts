import { useEffect, useState } from 'react';
import { FocusManager, FocusId } from '../managers/FocusManager';

export const useFocus = () => {
  const [focusedWindow, setFocusedWindow] = useState<FocusId>(FocusManager.getFocusedWindow());
  const [focusedPanel, setFocusedPanel] = useState<FocusId>(FocusManager.getFocusedPanel());

  useEffect(() => {
    const unsubscribe = FocusManager.subscribe(() => {
      setFocusedWindow(FocusManager.getFocusedWindow());
      setFocusedPanel(FocusManager.getFocusedPanel());
    });
    return () => unsubscribe();
  }, []);

  return {
    focusedWindow,
    focusedPanel,
    focus: FocusManager.focus.bind(FocusManager),
    blur: FocusManager.blur.bind(FocusManager),
    restorePreviousFocus: FocusManager.restorePreviousFocus.bind(FocusManager)
  };
};
