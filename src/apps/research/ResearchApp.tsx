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
    <div className="w-full h-full bg-[#f4f4f5] text-[#18181b] p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
        
        <div className="flex items-center gap-4 border-b border-black/10 pb-6">
          <div className="w-14 h-14 bg-red-500/10 text-red-600 flex items-center justify-center rounded-2xl">
            <BookOpenIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Research</h1>
            <p className="text-black/50">Publications and technical articles</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {publications.map((pub) => (
            <article key={pub.id} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold text-black/90 mb-1 leading-snug">{pub.title}</h3>
                <div className="text-sm font-medium text-red-600 mb-3">
                  {pub.journal} • {pub.year}
                </div>
              </div>
              
              <div className="bg-black/5 p-4 rounded-xl border border-black/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2">Abstract</h4>
                <p className="text-sm text-black/70 leading-relaxed italic">
                  "{pub.abstract}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <a 
                  href={pub.link} 
                  className="flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 text-black/70 hover:text-black rounded-lg text-sm font-medium transition-colors"
                  onClick={(e) => { e.preventDefault(); alert('Mock PDF Link'); }}
                >
                  <FileTextIcon size={16} /> Read Paper
                </a>
                <a 
                  href={pub.link} 
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
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
