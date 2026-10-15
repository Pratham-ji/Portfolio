import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { BookIcon, CodeIcon, GitBranchIcon, ExternalLinkIcon, InfoIcon, LayoutTemplateIcon, LayersIcon, ZapIcon, TargetIcon, RocketIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0]?.id || '');

  const selectedProject = projectsData.find(p => p.id === selectedProjectId);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="ds-app-container">
      {/* Sidebar List */}
      <div className="ds-sidebar bg-[var(--theme-surface)]/30 backdrop-blur-md p-0 overflow-y-auto">
        <div className="p-5 border-b border-[var(--theme-border)]/50 bg-[var(--theme-surface)]/20 sticky top-0 z-10">
          <h2 className="ds-section-header mb-0 text-[var(--theme-text-muted)]">Engineering Cases</h2>
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          {projectsData.map(project => {
            const isSelected = selectedProjectId === project.id;
            return (
              <motion.button
                whileHover={{ scale: isSelected ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`ds-sidebar-item flex-col items-start ${isSelected ? 'active shadow-lg shadow-blue-500/20' : ''}`}
              >
                <div className={`font-semibold text-sm mb-0.5 ${isSelected ? 'text-white' : 'text-[var(--theme-text)]'}`}>{project.name}</div>
                <div className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-white/80' : 'text-[var(--theme-text-muted)]'}`}>{project.tagline}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Details Area */}
      <div className="ds-app-content relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div 
              key={selectedProject.id}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="ds-app-content-inner"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="pt-4">
                {/* Hero Image */}
                {selectedProject.heroImage && !selectedProject.heroImage.includes('TODO') ? (
                  <div className="w-full h-64 rounded-2xl border border-[var(--theme-border)] mb-8 overflow-hidden shadow-lg">
                    <img src={selectedProject.heroImage} alt={selectedProject.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-dashed border-[var(--theme-border)] mb-8 flex flex-col items-center justify-center shadow-inner gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <LayoutTemplateIcon size={48} className="text-[var(--theme-text-muted)] opacity-50 group-hover:scale-110 transition-transform" strokeWidth={1} />
                    <span className="text-[var(--theme-text-muted)] font-bold text-sm tracking-widest uppercase opacity-70">Project Hero Image Placeholder</span>
                  </div>
                )}
                
                
                <h1 className="text-3xl font-bold mb-4 tracking-tight text-[var(--theme-text)]">{selectedProject.name}</h1>
                <p className="text-xl text-[var(--theme-text-muted)] mb-8 font-medium leading-relaxed max-w-3xl">{selectedProject.tagline}</p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  {selectedProject.repositoryUrl && !selectedProject.repositoryUrl.includes('TODO') && selectedProject.repositoryUrl !== 'Coming Soon' ? (
                    <a href={selectedProject.repositoryUrl} target="_blank" rel="noreferrer" className="ds-btn ds-btn-secondary">
                      <GitBranchIcon size={16} /> Repository
                    </a>
                  ) : (
                    <span className="ds-btn ds-btn-ghost bg-[var(--theme-surface)]/50 border border-[var(--theme-border)]/50 cursor-not-allowed">
                      <GitBranchIcon size={16} /> Repository (Pending)
                    </span>
                  )}

                  {selectedProject.liveDemoUrl && !selectedProject.liveDemoUrl.includes('TODO') && selectedProject.liveDemoUrl !== 'Coming Soon' ? (
                    <a href={selectedProject.liveDemoUrl} target="_blank" rel="noreferrer" className="ds-btn ds-btn-primary">
                      <ExternalLinkIcon size={16} /> Live Demo
                    </a>
                  ) : (
                    <span className="ds-btn ds-btn-primary opacity-50 cursor-not-allowed">
                      <ExternalLinkIcon size={16} /> Live Demo (Pending)
                    </span>
                  )}
                </div>

                {/* Metrics */}
                {selectedProject.metrics && selectedProject.metrics.length > 0 && !selectedProject.metrics[0]?.label.includes('TODO') && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.metrics.map((metric, i) => (
                      <div key={i} className="ds-card p-5 flex flex-col gap-1">
                        <span className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider">{metric.label}</span>
                        <span className="text-lg font-extrabold text-[var(--theme-text)]">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {selectedProject.metrics && selectedProject.metrics[0]?.label.includes('TODO') && (
                  <div className="w-full p-4 border border-dashed border-[var(--theme-border)] rounded-xl text-center text-sm font-bold text-[var(--theme-text-muted)] opacity-70">
                    Metrics Placeholder (Update data layer)
                  </div>
                )}
              </motion.div>

              {/* Tech Stack */}
              <motion.div variants={itemVariants} className="ds-card flex flex-wrap gap-2.5">
                <div className="w-full text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider mb-2">Technologies Used</div>
                {selectedProject.techStack.map((tech, i) => (
                  <span key={i} className={`ds-tag ${tech.includes('TODO') ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}`}>
                    {tech.includes('TODO') ? 'Pending Tech' : tech}
                  </span>
                ))}
              </motion.div>

              {/* Sections */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Section icon={InfoIcon} title="Overview" content={selectedProject.overview} />
                <Section icon={TargetIcon} title="Problem Statement" content={selectedProject.problemStatement} />
              </motion.div>

              <motion.div variants={itemVariants} className="ds-card">
                <Section icon={LayoutTemplateIcon} title="Architecture" content={selectedProject.architecture} />
                {selectedProject.architectureDiagram && !selectedProject.architectureDiagram.includes('TODO') ? (
                  <div className="mt-6 w-full h-64 rounded-xl border border-[var(--theme-border)] overflow-hidden">
                    <img src={selectedProject.architectureDiagram} alt="Architecture Diagram" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="mt-6 w-full h-32 rounded-xl border border-dashed border-[var(--theme-border)] flex items-center justify-center bg-transparent text-[var(--theme-text-muted)] font-bold text-xs uppercase tracking-widest opacity-70">
                    Architecture Diagram Placeholder
                  </div>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ListSection icon={CodeIcon} title="Design Decisions" items={selectedProject.designDecisions} />
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ListSection icon={BookIcon} title="Challenges" items={selectedProject.challenges} />
                <ListSection icon={ZapIcon} title="Solutions" items={selectedProject.solutions} />
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ListSection icon={LayersIcon} title="Optimizations" items={selectedProject.optimizations} />
                {selectedProject.lessonsLearned && selectedProject.lessonsLearned.length > 0 && !selectedProject.lessonsLearned[0]?.includes('TODO') && (
                  <ListSection icon={BookIcon} title="Lessons Learned" items={selectedProject.lessonsLearned} />
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="ds-card">
                <ListSection icon={RocketIcon} title="Future Work" items={selectedProject.futureWork} />
              </motion.div>
              
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-[var(--theme-text-muted)] h-full gap-4"
            >
              <LayoutTemplateIcon size={64} className="opacity-20" strokeWidth={1} />
              <div className="font-medium">Select a project to view details</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Section: React.FC<{ icon: React.ElementType, title: string, content: string }> = ({ icon: Icon, title, content }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-base font-bold flex items-center gap-2 text-[var(--theme-text)]">
      <div className="p-1.5 bg-[var(--theme-accent)]/10 rounded-md text-[var(--theme-accent)]">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      {title}
    </h3>
    <p className="text-[var(--theme-text-muted)] leading-relaxed text-[13px] font-medium">
      {content}
    </p>
  </div>
);

const ListSection: React.FC<{ icon: React.ElementType, title: string, items: string[] }> = ({ icon: Icon, title, items }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-base font-bold flex items-center gap-2 text-[var(--theme-text)]">
      <div className="p-1.5 bg-[var(--theme-accent)]/10 rounded-md text-[var(--theme-accent)]">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      {title}
    </h3>
    <ul className="list-none space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[13px] font-medium text-[var(--theme-text-muted)] leading-relaxed">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectsApp;
