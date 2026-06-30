export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  problemStatement: string;
  architecture: string;
  designDecisions: string[];
  challenges: string[];
  solutions: string[];
  optimizations: string[];
  techStack: string[];
  repositoryUrl: string | 'Coming Soon';
  liveDemoUrl: string | 'Coming Soon';
  futureWork: string[];
}

export const projectsData: ProjectData[] = [
  {
    id: 'prathamos',
    name: 'PrathamOS',
    tagline: 'A web-based desktop environment simulating a full operating system.',
    overview: 'PrathamOS is an engineering project first and a portfolio second. It was designed to demonstrate the application of modern software engineering principles—including modular architecture, maintainability, accessibility, security, performance, and scalability—within a cohesive desktop environment built entirely with web technologies.',
    problemStatement: 'Traditional web portfolios are often static and fail to demonstrate complex state management, architectural discipline, and true software engineering rigor. There was a need for a platform that could showcase advanced system design concepts like isolated runtimes, robust event systems, and complex UI state coordination within a browser.',
    architecture: 'The system utilizes a multi-layered architecture: Foundry (Core System Managers), Shell (Desktop, Windowing, Overlay UIs), and User Space (Standalone applications). Communication is mediated through highly decoupled React Context providers enforcing strict dependency inversion.',
    designDecisions: [
      'Implemented a strictly decoupled AppManifest registry rather than hardcoding imports.',
      'Adopted CSS modules and semantic variables over utility classes for system-level theme tokens.',
      'Used Framer Motion exclusively for animation to maintain performance budgets.',
      'Enforced a 10-point complexity limit on all functions via ESLint.'
    ],
    challenges: [
      'Managing global z-index scaling for draggable, resizable windows without layout thrashing.',
      'Ensuring React state updates within hooks did not trigger cascading re-renders across the entire desktop.'
    ],
    solutions: [
      'Implemented a centralized WindowManager that guarantees active windows always receive the highest z-index without manual DOM manipulation.',
      'Used memoization strictly and pushed volatile state to the edges of the React tree (e.g., active states localized to specific wrapper components).'
    ],
    optimizations: [
      'Lazy loading all User Space applications to keep initial bundle size below 30 KB gzipped.',
      'Debounced spotlight search inputs to prevent main-thread locking.',
      'Moved window dragging to translate3d hardware-accelerated CSS properties.'
    ],
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
    repositoryUrl: 'https://github.com/Pratham-ji/Portfolio.git',
    liveDemoUrl: 'https://prathame.netlify.app',
    futureWork: [
      'Mobile platform support (Phase 6).',
      'Integration of WebAssembly modules for heavier computation.'
    ]
  },
  {
    id: 'distributed-cache',
    name: 'Distributed KV Cache',
    tagline: 'High-performance in-memory key-value store.',
    overview: 'Coming Soon',
    problemStatement: 'Coming Soon',
    architecture: 'Coming Soon',
    designDecisions: ['Coming Soon'],
    challenges: ['Coming Soon'],
    solutions: ['Coming Soon'],
    optimizations: ['Coming Soon'],
    techStack: ['Go', 'gRPC', 'Raft Consensus'],
    repositoryUrl: 'Coming Soon',
    liveDemoUrl: 'Coming Soon',
    futureWork: ['Coming Soon']
  }
];
