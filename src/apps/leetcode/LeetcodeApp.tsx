import React from 'react';
import { leetcodeSnapshot } from '../../data/leetcode';
import { CodeIcon, CheckCircleIcon, TrophyIcon, ActivityIcon, HashIcon } from 'lucide-react';
import { motion } from 'motion/react';

export const LeetcodeApp: React.FC = () => {
  const { totalSolved, easySolved, mediumSolved, hardSolved, ranking, recentSubmissions, username, contestRating } = leetcodeSnapshot;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-white/70 bg-white/5 border-white/10';
    }
  };

  const totalQuestions = 3000;
  const progress = (totalSolved / totalQuestions) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="ds-app-container">
      <div className="ds-app-content-inner w-full px-8 pt-8 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-between border-b border-[var(--theme-border)] pb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
            <CodeIcon size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">LeetCode</h1>
            <p className="text-[var(--theme-text-muted)] text-[13px] font-medium">@{username}</p>
          </div>
        </div>
        <div className="flex flex-col items-end ds-card py-3 px-5 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--theme-text-muted)] text-sm font-semibold mb-1">
            <TrophyIcon size={16} className="text-yellow-500" />
            <span>Global Ranking</span>
          </div>
          <span className="font-extrabold text-2xl">{ranking.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants} initial="hidden" animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Ring Chart Area */}
        <motion.div variants={itemVariants} className="ds-card p-8 flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="relative w-40 h-40 flex items-center justify-center drop-shadow-lg">
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
            <div className="absolute inset-3 bg-[var(--theme-surface)] rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-4xl font-extrabold">{totalSolved}</span>
              <span className="text-sm font-semibold text-[var(--theme-text-muted)] mt-1">Solved</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <StatRow label="Easy" count={easySolved} total={800} color="text-green-500" bg="bg-green-500" />
            <StatRow label="Medium" count={mediumSolved} total={1500} color="text-yellow-500" bg="bg-yellow-500" />
            <StatRow label="Hard" count={hardSolved} total={700} color="text-red-500" bg="bg-red-500" />
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-5">
           <div className="ds-card flex flex-col justify-between hover:border-[var(--theme-accent)]/30 transition-colors">
              <div className="text-[var(--theme-accent)] mb-4 bg-[var(--theme-accent)]/10 w-10 h-10 flex items-center justify-center rounded-xl"><ActivityIcon size={20} /></div>
              <div>
                <div className="text-3xl font-extrabold">{progress.toFixed(1)}%</div>
                <div className="text-sm font-semibold text-[var(--theme-text-muted)] mt-1">Completion Rate</div>
              </div>
           </div>
           <div className="ds-card flex flex-col justify-between hover:border-[var(--theme-accent)]/30 transition-colors">
              <div className="text-purple-500 mb-4 bg-purple-500/10 w-10 h-10 flex items-center justify-center rounded-xl"><TrophyIcon size={20} /></div>
              <div>
                <div className="text-3xl font-extrabold">{contestRating && contestRating > 0 ? contestRating : 'N/A'}</div>
                <div className="text-sm font-semibold text-[var(--theme-text-muted)] mt-1">Contest Rating</div>
              </div>
           </div>
           <div className="bg-green-500/5 p-5 rounded-2xl border border-green-500/20 col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HashIcon size={20} className="text-green-500/70" />
                <span className="text-sm font-bold text-green-600 dark:text-green-400">Verified Snapshot Data</span>
              </div>
              <CheckCircleIcon size={20} className="text-green-500" />
           </div>
        </motion.div>
      </motion.div>

      {/* Recent Submissions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="ds-card p-0 flex-1 flex flex-col overflow-hidden"
      >
        <div className="p-6 border-b border-[var(--theme-border)] font-bold text-lg flex items-center gap-3">
          <ActivityIcon size={20} className="text-[var(--theme-accent)]" /> Recent Submissions
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider border-b border-[var(--theme-border)]">
                <th className="p-4">Time Submitted</th>
                <th className="p-4">Question</th>
                <th className="p-4">Status</th>
                <th className="p-4">Language</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map(sub => (
                <tr key={sub.id} className="text-sm border-b border-[var(--theme-border)] hover:bg-[var(--theme-surface-hover)] transition-colors group">
                  <td className="p-4 text-[var(--theme-text-muted)] font-medium">{sub.timestamp}</td>
                  <td className="p-4 font-bold flex items-center gap-3">
                    {sub.title}
                    <span className={`text-[11px] px-2 py-0.5 rounded-md border ${getDifficultyColor(sub.difficulty)}`}>
                      {sub.difficulty}
                    </span>
                  </td>
                  <td className="p-4 text-green-500 font-bold">{sub.status}</td>
                  <td className="p-4 text-[var(--theme-text-muted)] font-medium">
                    <span className="px-3 py-1.5 bg-transparent border border-[var(--theme-border)] rounded-lg text-xs shadow-inner group-hover:border-[var(--theme-accent)]/30 transition-colors">{sub.lang}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

const StatRow: React.FC<{ label: string; count: number; total: number; color: string; bg: string }> = ({ label, count, total, color, bg }) => (
  <div className="flex flex-col gap-2 w-48">
    <div className="flex justify-between text-sm font-bold">
      <span className={color}>{label}</span>
      <span className="text-[var(--theme-text)]">{count} <span className="text-[var(--theme-text-muted)] font-medium text-xs">/ {total}</span></span>
    </div>
    <div className="h-2 w-full bg-transparent rounded-full overflow-hidden shadow-inner border border-[var(--theme-border)]">
      <div className={`h-full ${bg} rounded-full`} style={{ width: `${(count/total)*100}%` }} />
    </div>
  </div>
);

export default LeetcodeApp;
