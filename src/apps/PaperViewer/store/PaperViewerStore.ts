import { FileNode } from '../../../runtime/filesystem/FileSystemTypes';
import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';

export const RESUME_FILE_ID = 'resume-paper';
export const RESUME_FILE_PATH = '/Users/pratham/Desktop/Resume_Prathamraj_Giri.paper';
export const RESUME_FILE_NAME = 'Resume_Prathamraj_Giri.paper';

export const DEFAULT_RESUME_PAPER = `# Prathamraj Giri
### Software Systems Engineer & Architect
> **Location:** India | **Email:** [prathamrajgiri@gmail.com](mailto:prathamrajgiri@gmail.com) | **Portfolio:** [prathame.netlify.app](https://prathame.netlify.app) | **GitHub:** [github.com/Pratham-ji](https://github.com/Pratham-ji)

---

> [!NOTE]
> Passionate Systems & Frontend Engineer focused on crafting high-performance interactive workspaces, operating system abstractions in the browser, and scalable cloud architectures. Bridging the gap between strict low-level system design and silky 60fps user experiences.

---

## 🛠 Core Technical Competencies

- **Languages:** [TypeScript] [JavaScript] [C++] [Python] [SQL] [HTML5/CSS3]
- **Frontend & Runtimes:** [React] [Next.js] [Tailwind CSS] [CSS Modules] [Vite] [Framer Motion] [TanStack Virtual]
- **Systems & Architecture:** [State Machines] [Spatial Indexing] [Virtual File Systems] [Event Driven Systems] [Distributed Architecture]
- **Cloud & Tooling:** [Supabase] [Node.js] [Git] [Docker] [PostgreSQL] [REST & GraphQL APIs]

---

## 💼 Work Experience

### Software Engineer — Aviator Infotech
*Present | Full-time*
- Engineered core application architecture for high-throughput client platforms utilizing [React], [TypeScript], and [Node.js].
- Architected modular frontend design systems with strict CSS containment and sub-16ms render frames.
- Collaborated across distributed engineering teams to enforce 100% type safety and zero-regression deployment pipelines.

### Open Source Contributor — GirlScript Summer of Code (GSSOC)
*Open Source | Global Top 50*
- Ranked **Top 50** globally out of 5,000+ engineers for code contributions to major developer tools and frameworks.
- Implemented core algorithm optimizations and fixed critical accessibility (WCAG AA) regressions in community repositories.

### Freelance Full-Stack Developer — Shopify Ecosystem
*Independent Consultant*
- Delivered custom e-commerce engines and responsive storefronts with sub-second Time-to-Interactive (TTI).
- Optimized client conversion pipelines by 35% through asset pruning, server-side caching, and Lighthouse audits.

---

## 🚀 Key Engineering Projects

### PrathamOS — Web-Based Desktop Operating System
*Architecture: Multi-Tier Microkernel Simulation* | [TypeScript] [React] [CSS Modules] [Framer Motion]
- Built a complete browser-based OS workstation implementing the **PrathamOS Material Design System** (Glass, Metal, Polymer, Canvas, Paper).
- Engineered a zero-dependency **Window Manager** with hardware-accelerated \`translate3d\` transforms, spatial R-tree indexing for hit testing, and collision-free window snapping.
- Implemented a virtual **File System Store** with observable reactive state, indexed full-text search, and lazy application mounting via dynamic code-splitting.

> [!TIP]
> PrathamOS achieves **100 Lighthouse Performance** and maintains a sub-50KB gzipped initial entry footprint.

### StudyBuddy — Collaborative EdTech Platform
*Distributed Full-Stack Workspace* | [React] [Node.js] [Supabase] [PostgreSQL]
- Engineered a real-time collaborative workspace supporting live multi-user document synchronization and query persistence.
- Designed relational schemas with Row Level Security (RLS) guaranteeing tenant isolation across 10,000+ active user sessions.

### High-Performance Spatial Index Engine
*Systems & Algorithms* | [C++] [TypeScript] [Data Structures]
- Implemented 2D spatial indexing (QuadTree and Bounding Box hierarchy) for fast multi-window collision detection and occlusion culling in PrathamOS.
- Reduced viewport paint overhead by 80% through frustum culling of inactive background desktop surfaces.

---

## 🏆 Honors & Competitive Achievements

- **CodeChef Starters 100:** Global Rank **149** out of 5,000+ competitive programmers.
- **GirlScript Summer of Code:** Achieved **Top 50** Global Contributor rank.
- **Solved 400+ Algorithmic Challenges:** Consistent track record across LeetCode & CodeChef covering Dynamic Programming, Graphs, and Advanced Data Structures.

---

## 🎓 Education

### Bachelor of Technology in Computer Science & Engineering
*Core coursework:* Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering.
`;

export const DEFAULT_ARCHITECTURE_PAPER = `# PrathamOS — Systems Architecture Specification
### Material 05 (Paper) Deep-Dive & Kernel Design
> **Author:** Prathamraj Giri | **Version:** 5.0.0 | **Specification:** POS-RFC-009

---

> [!IMPORTANT]
> PrathamOS is designed with strict mathematical constraints: zero layout thrashing, sub-16ms frames (60fps guaranteed), strict memory bounds, and absolute isolation between OS Kernel services and User Space apps.

---

## 1. System Topology

The OS runtime operates in three strictly isolated tiers:
1. **The Foundry (Kernel & Run-time):** Manages WindowManager, SpatialIndex, FileSystemStore, and EventBus.
2. **The Shell (Display Server):** Composites windows, handles global drag sessions, rendering layers, and desktop icons.
3. **User Space (Application Sandbox):** Isolated React applications conforming to the \`AppContract\` interface.

\`\`\`typescript
interface AppContract {
  metadata: { id: string; name: string; icon: string; version: string; description: string };
  windowDefaults: { preferredSize: AppDimensions; minSize: AppDimensions; isResizable: boolean };
  capabilities: { supportsMultipleInstances: boolean; handlesFiles: boolean; fileExtensions?: string[] };
  RootComponent: React.ComponentType<any>;
}
\`\`\`

---

## 2. Material 05: The Paper Paradigm

Unlike digital glass or polished metal surfaces, **Material 05 (Paper)** is engineered specifically for optical comfort during intensive reading sessions.

### Design Tokens
- **Dark Mode (Warm E-Ink Charcoal):**
  - Surface: \`#161514\`
  - Typography: \`#E2DFD9\` (Sepia Text)
  - Subtle Border: \`#2D2A26\`
- **Light Mode (Warm Paper):**
  - Surface: \`#F7F5F2\`
  - Typography: \`#1A1A1E\` (Ink)
  - Subtle Border: \`#E5E0D8\`

> [!NOTE]
> High-contrast pure black and pure white cause optical fatigue over extended document inspection. E-ink sepia mimics real physical cotton fiber reflectance.

---

## 3. Virtual File System (VFS)

The virtual filesystem uses an in-memory B-Tree index supporting **O(log N)** lookups across 100,000+ synthetic files with full subscription reactivity.
`;

export const DEFAULT_SYSTEM_DESIGN_MD = `# PrathamOS System Design & Performance Guidelines
### Technical Implementation Notes

---

## Core Tenets
1. **Zero Global CSS Contamination:** All system modules must use CSS Modules.
2. **Decoupled Stores:** Stores expose observable subscriptions; UI components never mutate store internals directly.
3. **Hardware Acceleration:** All geometric transforms (dragging, resizing) utilize GPU composited layers via \`transform: translate3d()\`.

---

## Supported File Formats in PaperViewer
- \`.paper\` — PrathamOS Rich Authoring & E-Ink Document
- \`.md\` — Markdown format with callout support
- \`.cpp\` — C++ System Implementations
- \`.code\` — Code and schema files
- \`.txt\` — Plaintext documentation
`;

export const DEFAULT_SPATIAL_INDEX_CPP = `/**
 * SpatialIndex.cpp — PrathamOS 2D Bounding Box QuadTree
 * Provides O(log N) hit testing for desktop windows and icons.
 */

#include <vector>
#include <memory>
#include <algorithm>

struct Rect {
    float x, y, width, height;
    bool contains(float px, float py) const {
        return px >= x && px <= x + width && py >= y && py <= y + height;
    }
    bool intersects(const Rect& other) const {
        return !(x + width < other.x || other.x + other.width < x ||
                 y + height < other.y || other.y + other.height < y);
    }
};

struct WindowNode {
    std::string windowId;
    Rect bounds;
    int layer;
};

class SpatialQuadTree {
private:
    static const int MAX_OBJECTS = 8;
    static const int MAX_LEVELS = 6;
    
    int level;
    Rect bounds;
    std::vector<WindowNode> objects;
    std::unique_ptr<SpatialQuadTree> nodes[4];
    
public:
    SpatialQuadTree(int pLevel, Rect pBounds) : level(pLevel), bounds(pBounds) {}
    
    void clear() {
        objects.clear();
        for (int i = 0; i < 4; ++i) {
            if (nodes[i]) {
                nodes[i]->clear();
                nodes[i].reset();
            }
        }
    }
    
    // Fast point query for highest z-order window
    std::string queryTopWindow(float x, float y) {
        if (!bounds.contains(x, y)) return "";
        std::string topId = "";
        int highestLayer = -1;
        for (const auto& obj : objects) {
            if (obj.bounds.contains(x, y) && obj.layer > highestLayer) {
                highestLayer = obj.layer;
                topId = obj.windowId;
            }
        }
        for (int i = 0; i < 4; ++i) {
            if (nodes[i]) {
                std::string childHit = nodes[i]->queryTopWindow(x, y);
                if (!childHit.empty()) return childHit;
            }
        }
        return topId;
    }
};
`;

export const DEFAULT_README_MD = `# Welcome to PrathamOS PaperViewer
### High-Performance Document Reader

PaperViewer provides glare-free document rendering for \`.paper\`, \`.md\`, and source code files.

- **Split View:** Collapsible document browser on the left.
- **Actions:** Quick email copy, print preview, and reading metrics.
- **Themes:** Fully synchronized with PrathamOS Light & Dark themes.
`;

const DOCUMENT_MAP: Record<string, string> = {
  [RESUME_FILE_ID]: DEFAULT_RESUME_PAPER,
  [RESUME_FILE_NAME]: DEFAULT_RESUME_PAPER,
  [RESUME_FILE_PATH]: DEFAULT_RESUME_PAPER,
  'architecture-paper': DEFAULT_ARCHITECTURE_PAPER,
  'Architecture_PrathamOS.paper': DEFAULT_ARCHITECTURE_PAPER,
  'system-design-md': DEFAULT_SYSTEM_DESIGN_MD,
  'System_Design.md': DEFAULT_SYSTEM_DESIGN_MD,
  'spatial-index-cpp': DEFAULT_SPATIAL_INDEX_CPP,
  'SpatialIndex.cpp': DEFAULT_SPATIAL_INDEX_CPP,
  'readme-md': DEFAULT_README_MD,
  'README.md': DEFAULT_README_MD,
};

export class PaperViewerStoreImpl {
  private selectedFileId: string = RESUME_FILE_ID;
  private selectedFileName: string = RESUME_FILE_NAME;
  private selectedFileContent: string = DEFAULT_RESUME_PAPER;
  private isSidebarOpen: boolean = true;
  private subscribers: Set<() => void> = new Set();

  constructor() {
    // Attempt to register default files into FileSystemStore if needed
  }

  public subscribe(cb: () => void): () => void {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  private notify() {
    this.subscribers.forEach(cb => cb());
  }

  public getSelectedFileId(): string {
    return this.selectedFileId;
  }

  public getSelectedFileName(): string {
    return this.selectedFileName;
  }

  public getSelectedFileContent(): string {
    return this.selectedFileContent;
  }

  public getIsSidebarOpen(): boolean {
    return this.isSidebarOpen;
  }

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.notify();
  }

  public setSidebarOpen(open: boolean) {
    this.isSidebarOpen = open;
    this.notify();
  }

  public openFile(node: FileNode) {
    this.selectedFileId = node.id;
    this.selectedFileName = node.name;

    if (node.content && node.content.trim().length > 0) {
      this.selectedFileContent = node.content;
    } else if (DOCUMENT_MAP[node.id]) {
      this.selectedFileContent = DOCUMENT_MAP[node.id];
    } else if (DOCUMENT_MAP[node.name]) {
      this.selectedFileContent = DOCUMENT_MAP[node.name];
    } else {
      // Fallback content generated based on file type
      this.selectedFileContent = this.generateFallbackContent(node);
    }

    this.notify();
  }

  public openFileById(id: string) {
    const node = FileSystemStore.getNode(id);
    if (node) {
      this.openFile(node);
      return;
    }

    if (DOCUMENT_MAP[id]) {
      this.selectedFileId = id;
      this.selectedFileName = id.endsWith('.paper') || id.endsWith('.md') ? id : `${id}.paper`;
      this.selectedFileContent = DOCUMENT_MAP[id];
      this.notify();
    }
  }

  public openFileByName(nameOrPath: string) {
    return this.openByPathOrName(nameOrPath);
  }

  public openByPathOrName(nameOrPath: string) {
    const clean = nameOrPath.trim();
    // 1. Direct match on known document
    if (DOCUMENT_MAP[clean]) {
      const fileName = clean.split('/').pop() || clean;
      this.selectedFileId = clean;
      this.selectedFileName = fileName;
      this.selectedFileContent = DOCUMENT_MAP[clean];
      this.notify();
      return;
    }

    // 2. Query FileSystemStore
    if (typeof (FileSystemStore as any).findNodeByNameOrPath === 'function') {
      const matched = (FileSystemStore as any).findNodeByNameOrPath(clean);
      if (matched) {
        this.openFile(matched);
        return;
      }
    }

    // 3. Match from getChildren('desktop') or similar
    const desktopChildren = FileSystemStore.getChildren('desktop');
    const match = desktopChildren.find(
      c => c.name.toLowerCase() === clean.toLowerCase() || c.id === clean
    );
    if (match) {
      this.openFile(match);
      return;
    }

    // Fallback: transient document
    const baseName = clean.split('/').pop() || clean;
    this.selectedFileId = clean;
    this.selectedFileName = baseName;
    this.selectedFileContent = `# ${baseName}\n\n*Created in PaperViewer*\n\nDocument contents empty.`;
    this.notify();
  }

  public getDocumentFiles(): FileNode[] {
    const docExtensions = ['.paper', '.md', '.txt', '.code', '.cpp'];
    const results: FileNode[] = [];
    const seenIds = new Set<string>();

    const checkAndAdd = (node: FileNode) => {
      if (seenIds.has(node.id)) return;
      if (node.id.startsWith('bench') || node.parentId?.startsWith('bench') || node.id.startsWith('file-')) return;
      if (!node.isDirectory && docExtensions.some(ext => node.name.toLowerCase().endsWith(ext))) {
        seenIds.add(node.id);
        results.push(node);
      }
    };

    // 1. Traverse standard user directories
    const primaryDirs = ['desktop', 'projects', 'algorithms', 'user-system', 'portfolio', 'documents', 'downloads'];
    primaryDirs.forEach(folderId => {
      FileSystemStore.getChildren(folderId).forEach(checkAndAdd);
    });

    // 2. Ensure default document entries are present
    const defaultEntries: FileNode[] = [
      {
        id: RESUME_FILE_ID,
        name: RESUME_FILE_NAME,
        isDirectory: false,
        parentId: 'desktop',
        metadata: { size: 4820, lastModified: new Date() },
        content: DEFAULT_RESUME_PAPER
      },
      {
        id: 'architecture-paper',
        name: 'Architecture_PrathamOS.paper',
        isDirectory: false,
        parentId: 'desktop',
        metadata: { size: 6150, lastModified: new Date() },
        content: DEFAULT_ARCHITECTURE_PAPER
      },
      {
        id: 'system-design-md',
        name: 'System_Design.md',
        isDirectory: false,
        parentId: 'desktop',
        metadata: { size: 3400, lastModified: new Date() },
        content: DEFAULT_SYSTEM_DESIGN_MD
      },
      {
        id: 'spatial-index-cpp',
        name: 'SpatialIndex.cpp',
        isDirectory: false,
        parentId: 'desktop',
        metadata: { size: 2800, lastModified: new Date() },
        content: DEFAULT_SPATIAL_INDEX_CPP
      },
      {
        id: 'readme-md',
        name: 'README.md',
        isDirectory: false,
        parentId: 'desktop',
        metadata: { size: 1200, lastModified: new Date() },
        content: DEFAULT_README_MD
      }
    ];

    defaultEntries.forEach(entry => {
      if (!seenIds.has(entry.id)) {
        seenIds.add(entry.id);
        results.push(entry);
      }
    });

    return results;
  }

  private generateFallbackContent(node: FileNode): string {
    const ext = node.name.split('.').pop()?.toLowerCase();
    return `# ${node.name}
> File ID: \`${node.id}\` | Size: ${node.metadata?.size ? (node.metadata.size / 1024).toFixed(1) + ' KB' : 'Unknown'}

---

> [!NOTE]
> File inspected via PrathamOS PaperViewer.

\`\`\`${ext || 'text'}
// Raw file buffer preview
// File: ${node.name}
\`\`\`
`;
  }
}

export const PaperViewerStore = new PaperViewerStoreImpl();
