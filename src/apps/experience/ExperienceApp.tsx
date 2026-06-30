import React from 'react';
import { experienceData } from './data/experience';
import { BriefcaseIcon, MapPinIcon, ChevronRightIcon } from 'lucide-react';

export const ExperienceApp: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-14 h-14 bg-blue-500/10 text-blue-400 flex items-center justify-center rounded-2xl">
            <BriefcaseIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Experience</h1>
            <p className="text-white/50">Professional journey and milestones</p>
          </div>
        </div>

        <div className="relative border-l-2 border-white/10 ml-6 flex flex-col gap-12 pb-10">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-[#0a0a0a] ${exp.isCurrent ? 'bg-blue-500' : 'bg-white/20'}`} />
              
              <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h2 className="text-xl font-bold text-white/90">{exp.role}</h2>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${exp.isCurrent ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-white/5 border-white/10 text-white/50'}`}>
                    {exp.period}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-1.5 font-medium text-white/80">
                    <BriefcaseIcon size={16} /> {exp.company}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPinIcon size={16} /> {exp.location}
                  </div>
                </div>

                <ul className="flex flex-col gap-2 mt-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70 text-sm leading-relaxed">
                      <ChevronRightIcon size={16} className="text-blue-500/50 mt-0.5 flex-shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.techStack.map(tech => (
                    <span key={tech} className="text-xs px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ExperienceApp;
