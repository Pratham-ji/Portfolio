import React, { useState } from 'react';
import { skillsData } from './data/skills';
import { ZapIcon, ChevronRightIcon, AwardIcon } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(skillsData[0]?.id || '');

  const selectedCategory = skillsData.find(c => c.id === activeCategory);

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black/20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2 px-2 pb-4 border-b border-white/5 mb-2">
          <ZapIcon size={20} className="text-yellow-400" />
          <h1 className="font-bold text-lg">Tech Radar</h1>
        </div>
        
        {skillsData.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category.id 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{category.title}</span>
            {activeCategory === category.id && <ChevronRightIcon size={16} />}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-[#1e1e1e] to-[#121212]">
        {selectedCategory && (
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">{selectedCategory.title}</h2>
              <p className="text-white/50">{selectedCategory.description}</p>
            </div>

            <div className="flex flex-col gap-6 bg-white/5 border border-white/5 p-6 rounded-2xl">
              {selectedCategory.skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-2 group">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {skill.proficiency >= 90 && <AwardIcon size={16} className="text-yellow-400" />}
                      <span className="font-medium text-white/90">{skill.name}</span>
                    </div>
                    <span className="text-white/50">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center text-white/30 text-xs mt-4">
              Proficiency scale is an estimation based on project usage, not standardized testing.
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SkillsApp;
