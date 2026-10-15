import React from 'react';
import { profileData } from '../../data/profile';
import { UserCircleIcon, RocketIcon, HeartIcon, ZapIcon, LightbulbIcon, SparklesIcon } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutApp: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="ds-app-container flex-col overflow-y-auto">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-[var(--theme-border)] bg-[var(--theme-surface)] p-8 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: 'spring', damping: 20 }}
          className="relative z-10 w-32 h-32 rounded-2xl mb-8 border border-[var(--theme-border)] shadow-xl overflow-hidden group bg-transparent"
        >
          {profileData.photoUrl && !profileData.photoUrl.includes('TODO') ? (
            <img src={profileData.photoUrl} alt={profileData.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--theme-text-muted)] bg-[var(--theme-surface-hover)]">
              <UserCircleIcon size={64} strokeWidth={1} />
            </div>
          )}
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="relative z-10 text-3xl font-bold mb-4 tracking-tight"
        >
          {profileData.name}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="relative z-10 text-base text-[var(--theme-text-muted)] max-w-2xl leading-relaxed font-medium"
        >
          {profileData.title}
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="relative z-10 mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="ds-tag gap-2 px-4 py-2 text-sm shadow-sm bg-transparent">
             <MapPinIcon size={16} className="text-blue-500" /> {profileData.location}
          </span>
          <a href={`mailto:${profileData.contactEmail.includes('TODO') ? '' : profileData.contactEmail}`} className={`ds-btn ${profileData.contactEmail.includes('TODO') ? 'ds-btn-ghost text-red-400 bg-red-500/10 cursor-not-allowed' : 'ds-btn-primary'} gap-2 shadow-sm`} onClick={e => profileData.contactEmail.includes('TODO') && e.preventDefault()}>
            <MailIcon size={16} /> {profileData.contactEmail.includes('TODO') ? 'Email Pending' : 'Hire Me'}
          </a>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants} initial="hidden" animate="show"
        className="ds-app-content-inner p-8"
      >
        
        {/* Journey */}
        <motion.section variants={itemVariants} className="ds-card flex flex-col gap-5">
          <h2 className="text-base font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><RocketIcon size={20} /></div>
            The Journey
          </h2>
          <p className={`leading-relaxed text-[13px] font-medium ${profileData.about.journey.includes('TODO') ? 'text-red-400/70 italic' : 'text-[var(--theme-text-muted)]'}`}>
            {profileData.about.journey.includes('TODO') ? 'Journey details pending (update profile.ts)...' : profileData.about.journey}
          </p>
        </motion.section>

        {/* Current Focus */}
        <motion.section variants={itemVariants} className="ds-card flex flex-col gap-5">
          <h2 className="text-base font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500"><ZapIcon size={20} /></div>
            Current Focus
          </h2>
          <p className={`leading-relaxed text-[13px] font-medium ${profileData.about.currentFocus.includes('TODO') ? 'text-red-400/70 italic' : 'text-[var(--theme-text-muted)]'}`}>
            {profileData.about.currentFocus.includes('TODO') ? 'Current focus pending (update profile.ts)...' : profileData.about.currentFocus}
          </p>
        </motion.section>

        {/* Philosophy */}
        <motion.section variants={itemVariants} className="flex flex-col gap-5">
          <h2 className="text-base font-bold flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><LightbulbIcon size={20} /></div>
            Engineering Philosophy
          </h2>
          <div className="ds-card bg-gradient-to-r from-[var(--theme-surface)] to-[var(--theme-bg)] shadow-inner">
            <p className="text-[13px] font-medium text-[var(--theme-text-muted)] leading-relaxed italic">
              "{profileData.about.philosophy}"
            </p>
          </div>
        </motion.section>

        {/* Fun Facts */}
        <motion.section variants={itemVariants} className="ds-card flex flex-col gap-5">
          <h2 className="text-base font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500"><SparklesIcon size={20} /></div>
            Beyond the Code
          </h2>
          <ul className="flex flex-col gap-4 mt-2">
            {profileData.about.funFacts.map((fact, i) => (
              <li key={i} className={`flex items-start gap-4 text-[13px] font-medium leading-relaxed ${fact.includes('TODO') ? 'text-red-400/70 italic' : 'text-[var(--theme-text-muted)]'}`}>
                <HeartIcon size={16} className={fact.includes('TODO') ? 'text-red-500/50 mt-0.5 flex-shrink-0' : 'text-pink-500/70 mt-0.5 flex-shrink-0'} />
                {fact.includes('TODO') ? 'Fun fact pending...' : fact}
              </li>
            ))}
          </ul>
        </motion.section>

      </motion.div>
    </div>
  );
};

// Quick helper icons since they weren't imported
const MapPinIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const MailIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

export default AboutApp;
