import React from 'react';
import { FileSystemNode } from '../../../core/file-system';
import { XIcon, FileTextIcon, DownloadIcon } from 'lucide-react';

interface FilePreviewProps {
  file: FileSystemNode;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);

  const handleDownload = () => {
    const blob = new Blob([file.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-full bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <FileTextIcon size={18} className="text-white/70 flex-shrink-0" />
            <span className="font-medium text-white/90 truncate">{file.name}</span>
            <span className="text-xs text-white/40">{file.content?.length || 0} bytes</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleDownload}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Download"
            >
              <DownloadIcon size={18} />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors ml-1"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e]">
          {isImage ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/50 flex flex-col items-center gap-2">
                <FileTextIcon size={48} className="opacity-20" />
                <p>Image preview not available for virtual files</p>
              </div>
            </div>
          ) : (
            <pre className="font-mono text-sm text-[#d4d4d4] whitespace-pre-wrap break-words">
              {file.content || '(empty file)'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
