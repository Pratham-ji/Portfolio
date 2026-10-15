import React from 'react';
import { experienceData } from '../../data/experience';
import { BriefcaseIcon, MapPinIcon, ChevronRightIcon, TrendingUpIcon, FileBadge2Icon } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceApp: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="ds-app-container">
      <div className="ds-app-content-inner w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center gap-5 border-b border-[var(--theme-border)] pb-8"
        >
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-xl shadow-inner border border-blue-500/20">
            <BriefcaseIcon size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Experience</h1>
            <p className="text-[var(--theme-text-muted)] text-[13px] font-medium mt-1">Professional journey, milestones, and impact.</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={containerVariants} initial="hidden" animate="show"
          className="relative border-l-2 border-[var(--theme-border)] ml-6 flex flex-col gap-14"
        >
          {experienceData.map((exp) => (
            <motion.div variants={itemVariants} key={exp.id} className="relative pl-10">
              {/* Timeline dot */}
              <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 border-[var(--theme-bg)] flex items-center justify-center ${exp.isCurrent ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'bg-[var(--theme-border)]'}`}>
                {exp.isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
              </div>
              
              <div className="ds-card flex flex-col gap-5 hover:border-[var(--theme-accent)]/30 transition-colors">
                {/* Role & Period */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    {exp.logoUrl && !exp.logoUrl.includes('TODO') ? (
                      <img src={exp.logoUrl} alt={exp.company} className="w-12 h-12 rounded-xl object-cover bg-white" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-transparent border border-dashed border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)]">
                        <BriefcaseIcon size={20} className="opacity-50" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-extrabold text-[var(--theme-text)]">{exp.role}</h2>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-xs font-semibold text-[var(--theme-text-muted)] mt-1">
                        <div className="flex items-center gap-1.5 text-[var(--theme-text)]">
                          <BriefcaseIcon size={16} className="text-blue-500" /> {exp.company}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPinIcon size={16} /> {exp.location.includes('TODO') ? 'Location Pending' : exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex-shrink-0 mt-2 md:mt-0 ${exp.isCurrent ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 'bg-transparent border-[var(--theme-border)] text-[var(--theme-text-muted)]'}`}>
                    {exp.period.includes('TODO') ? 'Dates Pending' : exp.period}
                  </span>
                </div>

                {/* Description */}
                <ul className="flex flex-col gap-3 mt-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className={`flex items-start gap-3 text-[13px] font-medium leading-relaxed ${desc.includes('TODO') ? 'text-red-400/70 italic' : 'text-[var(--theme-text-muted)]'}`}>
                      <ChevronRightIcon size={18} className={`mt-0.5 flex-shrink-0 ${desc.includes('TODO') ? 'text-red-500/50' : 'text-blue-500/50'}`} />
                      {desc.includes('TODO') ? 'Responsibility pending...' : desc}
                    </li>
                  ))}
                </ul>

                {/* Impact Metrics */}
                {exp.impactMetrics && exp.impactMetrics.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {exp.impactMetrics.map((metric, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex flex-col gap-1 ${metric.label.includes('TODO') ? 'bg-red-500/5 border-red-500/20' : 'bg-transparent border-[var(--theme-border)]'}`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                          <TrendingUpIcon size={14} className={metric.label.includes('TODO') ? 'text-red-400' : 'text-green-500'} />
                          {metric.label.includes('TODO') ? 'Metric' : metric.label}
                        </div>
                        <div className={`text-lg font-extrabold ${metric.value.includes('TODO') ? 'text-red-400/70' : 'text-[var(--theme-text)]'}`}>
                          {metric.value.includes('TODO') ? 'Pending' : metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer (Tech & Certs) */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-5 border-t border-[var(--theme-border)]/50">
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map(tech => (
                      <span key={tech} className={`ds-tag ${tech.includes('TODO') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'shadow-sm'}`}>
                        {tech.includes('TODO') ? 'Tech' : tech}
                      </span>
                    ))}
                  </div>
                  
                  {exp.certificateUrl && (
                    <a 
                      href={exp.certificateUrl?.includes('TODO') ? '#' : exp.certificateUrl} 
                      target={exp.certificateUrl?.includes('TODO') ? '_self' : '_blank'} 
                      rel="noreferrer"
                      className={`ds-btn ${exp.certificateUrl?.includes('TODO') ? 'ds-btn-ghost opacity-60 cursor-not-allowed' : 'ds-btn-secondary'}`}
                      onClick={(e) => exp.certificateUrl?.includes('TODO') && e.preventDefault()}
                    >
                      <FileBadge2Icon size={16} className={exp.certificateUrl?.includes('TODO') ? '' : 'text-yellow-500'} />
                      {exp.certificateUrl?.includes('TODO') ? 'Certificate Pending' : 'View Certificate'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default ExperienceApp;
