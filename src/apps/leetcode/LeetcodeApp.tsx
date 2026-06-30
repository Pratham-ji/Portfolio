import React from 'react';
import { leetcodeSnapshot } from './data/snapshot';
import { CodeIcon, CheckCircleIcon, TrophyIcon, ActivityIcon, CpuIcon, HashIcon } from 'lucide-react';

export const LeetcodeApp: React.FC = () => {
  const { totalSolved, easySolved, mediumSolved, hardSolved, ranking, recentSubmissions, username } = leetcodeSnapshot;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-white/70';
    }
  };

  const totalQuestions = 3000; // Rough estimate of total LeetCode questions
  const progress = (totalSolved / totalQuestions) * 100;

  return (
    <div className="w-full h-full bg-[#1a1a1a] text-white p-6 overflow-y-auto flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
            <CodeIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">LeetCode</h1>
            <p className="text-white/50 text-sm">@{username}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <TrophyIcon size={16} className="text-yellow-500" />
            <span>Ranking</span>
          </div>
          <span className="font-bold text-lg">{ranking.toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ring Chart Area */}
        <div className="bg-[#242424] p-6 rounded-2xl border border-white/5 flex items-center justify-center gap-8">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Simple CSS conic gradient for a pseudo ring chart */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #ef4444 0% ${(hardSolved/totalSolved)*100}%, 
                  #eab308 ${(hardSolved/totalSolved)*100}% ${((hardSolved+mediumSolved)/totalSolved)*100}%, 
                  #22c55e ${((hardSolved+mediumSolved)/totalSolved)*100}% 100%
                )`
              }}
            />
            <div className="absolute inset-2 bg-[#242424] rounded-full flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{totalSolved}</span>
              <span className="text-xs text-white/50">Solved</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <StatRow label="Easy" count={easySolved} total={800} color="text-green-500" bg="bg-green-500" />
            <StatRow label="Medium" count={mediumSolved} total={1500} color="text-yellow-500" bg="bg-yellow-500" />
            <StatRow label="Hard" count={hardSolved} total={700} color="text-red-500" bg="bg-red-500" />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#242424] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
              <div className="text-white/50 mb-2"><ActivityIcon size={20} /></div>
              <div>
                <div className="text-2xl font-bold">{progress.toFixed(1)}%</div>
                <div className="text-xs text-white/50">Completion Rate</div>
              </div>
           </div>
           <div className="bg-[#242424] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
              <div className="text-white/50 mb-2"><CpuIcon size={20} /></div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-white/50">Languages Used</div>
              </div>
           </div>
           <div className="bg-[#242424] p-4 rounded-xl border border-white/5 col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HashIcon size={20} className="text-white/50" />
                <span className="text-sm font-medium">Verified Snapshot Data</span>
              </div>
              <CheckCircleIcon size={16} className="text-green-500" />
           </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-[#242424] rounded-2xl border border-white/5 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5 font-semibold flex items-center gap-2">
          <ActivityIcon size={18} /> Recent Submissions
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-white/50 border-b border-white/5">
                <th className="p-3 font-medium">Time Submitted</th>
                <th className="p-3 font-medium">Question</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Language</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map(sub => (
                <tr key={sub.id} className="text-sm border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-3 text-white/70">{sub.timestamp}</td>
                  <td className="p-3 font-medium flex items-center gap-2">
                    {sub.title}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-sm bg-white/10 ${getDifficultyColor(sub.difficulty)}`}>
                      {sub.difficulty}
                    </span>
                  </td>
                  <td className="p-3 text-green-400 font-medium">{sub.status}</td>
                  <td className="p-3 text-white/70">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-xs">{sub.lang}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

const StatRow: React.FC<{ label: string; count: number; total: number; color: string; bg: string }> = ({ label, count, total, color, bg }) => (
  <div className="flex flex-col gap-1 w-32">
    <div className="flex justify-between text-sm">
      <span className={color}>{label}</span>
      <span className="font-semibold">{count} <span className="text-white/30 text-xs">/ {total}</span></span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${bg}`} style={{ width: `${(count/total)*100}%` }} />
    </div>
  </div>
);

export default LeetcodeApp;
