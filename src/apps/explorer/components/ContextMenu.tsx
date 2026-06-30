import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSystemNode } from '../../../core/file-system';
import { Edit2Icon, Trash2Icon, InfoIcon } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  node: FileSystemNode | null;
  onClose: () => void;
  onRename: (node: FileSystemNode) => void;
  onDelete: (node: FileSystemNode) => void;
  onProperties: (node: FileSystemNode) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x, y, node, onClose, onRename, onDelete, onProperties
}) => {
  if (!node) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100000]"
        onPointerDown={onClose}
        onContextMenu={(e) => { e.preventDefault(); onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={{ top: y, left: x }}
          className="absolute w-48 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => { onRename(node); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-os-blue transition-colors text-left"
          >
            <Edit2Icon size={14} />
            Rename
          </button>
          
          <button 
            onClick={() => { onDelete(node); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-red-500 transition-colors text-left"
          >
            <Trash2Icon size={14} />
            Delete
          </button>

          <div className="h-px bg-white/10 my-1 w-full" />

          <button 
            onClick={() => { onProperties(node); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors text-left"
          >
            <InfoIcon size={14} />
            Properties
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
