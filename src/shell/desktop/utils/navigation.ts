import { KeyboardEvent } from 'react';
import { FileSystemNode } from '../../../core/file-system';

interface GridNavigationProps {
  e: KeyboardEvent;
  desktopNodes: FileSystemNode[];
  selectedIds: Set<string>;
  handleSelect: (id: string, multi: boolean) => void;
  cols: number;
}

const getNextIndex = (key: string, currIdx: number, cols: number, maxIdx: number): number | undefined => {
  const moves: Record<string, number> = {
    'ArrowDown': Math.min(currIdx + 1, maxIdx),
    'ArrowUp': Math.max(currIdx - 1, 0),
    'ArrowRight': Math.min(currIdx + cols, maxIdx),
    'ArrowLeft': Math.max(currIdx - cols, 0)
  };
  return moves[key];
};

const isMultiSelect = (e: KeyboardEvent) => e.shiftKey || e.ctrlKey || e.metaKey;

export const handleGridNavigation = ({ e, desktopNodes, selectedIds, handleSelect, cols }: GridNavigationProps) => {
  if (!desktopNodes?.length) return;

  const currentList = Array.from(selectedIds);
  const currIdx = desktopNodes.findIndex(n => n.id === currentList[currentList.length - 1]);
  const isArrowKey = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key);

  if (currIdx === -1) {
    if (isArrowKey && desktopNodes[0]) {
      handleSelect(desktopNodes[0].id, false);
    }
    return;
  }

  const nxt = getNextIndex(e.key, currIdx, cols, desktopNodes.length - 1);
  const targetNode = nxt !== undefined ? desktopNodes[nxt] : undefined;
  
  if (targetNode && nxt !== currIdx) {
    e.preventDefault();
    handleSelect(targetNode.id, isMultiSelect(e));
  }
};
