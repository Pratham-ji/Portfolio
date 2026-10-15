import React, { useState, useEffect } from 'react';
import styles from './Explorer.module.css';
import { TreeRenderer } from './components/TreeRenderer';
import { PathBar } from './components/PathBar';
import { FileGrid } from './components/FileGrid';
import { PreviewRenderer } from './preview/PreviewRenderer';
import { FileSystemStore } from '../../runtime/filesystem/FileSystemStore';
import { FileNode } from '../../runtime/filesystem/FileSystemTypes';
import { Sidebar } from '../../design-system/components/Sidebar';
import { Splitter } from '../../design-system/components/Splitter';
import { SearchIndexer } from '../../runtime/filesystem/SearchIndexer';
import { TreeController } from './components/TreeController';
import { ContextMenuService, ContextMenuOptions } from '../../runtime/services/ContextMenuService';

export const ExplorerApp: React.FC = () => {
  const [activeFolderId, setActiveFolderId] = useState('pratham');
  const [previewNode, setPreviewNode] = useState<FileNode | null>(null);
  const [files, setFiles] = useState<FileNode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Context Menu state
  const [cmOptions, setCmOptions] = useState<ContextMenuOptions | null>(null);

  useEffect(() => {
    const unsub = ContextMenuService.subscribe((opts) => {
      setCmOptions(opts);
    });
    return unsub;
  }, []);

  useEffect(() => {
    TreeController.setActive(activeFolderId);
    
    if (searchQuery) {
      setFiles(SearchIndexer.search(searchQuery));
    } else {
      setFiles(FileSystemStore.getChildren(activeFolderId));
    }
  }, [activeFolderId, searchQuery]);

  const handleNavigate = (id: string) => {
    setActiveFolderId(id);
    setSearchQuery('');
  };

  const [previewWidth, setPreviewWidth] = useState(240);

  return (
    <div className={styles.explorerLayout} aria-label="Explorer Window" onClick={() => ContextMenuService.hide()}>
      <Sidebar density="comfortable">
        <TreeRenderer onNavigate={handleNavigate} />
      </Sidebar>
      
      <div className={styles.mainArea}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--pos-surface-0)' }}>
          <div style={{ flex: 1 }}>
            <PathBar 
              activeFolderId={activeFolderId} 
              onNavigate={handleNavigate} 
            />
          </div>
          <div style={{ padding: '0 16px' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'var(--pos-surface-hover)',
                border: '1px solid var(--pos-border-subtle)',
                borderRadius: '12px',
                padding: '4px 12px',
                fontSize: '12px',
                color: 'var(--pos-text-primary)',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <FileGrid 
              files={files} 
              onNavigate={handleNavigate} 
              onPreview={setPreviewNode}
            />
          </div>
          
          {previewNode && (
            <>
              <Splitter orientation="vertical" onResize={(delta) => setPreviewWidth(w => Math.max(150, Math.min(500, w - delta)))} />
              <div style={{ width: previewWidth, display: 'flex', flexDirection: 'column' }}>
                <PreviewRenderer node={previewNode} />
              </div>
            </>
          )}
        </div>
      </div>

      {cmOptions && (
        <div 
          style={{ 
            position: 'absolute', 
            top: cmOptions.y, 
            left: cmOptions.x, 
            backgroundColor: 'var(--pos-surface-0)', 
            border: '1px solid var(--pos-border-subtle)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '4px',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            minWidth: '150px'
          }}
        >
          {cmOptions.items.map(item => (
            <div 
              key={item.id}
              onClick={() => {
                item.action();
                ContextMenuService.hide();
              }}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--pos-color-primary)') && (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent') && (e.currentTarget.style.color = 'var(--pos-text-primary)')}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
