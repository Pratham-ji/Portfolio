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
    <div className="w-full h-full bg-[#111111] text-white p-8 overflow-y-auto flex justify-center">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-14 h-14 bg-yellow-500/10 text-yellow-400 flex items-center justify-center rounded-2xl">
            <AwardIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-white/50">Awards, recognition, and milestones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.id} className="bg-black/30 border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-colors flex flex-col gap-4 group">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${ach.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-white/50">
                    {ach.date}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white/90 mb-1">{ach.title}</h3>
                  <div className="text-sm font-medium text-white/40 mb-3">{ach.organization}</div>
                  <p className="text-sm text-white/70 leading-relaxed">
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
