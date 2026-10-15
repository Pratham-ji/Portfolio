import React, { useEffect, useState } from 'react';
import { fetchGithubProfile, fetchGithubRepos, GithubProfile, GithubRepo } from './utils/api';
import { AlertTriangleIcon, GitBranchIcon, UsersIcon, FolderKanbanIcon, StarIcon, GitForkIcon, ActivityIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { generateMockContributionGraph, githubFallbackProfile, githubFallbackRepos } from '../../data/github';

const USERNAME = 'Pratham-ji';

export const GithubApp: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [profileData, reposData] = await Promise.all([
          fetchGithubProfile(USERNAME),
          fetchGithubRepos(USERNAME)
        ]);

        if (isMounted) {
          setProfile(profileData);
          setRepos(reposData.sort((a, b) => b.stargazers_count - a.stargazers_count));
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.warn('Failed to fetch from GitHub API. Using fallback data.', err);
          setProfile(githubFallbackProfile);
          setRepos(githubFallbackRepos);
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-transparent flex flex-col md:flex-row p-8 gap-8 animate-pulse">
        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="w-48 h-48 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-sm" />
          <div className="w-40 h-8 bg-[var(--theme-surface)] rounded-md" />
          <div className="w-24 h-5 bg-[var(--theme-surface)] rounded-md mb-2" />
          <div className="w-full h-20 bg-[var(--theme-surface)] rounded-md" />
          <div className="w-full h-12 bg-[var(--theme-surface)] rounded-xl" />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full h-32 bg-[var(--theme-surface)] rounded-2xl" />
          <div className="w-64 h-8 bg-[var(--theme-surface)] rounded-md" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-full h-40 bg-[var(--theme-surface)] rounded-2xl border border-[var(--theme-border)]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-transparent text-[var(--theme-text)] gap-4 p-8 text-center">
        <AlertTriangleIcon size={48} className="text-red-400 drop-shadow-md" />
        <h2 className="text-2xl font-bold">Connection Error</h2>
        <p className="text-[var(--theme-text-muted)] max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2.5 bg-[#238636] text-white font-semibold rounded-lg hover:bg-[#2ea043] transition-colors shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!profile || repos.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-transparent text-[var(--theme-text)]">
        <GitBranchIcon size={48} className="text-[var(--theme-text-muted)] mb-4 opacity-30" />
        <p className="font-medium text-[var(--theme-text-muted)]">No GitHub data found for {USERNAME}</p>
      </div>
    );
  }

  return (
    <div className="ds-app-container flex-col md:flex-row">
      {/* Sidebar Profile */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="ds-sidebar bg-[var(--theme-surface)]/50 backdrop-blur-sm sticky top-0 items-center md:items-start border-b md:border-b-0"
      >
        <motion.img 
          initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          src={profile.avatar_url} 
          alt={profile.name} 
          className="w-48 h-48 rounded-full border-4 border-[var(--theme-surface-hover)] mb-6 shadow-xl"
        />
        <h1 className="text-3xl font-extrabold text-[var(--theme-text)] tracking-tight">{profile.name}</h1>
        <h2 className="text-xl text-[var(--theme-text-muted)] mb-6 font-medium">@{profile.login}</h2>
        <p className="text-[15px] text-[var(--theme-text)] mb-6 text-center md:text-left leading-relaxed font-medium">{profile.bio}</p>
        
        <div className="flex items-center gap-6 text-[15px] text-[var(--theme-text-muted)] mb-8 bg-[var(--theme-surface)] border border-[var(--theme-border)] px-5 py-3 rounded-xl shadow-sm w-full">
          <div className="flex items-center gap-2">
            <UsersIcon size={18} />
            <span className="font-bold text-[var(--theme-text)]">{profile.followers}</span> followers
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--theme-text)]">{profile.following}</span> following
          </div>
        </div>

        <a 
          href={profile.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="ds-btn ds-btn-primary w-full py-5 bg-[#238636] border-[#2ea043]"
        >
          Follow on GitHub
        </a>
      </motion.div>

      {/* Main Content - Repositories */}
      <div className="ds-app-content flex flex-col">
        <div className="w-full flex flex-col gap-[var(--ds-section-gap)] mb-10 max-w-5xl mx-auto">
          <div className="ds-card flex flex-col gap-4">
            <h3 className="text-[15px] font-bold text-[var(--theme-text)] flex items-center gap-2">
              <ActivityIcon size={18} className="text-green-500" />
              Contribution Activity
            </h3>
            <div className="w-full h-32 flex items-end gap-1 overflow-x-auto pb-2 custom-scrollbar">
              {generateMockContributionGraph().map((day, i) => (
                <div 
                  key={i} 
                  className={`w-3 rounded-sm flex-shrink-0 transition-all hover:ring-2 ring-green-400/50 ${
                    day.level === 0 ? 'bg-transparent h-2' :
                    day.level === 1 ? 'bg-green-900/40 h-4' :
                    day.level === 2 ? 'bg-green-700/60 h-8' :
                    day.level === 3 ? 'bg-green-500/80 h-16' :
                    'bg-green-400 h-24'
                  }`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold text-[var(--theme-text-muted)] mt-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-transparent" />
                <div className="w-3 h-3 rounded-sm bg-green-900/40" />
                <div className="w-3 h-3 rounded-sm bg-green-700/60" />
                <div className="w-3 h-3 rounded-sm bg-green-500/80" />
                <div className="w-3 h-3 rounded-sm bg-green-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--theme-border)] max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <FolderKanbanIcon size={24} className="text-[var(--theme-accent)]" />
            <h2 className="text-2xl font-bold tracking-tight">Repositories</h2>
          </div>
          <span className="ds-tag border-[var(--theme-accent)]/20 text-[var(--theme-accent)] bg-[var(--theme-accent)]/10">{profile.public_repos} Public</span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xl:grid-cols-2 gap-[var(--ds-card-gap)] auto-rows-max pb-12 max-w-5xl mx-auto w-full"
        >
          {repos.map(repo => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              key={repo.id} 
              className="ds-card hover:border-[#8b949e]/50 transition-all flex flex-col group cursor-pointer"
              onClick={() => window.open(repo.html_url, '_blank')}
            >
              <div className="flex items-start justify-between mb-3">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#58a6ff] font-bold text-lg hover:underline break-all line-clamp-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {repo.name}
                </a>
                <span className="ds-tag bg-transparent">Public</span>
              </div>
              <p className="text-[14px] font-medium text-[var(--theme-text-muted)] mb-6 flex-1 line-clamp-2 leading-relaxed">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-5 text-[13px] font-semibold text-[var(--theme-text-muted)]">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                    {repo.language}
                  </div>
                )}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1.5 group-hover:text-yellow-400 transition-colors">
                    <StarIcon size={16} />
                    {repo.stargazers_count}
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-1.5 group-hover:text-blue-400 transition-colors">
                    <GitForkIcon size={16} />
                    {repo.forks_count}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GithubApp;
