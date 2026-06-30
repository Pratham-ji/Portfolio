import React from 'react';
import { FileSystemNode } from '../../../core/file-system';
import { FolderIcon, FileIcon, FileTextIcon, ImageIcon, CodeIcon } from 'lucide-react';

interface FileListProps {
  nodes: FileSystemNode[];
  viewMode: 'grid' | 'list';
  onOpen: (node: FileSystemNode) => void;
  onContextMenu: (e: React.MouseEvent, node: FileSystemNode) => void;
}

const getFileIcon = (node: FileSystemNode) => {
  if (node.type === 'directory') return <FolderIcon size={32} className="text-blue-400" fill="currentColor" fillOpacity={0.2} />;
  
  if (node.name.endsWith('.md') || node.name.endsWith('.txt')) return <FileTextIcon size={32} className="text-white/80" />;
  if (node.name.endsWith('.png') || node.name.endsWith('.jpg')) return <ImageIcon size={32} className="text-purple-400" />;
  if (node.name.endsWith('.json') || node.name.endsWith('.ts')) return <CodeIcon size={32} className="text-yellow-400" />;
  
  return <FileIcon size={32} className="text-white/60" />;
};

const getSmallFileIcon = (node: FileSystemNode) => {
  if (node.type === 'directory') return <FolderIcon size={16} className="text-blue-400" fill="currentColor" fillOpacity={0.2} />;
  
  if (node.name.endsWith('.md') || node.name.endsWith('.txt')) return <FileTextIcon size={16} className="text-white/80" />;
  if (node.name.endsWith('.png') || node.name.endsWith('.jpg')) return <ImageIcon size={16} className="text-purple-400" />;
  if (node.name.endsWith('.json') || node.name.endsWith('.ts')) return <CodeIcon size={16} className="text-yellow-400" />;
  
  return <FileIcon size={16} className="text-white/60" />;
};

export const FileGrid: React.FC<FileListProps> = ({ nodes, onOpen, onContextMenu }) => {
  return (
    <div className="p-4 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 content-start">
      {nodes.map(node => (
        <button
          key={node.id}
          onDoubleClick={() => onOpen(node)}
          onContextMenu={(e) => onContextMenu(e, node)}
          className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 group focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform">
            {getFileIcon(node)}
          </div>
          <span className="text-xs text-center text-white/90 break-all line-clamp-2 w-full">{node.name}</span>
        </button>
      ))}
    </div>
  );
};

export const FileList: React.FC<FileListProps> = ({ nodes, onOpen, onContextMenu }) => {
  return (
    <div className="p-2 flex flex-col gap-0.5">
      <div className="flex items-center px-3 py-1.5 text-xs font-semibold text-white/50 border-b border-white/5 mb-1">
        <div className="flex-1">Name</div>
        <div className="w-24 text-right">Type</div>
        <div className="w-24 text-right">Size</div>
      </div>
      {nodes.map(node => (
        <button
          key={node.id}
          onDoubleClick={() => onOpen(node)}
          onContextMenu={(e) => onContextMenu(e, node)}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 group focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-left"
        >
          {getSmallFileIcon(node)}
          <span className="text-sm text-white/90 truncate flex-1">{node.name}</span>
          <span className="w-24 text-xs text-white/50 text-right truncate capitalize">{node.type}</span>
          <span className="w-24 text-xs text-white/50 text-right">{node.type === 'directory' ? '--' : `${node.content?.length || 0} B`}</span>
        </button>
      ))}
    </div>
  );
};
