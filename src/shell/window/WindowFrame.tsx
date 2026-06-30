import { ReactNode } from 'react';
import { motion, useDragControls } from 'motion/react';
import { useWindowContext } from '../../core/window-manager';
import { WindowStateObj } from '../../core/window-manager/types';
import { WindowTitleBar } from './WindowTitleBar';

interface WindowFrameProps {
  windowConfig: WindowStateObj;
  children: ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowConfig, children }) => {
  const { activeWindowId, focusWindow, updateWindowTransform } = useWindowContext();
  const isActive = activeWindowId === windowConfig.id;
  const dragControls = useDragControls();

  const handlePointerDown = () => {
    if (!isActive) focusWindow(windowConfig.id);
  };

  const startDrag = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  const variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      x: windowConfig.isMaximized ? 0 : windowConfig.position.x,
      y: windowConfig.isMaximized ? 0 : windowConfig.position.y,
      width: windowConfig.isMaximized ? '100%' : windowConfig.size.width,
      height: windowConfig.isMaximized ? '100%' : windowConfig.size.height,
    },
    exit: { opacity: 0, scale: 0.95 },
  };

  if (windowConfig.isMinimized) return null;

  return (
    <motion.div
      drag={!windowConfig.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(_e, info) => {
        updateWindowTransform(windowConfig.id, {
          x: windowConfig.position.x + info.offset.x,
          y: windowConfig.position.y + info.offset.y
        });
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onPointerDown={handlePointerDown}
      className="absolute overflow-hidden shadow-2xl flex flex-col"
      style={{
        zIndex: windowConfig.zIndex,
        backgroundColor: 'var(--theme-bg)',
        border: windowConfig.isMaximized ? 'none' : '1px solid var(--theme-border)',
        borderRadius: windowConfig.isMaximized ? 0 : 'var(--radius-md)',
        boxShadow: isActive ? 'var(--elevation-high)' : 'var(--elevation-medium)',
      }}
    >
      <WindowTitleBar 
        id={windowConfig.id} 
        title={windowConfig.title} 
        isMaximized={windowConfig.isMaximized}
        onPointerDown={startDrag}
      />
      <div className="flex-1 relative overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};
