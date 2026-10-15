import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './PaperViewer.module.css';
import { PaperViewerStore } from './store/PaperViewerStore';
import { DocumentRenderer } from './components/DocumentRenderer';
import { Paper } from '../../design-system/components/Paper';
import { toast } from '../../design-system/components/Toast';
import { FileNode } from '../../runtime/filesystem/FileSystemTypes';
import { 
  PanelLeft, 
  PanelLeftClose, 
  Mail, 
  Printer, 
  FileText, 
  FileCode, 
  Code, 
  File as FileIcon, 
  Search,
  Check
} from 'lucide-react';

export const PaperViewerApp: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(PaperViewerStore.getSelectedFileId());
  const [fileName, setFileName] = useState<string>(PaperViewerStore.getSelectedFileName());
  const [content, setContent] = useState<string>(PaperViewerStore.getSelectedFileContent());
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(PaperViewerStore.getIsSidebarOpen());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [files, setFiles] = useState<FileNode[]>([]);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  // Sync with PaperViewerStore
  useEffect(() => {
    const syncFromStore = () => {
      setSelectedId(PaperViewerStore.getSelectedFileId());
      setFileName(PaperViewerStore.getSelectedFileName());
      setContent(PaperViewerStore.getSelectedFileContent());
      setIsSidebarOpen(PaperViewerStore.getIsSidebarOpen());
      setFiles(PaperViewerStore.getDocumentFiles());
    };

    syncFromStore();
    const unsub = PaperViewerStore.subscribe(syncFromStore);
    return unsub;
  }, []);

  // Compute Word Count & Reading Time
  const metrics = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, minutes };
  }, [content]);

  // Determine Paper Mode
  const paperMode = useMemo(() => {
    const lower = fileName.toLowerCase();
    if (lower.includes('resume') || lower.endsWith('.paper')) {
      return 'resume';
    }
    return 'markdown';
  }, [fileName]);

  // Filtered files in sidebar
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return files;
    const q = searchQuery.toLowerCase();
    return files.filter(f => f.name.toLowerCase().includes(q));
  }, [files, searchQuery]);

  // Actions
  const handleCopyEmail = () => {
    const email = 'prathamrajgiri@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(true);
      toast.show('Email Copied', `${email} copied to clipboard`);
      setTimeout(() => setCopiedEmail(false), 2500);
    }).catch(() => {
      toast.show('Copy Failed', 'Unable to copy to clipboard');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleSidebar = () => {
    PaperViewerStore.toggleSidebar();
  };

  const handleSelectFile = (file: FileNode) => {
    PaperViewerStore.openFile(file);
    if (contentAreaRef.current && typeof contentAreaRef.current.scrollTo === 'function') {
      contentAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper for item icon based on file extension
  const getFileIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith('.paper')) return <FileText size={15} color="#0A84FF" />;
    if (lower.endsWith('.md')) return <FileCode size={15} color="#30D158" />;
    if (lower.endsWith('.cpp') || lower.endsWith('.code')) return <Code size={15} color="#FF9F0A" />;
    return <FileIcon size={15} />;
  };

  return (
    <div className={styles.paperViewerRoot}>
      {/* Top Action Toolbar (44px height) */}
      <header className={styles.toolbar} role="toolbar" aria-label="Document Toolbar">
        <div className={styles.toolbarLeft}>
          <button 
            onClick={handleToggleSidebar}
            className={`${styles.iconButton} ${isSidebarOpen ? styles.iconButtonActive : ''}`}
            title={isSidebarOpen ? 'Hide Document Sidebar' : 'Show Document Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
          </button>

          <div className={styles.titleArea}>
            <span className={styles.documentTitle}>{fileName}</span>
            <span className={styles.readingBadge}>
              {metrics.words} words • {metrics.minutes} min read
            </span>
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <button 
            onClick={handleCopyEmail}
            className={styles.actionButton}
            title="Copy Contact Email"
          >
            {copiedEmail ? <Check size={14} color="#30D158" /> : <Mail size={14} />}
            <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
          </button>

          <button 
            onClick={handlePrint}
            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
            title="Print Document or Export PDF"
          >
            <Printer size={14} />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </header>

      {/* Split Workspace Layout */}
      <div className={styles.workspace}>
        {/* Collapsible Document Sidebar (220px) */}
        <aside 
          className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
          aria-label="Document List"
        >
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLabel}>Documents</span>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="Filter files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.sidebarSearch}
              />
              <Search size={13} style={{ position: 'absolute', right: 8, opacity: 0.4, pointerEvents: 'none' }} />
            </div>
          </div>

          <nav className={styles.sidebarList}>
            {filteredFiles.map((file) => {
              const isSelected = file.id === selectedId || file.name === fileName;
              const formattedSize = file.metadata?.size 
                ? `${(file.metadata.size / 1024).toFixed(1)} KB` 
                : '';

              return (
                <button
                  key={file.id}
                  onClick={() => handleSelectFile(file)}
                  className={`${styles.sidebarItem} ${isSelected ? styles.sidebarItemActive : ''}`}
                  title={file.name}
                >
                  <span className={styles.sidebarItemIcon}>
                    {getFileIcon(file.name)}
                  </span>
                  <span className={styles.sidebarItemTitle}>
                    {file.name}
                  </span>
                  {formattedSize && (
                    <span className={styles.sidebarItemMeta}>
                      {formattedSize}
                    </span>
                  )}
                </button>
              );
            })}

            {filteredFiles.length === 0 && (
              <div style={{ padding: '16px 8px', fontSize: '11px', opacity: 0.5, textAlign: 'center' }}>
                No matching documents
              </div>
            )}
          </nav>
        </aside>

        {/* Main Document Area */}
        <main ref={contentAreaRef} className={styles.contentArea}>
          <Paper mode={paperMode} className={styles.paperSheet}>
            <DocumentRenderer content={content} fileName={fileName} />
          </Paper>
        </main>
      </div>
    </div>
  );
};
