import React, { useState } from 'react';
import { skillsData } from '../../data/skills';
import { ZapIcon, ChevronRightIcon, AwardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SkillsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(skillsData[0]?.id || '');

  const selectedCategory = skillsData.find(c => c.id === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="ds-app-container">
      
      {/* Sidebar */}
      <div className="ds-sidebar bg-[var(--theme-surface)]/30 backdrop-blur-md">
        <div className="flex items-center gap-3 px-3 pb-5 border-b border-[var(--theme-border)] mb-3">
          <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500 shadow-inner">
             <ZapIcon size={24} strokeWidth={2.5} />
          </div>
          <div>
             <h1 className="font-extrabold text-xl tracking-tight text-[var(--theme-text)]">Tech Radar</h1>
             <p className="text-[11px] font-bold text-[var(--theme-text-muted)] uppercase tracking-widest mt-1">Skill Matrix</p>
          </div>
        </div>
        
        {skillsData.map(category => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`ds-sidebar-item justify-between ${
              activeCategory === category.id 
                ? 'active shadow-blue-500/20' 
                : 'hover:border-[var(--theme-accent)]/30'
            }`}
          >
            <span>{category.title}</span>
            {activeCategory === category.id && <ChevronRightIcon size={18} strokeWidth={3} />}
          </motion.button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="ds-app-content relative">
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div 
              key={selectedCategory.id}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              className="ds-app-content-inner"
            >
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold tracking-tight">{selectedCategory.title}</h2>
                <p className="text-[var(--theme-text-muted)] font-medium text-[13px] max-w-2xl leading-relaxed">{selectedCategory.description}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="ds-card flex flex-col gap-8">
                {selectedCategory.skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-3 group">
                    <div className="flex items-center justify-between text-[15px] font-bold">
                      <div className="flex items-center gap-3">
                        {skill.icon ? (
                          <div className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center p-1.5 shadow-sm border border-[var(--theme-border)] group-hover:scale-110 transition-transform">
                             <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center p-1.5 shadow-sm border border-[var(--theme-border)] group-hover:scale-110 transition-transform">
                             <AwardIcon size={18} className="text-yellow-500" />
                          </div>
                        )}
                        <span className="text-[var(--theme-text)]">{skill.name}</span>
                      </div>
                      <span className="ds-tag">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-3 bg-transparent rounded-full overflow-hidden relative border border-[var(--theme-border)] shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1), type: 'spring', damping: 20 }}
                        className="absolute top-0 left-0 h-full bg-[var(--theme-accent)] rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-center text-[var(--theme-text-muted)] font-medium text-[13px] mt-2 py-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)]/50">
                Proficiency scale is an estimation based on project usage, not standardized testing.
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default SkillsApp;
