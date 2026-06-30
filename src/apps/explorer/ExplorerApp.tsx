import React, { useState, useMemo } from 'react';
import { useFileSystem, FileSystemNode } from '../../core/file-system';
import { Sidebar } from './components/Sidebar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { FileGrid, FileList } from './components/FileViews';
import { FilePreview } from './components/FilePreview';
import { FolderOpenIcon } from 'lucide-react';

const ExplorerApp: React.FC = () => {
  const { state: fsState } = useFileSystem();
  
  const [currentPath, setCurrentPath] = useState('/home/pratham');
  const [history, setHistory] = useState<string[]>(['/home/pratham']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [previewFile, setPreviewFile] = useState<FileSystemNode | null>(null);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    
    // We only keep history up to current index, drop future
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1] || '/');
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1] || '/');
    }
  };

  const goUp = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    navigate('/' + parts.join('/'));
  };

  const handleOpenNode = (node: FileSystemNode) => {
    if (node.type === 'directory') {
      const newPath = currentPath === '/' ? `/${node.name}` : `${currentPath}/${node.name}`;
      navigate(newPath);
    } else {
      setPreviewFile(node);
    }
  };

  // Get current directory children
  const children = useMemo(() => {
    return Object.values(fsState.nodes)
      .filter(n => n.parentId === currentPath)
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  }, [fsState.nodes, currentPath]);

  return (
    <div className="w-full h-full flex flex-col bg-[#111111] text-white overflow-hidden rounded-b-xl relative">
      <Breadcrumbs 
        currentPath={currentPath}
        history={history}
        historyIndex={historyIndex}
        viewMode={viewMode}
        onNavigate={navigate}
        onNavigateBack={goBack}
        onNavigateForward={goForward}
        onNavigateUp={goUp}
        onSetViewMode={setViewMode}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPath={currentPath} onNavigate={navigate} />
        
        <div className="flex-1 overflow-y-auto bg-black/40 relative">
          {children.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 gap-4">
              <FolderOpenIcon size={64} className="opacity-50" />
              <p>This folder is empty</p>
            </div>
          ) : (
            viewMode === 'grid' 
              ? <FileGrid nodes={children} viewMode={viewMode} onOpen={handleOpenNode} />
              : <FileList nodes={children} viewMode={viewMode} onOpen={handleOpenNode} />
          )}
        </div>
      </div>

      {previewFile && (
        <FilePreview file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  );
};

export default ExplorerApp;
