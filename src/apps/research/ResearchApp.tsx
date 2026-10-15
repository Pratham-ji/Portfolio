import React from 'react';
import { BookOpenIcon, FileTextIcon, ExternalLinkIcon } from 'lucide-react';

const publications = [
  {
    id: 'pub-1',
    title: 'Optimizing Virtual DOM Diffing Algorithms in Concurrent Rendering',
    journal: 'Journal of Web Engineering',
    year: '2024',
    abstract: 'This paper explores advanced heuristic techniques to reduce the time complexity of the React reconciliation algorithm from O(n) to near O(1) in specialized highly-nested UI structures.',
    link: '#',
  },
  {
    id: 'pub-2',
    title: 'State Management at the Edge: Distributed Context Providers',
    journal: 'Frontend Architecture Conference',
    year: '2023',
    abstract: 'An architectural approach to moving heavy state synchronization out of the main thread and into Web Workers, communicating via SharedArrayBuffer for real-time multiplayer applications.',
    link: '#',
  }
];

export const ResearchApp: React.FC = () => {
  return (
    <div className="ds-app-container">
      <div className="ds-app-content-inner w-full px-8 pt-8 pb-20 max-w-4xl">
        
        <div className="flex items-center gap-4 border-b border-[var(--theme-border)] pb-6">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 flex items-center justify-center rounded-xl">
            <BookOpenIcon size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--theme-text)]">Research</h1>
            <p className="text-[var(--theme-text-muted)]">Publications and technical articles</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {publications.map((pub) => (
            <article key={pub.id} className="ds-card flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--theme-text)] mb-1 leading-snug">{pub.title}</h3>
                <div className="text-sm font-medium text-red-500 mb-3">
                  {pub.journal} • {pub.year}
                </div>
              </div>
              
              <div className="bg-[var(--theme-surface-hover)] p-4 rounded-xl border border-[var(--theme-border)]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-2">Abstract</h4>
                <p className="text-[13px] text-[var(--theme-text-muted)] leading-relaxed italic">
                  "{pub.abstract}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <a 
                  href={pub.link} 
                  className="ds-btn ds-btn-secondary"
                  onClick={(e) => { e.preventDefault(); alert('Mock PDF Link'); }}
                >
                  <FileTextIcon size={16} /> Read Paper
                </a>
                <a 
                  href={pub.link} 
                  className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                  onClick={(e) => { e.preventDefault(); alert('Mock DOI Link'); }}
                >
                  <ExternalLinkIcon size={16} /> DOI Link
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResearchApp;
