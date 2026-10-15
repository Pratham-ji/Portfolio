import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaperViewerApp } from '../PaperViewerApp';
import { PaperViewerManifest } from '../manifest';
import { PaperViewerStore, RESUME_FILE_NAME } from '../store/PaperViewerStore';
import { DocumentRenderer } from '../components/DocumentRenderer';
import { ApplicationRegistry } from '../../registry/ApplicationRegistry';
import { openCommand } from '../../terminal/commands/open';
import { toast } from '../../../design-system/components/Toast';

vi.mock('../../../design-system/motion/MotionScheduler', () => ({
  MotionScheduler: { 
    schedule: vi.fn(() => ({ finished: Promise.resolve() })) 
  }
}));

describe('PaperViewer Manifest & Registration', () => {
  it('conforms to AppContract and registers in ApplicationRegistry', () => {
    expect(PaperViewerManifest.metadata.id).toBe('prathamos.paper');
    expect(PaperViewerManifest.metadata.name).toBe('Paper');
    expect(PaperViewerManifest.metadata.version).toBe('5.0.0');
    expect(PaperViewerManifest.capabilities.handlesFiles).toBe(true);
    expect(PaperViewerManifest.capabilities.fileExtensions).toContain('.paper');
    expect(PaperViewerManifest.capabilities.fileExtensions).toContain('.md');
    expect(PaperViewerManifest.capabilities.fileExtensions).toContain('.cpp');

    // Check ApplicationRegistry registration
    const registeredApp = ApplicationRegistry.getApp('prathamos.paper');
    expect(registeredApp).toBeDefined();
    expect(registeredApp?.metadata.name).toBe('Paper');

    // Check alias resolution
    expect(ApplicationRegistry.getApp('paper')).toBeDefined();
    expect(ApplicationRegistry.getApp('resume')).toBeDefined();
  });
});

describe('PaperViewerStore Observable Store', () => {
  beforeEach(() => {
    PaperViewerStore.openByPathOrName(RESUME_FILE_NAME);
  });

  it('initializes with default resume document and metadata', () => {
    expect(PaperViewerStore.getSelectedFileName()).toBe(RESUME_FILE_NAME);
    expect(PaperViewerStore.getSelectedFileContent()).toContain('Prathamraj Giri');
    expect(PaperViewerStore.getIsSidebarOpen()).toBe(true);
  });

  it('notifies subscribers on openFile and toggleSidebar', () => {
    const listener = vi.fn();
    const unsub = PaperViewerStore.subscribe(listener);

    PaperViewerStore.toggleSidebar();
    expect(listener).toHaveBeenCalled();
    expect(PaperViewerStore.getIsSidebarOpen()).toBe(false);

    PaperViewerStore.setSidebarOpen(true);
    expect(PaperViewerStore.getIsSidebarOpen()).toBe(true);

    PaperViewerStore.openFile({
      id: 'custom-doc',
      name: 'Custom_Notes.md',
      isDirectory: false,
      parentId: 'desktop',
      content: '# Custom Title\n\nContent details.'
    });

    expect(PaperViewerStore.getSelectedFileName()).toBe('Custom_Notes.md');
    expect(PaperViewerStore.getSelectedFileContent()).toBe('# Custom Title\n\nContent details.');

    unsub();
  });

  it('retrieves document files matching supported extensions', () => {
    const docs = PaperViewerStore.getDocumentFiles();
    expect(docs.length).toBeGreaterThan(0);
    const resumeEntry = docs.find(d => d.name === RESUME_FILE_NAME || d.id === 'resume-paper');
    expect(resumeEntry).toBeDefined();
  });
});

describe('DocumentRenderer & Inline Parsing', () => {
  it('renders headers, dividers, and callouts', () => {
    const markdown = `# Main Title
## Section Title
### Subheader
---
> [!NOTE]
> This is a crucial system note.
> [!TIP]
> This is a performance tip.
`;

    const { container } = render(<DocumentRenderer content={markdown} fileName="test.paper" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subheader');
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(screen.getByText('NOTE')).toBeInTheDocument();
    expect(screen.getByText(/crucial system note/i)).toBeInTheDocument();
    expect(screen.getByText('TIP')).toBeInTheDocument();
    expect(screen.getByText(/performance tip/i)).toBeInTheDocument();
  });

  it('renders skill badges for bracketed tech terms', () => {
    const content = `Competencies: [TypeScript] [React] [C++]`;
    render(<DocumentRenderer content={content} fileName="skills.paper" />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('C++')).toBeInTheDocument();
  });

  it('renders markdown links and code blocks', () => {
    const content = `Link to [Portfolio](https://prathame.netlify.app)
\`\`\`cpp
int main() { return 0; }
\`\`\`
`;
    render(<DocumentRenderer content={content} fileName="sample.md" />);

    const link = screen.getByRole('link', { name: 'Portfolio' });
    expect(link).toHaveAttribute('href', 'https://prathame.netlify.app');
    expect(screen.getByText(/int main\(\)/)).toBeInTheDocument();
  });
});

describe('PaperViewerApp UI & Actions', () => {
  beforeEach(() => {
    PaperViewerStore.openByPathOrName(RESUME_FILE_NAME);
    PaperViewerStore.setSidebarOpen(true);
  });

  it('renders toolbar, document title, and reading metrics', () => {
    render(<PaperViewerApp />);

    expect(screen.getAllByText(RESUME_FILE_NAME).length).toBeGreaterThan(0);
    expect(screen.getByText(/min read/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy Email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Print \/ Export PDF/i })).toBeInTheDocument();
  });

  it('toggles sidebar when clicking sidebar toggle button', () => {
    render(<PaperViewerApp />);

    const toggleBtn = screen.getByRole('button', { name: /Toggle Sidebar/i });
    fireEvent.click(toggleBtn);
    expect(PaperViewerStore.getIsSidebarOpen()).toBe(false);

    fireEvent.click(toggleBtn);
    expect(PaperViewerStore.getIsSidebarOpen()).toBe(true);
  });

  it('copies email and triggers toast notification', async () => {
    const toastSpy = vi.spyOn(toast, 'show').mockImplementation(() => {});
    const clipboardSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: clipboardSpy
      }
    });

    render(<PaperViewerApp />);

    const copyBtn = screen.getByRole('button', { name: /Copy Email/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(clipboardSpy).toHaveBeenCalledWith('prathamrajgiri@gmail.com');
      expect(toastSpy).toHaveBeenCalledWith('Email Copied', 'prathamrajgiri@gmail.com copied to clipboard');
    });
    toastSpy.mockRestore();
  });

  it('calls window.print when clicking Print / Export PDF button', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    render(<PaperViewerApp />);

    const printBtn = screen.getByRole('button', { name: /Print \/ Export PDF/i });
    fireEvent.click(printBtn);

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('allows document switching from the sidebar', () => {
    render(<PaperViewerApp />);

    const docItems = screen.getAllByRole('button');
    const archDoc = docItems.find(btn => btn.textContent?.includes('Architecture_PrathamOS.paper'));
    if (archDoc) {
      fireEvent.click(archDoc);
      expect(PaperViewerStore.getSelectedFileName()).toBe('Architecture_PrathamOS.paper');
    }
  });
});

describe('Terminal open integration', () => {
  it('opens a document via terminal open command', async () => {
    const result = await openCommand.execute(['Resume_Prathamraj_Giri.paper'], 'desktop');
    expect(result.lines[0].segments[0].text).toContain('Opened Resume_Prathamraj_Giri.paper in PaperViewer');
    expect(PaperViewerStore.getSelectedFileName()).toBe('Resume_Prathamraj_Giri.paper');
  });
});
