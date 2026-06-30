import React, { useState } from 'react';
import { projectsData } from './data/projects';
import { BookIcon, CodeIcon, GitBranchIcon, ExternalLinkIcon, InfoIcon, LayoutTemplateIcon, LayersIcon, ZapIcon, TargetIcon, RocketIcon } from 'lucide-react';

export const ProjectsApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0]?.id || '');

  const selectedProject = projectsData.find(p => p.id === selectedProjectId);

  return (
    <div className="w-full h-full flex bg-[#0f0f11] text-[#e2e8f0] overflow-hidden">
      {/* Sidebar List */}
      <div className="w-64 bg-black/40 border-r border-white/10 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-white/5 bg-white/5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Engineering Cases</h2>
        </div>
        <div className="flex-1 p-2 flex flex-col gap-1">
          {projectsData.map(project => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`text-left p-3 rounded-lg transition-all border ${
                selectedProjectId === project.id
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="font-medium text-sm mb-1">{project.name}</div>
              <div className="text-xs opacity-60 line-clamp-2">{project.tagline}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Details Area */}
      <div className="flex-1 overflow-y-auto relative">
        {selectedProject ? (
          <div className="max-w-4xl mx-auto p-8 flex flex-col gap-8 pb-20">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">{selectedProject.name}</h1>
              <p className="text-lg text-white/60 mb-6">{selectedProject.tagline}</p>
              
              <div className="flex flex-wrap gap-4">
                {selectedProject.repositoryUrl !== 'Coming Soon' ? (
                  <a href={selectedProject.repositoryUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors">
                    <GitBranchIcon size={16} /> Repository
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/30 rounded-md text-sm font-medium cursor-not-allowed">
                    <GitBranchIcon size={16} /> Repository (Coming Soon)
                  </span>
                )}

                {selectedProject.liveDemoUrl !== 'Coming Soon' ? (
                  <a href={selectedProject.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-md text-sm font-medium transition-colors">
                    <ExternalLinkIcon size={16} /> Live Demo
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 text-blue-300/30 rounded-md text-sm font-medium cursor-not-allowed">
                    <ExternalLinkIcon size={16} /> Live Demo (Coming Soon)
                  </span>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-[#1e293b] text-[#94a3b8] rounded-full text-xs font-semibold border border-white/5">
                  {tech}
                </span>
              ))}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

            {/* Sections */}
            <Section icon={InfoIcon} title="Overview" content={selectedProject.overview} />
            <Section icon={TargetIcon} title="Problem Statement" content={selectedProject.problemStatement} />
            <Section icon={LayoutTemplateIcon} title="Architecture" content={selectedProject.architecture} />
            
            <ListSection icon={CodeIcon} title="Design Decisions" items={selectedProject.designDecisions} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ListSection icon={BookIcon} title="Challenges" items={selectedProject.challenges} />
              <ListSection icon={ZapIcon} title="Solutions" items={selectedProject.solutions} />
            </div>

            <ListSection icon={LayersIcon} title="Optimizations" items={selectedProject.optimizations} />
            <ListSection icon={RocketIcon} title="Future Work" items={selectedProject.futureWork} />
            
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/50 h-full">
            Select a project to view details
          </div>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{ icon: React.ElementType, title: string, content: string }> = ({ icon: Icon, title, content }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xl font-semibold flex items-center gap-2 text-white/90">
      <Icon size={20} className="text-blue-400" /> {title}
    </h3>
    <p className="text-white/70 leading-relaxed text-sm">
      {content}
    </p>
  </div>
);

const ListSection: React.FC<{ icon: React.ElementType, title: string, items: string[] }> = ({ icon: Icon, title, items }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xl font-semibold flex items-center gap-2 text-white/90">
      <Icon size={20} className="text-purple-400" /> {title}
    </h3>
    <ul className="list-none space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectsApp;
