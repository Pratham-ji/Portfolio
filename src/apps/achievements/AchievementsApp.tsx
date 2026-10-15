import React from 'react';
import { AwardIcon, TrophyIcon, StarIcon, MedalIcon } from 'lucide-react';

const achievements = [
  {
    id: 'ach-1',
    title: 'Hackathon Winner',
    organization: 'Global Tech Summit 2024',
    date: 'March 2024',
    description: 'First place out of 200+ teams for building an AI-powered code review assistant.',
    icon: TrophyIcon,
    color: 'text-yellow-400'
  },
  {
    id: 'ach-2',
    title: 'Open Source Contributor',
    organization: 'React Core Team',
    date: '2023',
    description: 'Merged 5 critical bug fixes into the React repository regarding hydration mismatches.',
    icon: StarIcon,
    color: 'text-blue-400'
  },
  {
    id: 'ach-3',
    title: 'Top Performer Award',
    organization: 'Tech Innovations Inc.',
    date: 'December 2022',
    description: 'Recognized for single-handedly optimizing the core microservices, saving $50k/month in cloud costs.',
    icon: MedalIcon,
    color: 'text-purple-400'
  }
];

export const AchievementsApp: React.FC = () => {
  return (
    <div className="ds-app-container">
      <div className="ds-app-content-inner w-full px-8 pt-8 pb-20 max-w-4xl">
        
        <div className="flex items-center gap-4 border-b border-[var(--theme-border)] pb-6">
          <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 flex items-center justify-center rounded-xl">
            <AwardIcon size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--theme-text)]">Achievements</h1>
            <p className="text-[var(--theme-text-muted)]">Awards, recognition, and milestones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.id} className="ds-card flex flex-col gap-4 group">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] ${ach.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <span className="ds-tag bg-transparent">
                    {ach.date}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[var(--theme-text)] mb-1">{ach.title}</h3>
                  <div className="text-sm font-medium text-[var(--theme-text-muted)] mb-3">{ach.organization}</div>
                  <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AchievementsApp;
