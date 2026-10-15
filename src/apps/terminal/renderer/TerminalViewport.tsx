import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TerminalStore } from '../runtime/TerminalStore';
import { TerminalLine } from './TerminalLine';
import { TerminalPrompt } from './TerminalPrompt';
import { useClipboard } from '../hooks/useClipboard';
import { TerminalLineData } from '../types';

export const TerminalViewport: React.FC = () => {
  const [history, setHistory] = useState<TerminalLineData[]>([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState<string>('');
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prevLength = TerminalStore.getState().history.length;
    const unsub = TerminalStore.subscribe(() => {
      const stateHistory = TerminalStore.getState().history;
      setHistory([...stateHistory]);

      if (stateHistory.length > prevLength) {
        const newLines = stateHistory.slice(prevLength);
        const lastNonInput = [...newLines].reverse().find(line => !line.isInput);
        if (lastNonInput) {
          const text = lastNonInput.segments.map(seg => seg.text).join('');
          setLatestAnnouncement(text);
        }
      }
      prevLength = stateHistory.length;
    });
    setHistory(TerminalStore.getState().history);
    return unsub;
  }, []);

  useClipboard(parentRef);

  const rowVirtualizer = useVirtualizer({
    count: history.length + 1, // +1 for the prompt
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20, // default line height
    overscan: 10,
  });

  return (
    <>
      <div className="sr-only" aria-live="polite" role="log">
        {latestAnnouncement}
      </div>
      <div
        ref={parentRef}
        id="terminal-viewport-scroll"
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '8px 12px',
          boxSizing: 'border-box'
        }}
        role="region"
        aria-label="Terminal Viewport"
        aria-live="polite"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {(() => {
            const virtualItems = rowVirtualizer.getVirtualItems();
            const itemsToRender = virtualItems.length > 0
              ? virtualItems.map(vr => ({
                  key: vr.key,
                  index: vr.index,
                  start: vr.start,
                  isPrompt: vr.index === history.length,
                  measureRef: rowVirtualizer.measureElement,
                }))
              : Array.from({ length: history.length + 1 }, (_, i) => ({
                  key: i,
                  index: i,
                  start: i * 20,
                  isPrompt: i === history.length,
                  measureRef: undefined,
                }));

            return itemsToRender.map((item) => {
              return (
                <div
                  key={item.key}
                  data-index={item.index}
                  ref={item.measureRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  {item.isPrompt ? (
                    <TerminalPrompt />
                  ) : (
                    <TerminalLine data={history[item.index]} />
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </>
  );
};
