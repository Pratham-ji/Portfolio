import React from 'react';
import styles from '../Explorer.module.css';
import { FileNode } from '../../../runtime/filesystem/FileSystemTypes';

interface PreviewProps {
  node: FileNode;
}

const MarkdownPreview: React.FC<PreviewProps> = ({ node }) => (
  <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap', color: 'var(--pos-text-secondary)', lineHeight: 1.6 }}>
    {node.content || `# ${node.name}\n\n(Markdown preview content would be rendered here.)`}
  </div>
);

const TextPreview: React.FC<PreviewProps> = ({ node }) => (
  <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '11px', whiteSpace: 'pre-wrap', color: 'var(--pos-text-primary)', lineHeight: 1.5 }}>
    {node.content || `(Contents of ${node.name})`}
  </div>
);

const ImagePreview: React.FC<PreviewProps> = ({ node }) => (
  <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--pos-surface-hover)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      🖼️
    </div>
  </div>
);

const FolderPreview: React.FC<PreviewProps> = ({ node }) => (
  <div style={{ padding: '16px', textAlign: 'center' }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
    <div style={{ fontSize: '14px', fontWeight: 600 }}>{node.name}</div>
    <div style={{ fontSize: '12px', color: 'var(--pos-text-secondary)', marginTop: '8px' }}>
      {node.childrenIds?.length || 0} items
    </div>
  </div>
);

const UnknownPreview: React.FC<PreviewProps> = ({ node }) => (
  <div style={{ padding: '16px', textAlign: 'center' }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
    <div style={{ fontSize: '14px', fontWeight: 600 }}>{node.name}</div>
    <div style={{ fontSize: '12px', color: 'var(--pos-text-secondary)', marginTop: '8px' }}>
      {node.metadata?.size ? (node.metadata.size / 1024).toFixed(1) + ' KB' : 'Unknown size'}
    </div>
  </div>
);

export const PreviewRenderer: React.FC<{ node: FileNode | null }> = ({ node }) => {
  if (!node) {
    return (
      <div className={styles.emptyState}>
        Select a file to preview
      </div>
    );
  }

  let PreviewComponent = UnknownPreview;
  if (node.isDirectory) {
    PreviewComponent = FolderPreview;
  } else if (node.name.endsWith('.md')) {
    PreviewComponent = MarkdownPreview;
  } else if (node.name.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
    PreviewComponent = ImagePreview;
  } else if (node.content) {
    PreviewComponent = TextPreview;
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--pos-surface-1)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--pos-border-subtle)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--pos-text-secondary)' }}>
        Preview
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <PreviewComponent node={node} />
      </div>
    </div>
  );
};
