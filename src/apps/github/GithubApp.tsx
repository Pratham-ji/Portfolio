import React, { useEffect, useState } from 'react';
import { fetchGithubProfile, fetchGithubRepos, GithubProfile, GithubRepo } from './utils/api';
import { Loader2Icon, AlertTriangleIcon, GitBranchIcon, UsersIcon, FolderKanbanIcon, StarIcon, GitForkIcon } from 'lucide-react';

const USERNAME = 'Pratham-ji'; // Configured for the user

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
          setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1117] text-[#c9d1d9] gap-4">
        <Loader2Icon size={32} className="animate-spin text-blue-400" />
        <p className="text-sm text-[#8b949e]">Fetching GitHub data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1117] text-[#c9d1d9] gap-4 p-8 text-center">
        <AlertTriangleIcon size={48} className="text-red-400" />
        <h2 className="text-xl font-bold">Connection Error</h2>
        <p className="text-[#8b949e]">{error}</p>
        <button 
          onClick={() => window.location.reload()} // For simplicity, though a proper retry would be better. We'll just provide a simple retry button.
          className="mt-4 px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!profile || repos.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1117] text-[#c9d1d9]">
        <GitBranchIcon size={48} className="text-[#8b949e] mb-4 opacity-50" />
        <p>No GitHub data found for {USERNAME}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0d1117] text-[#c9d1d9] overflow-y-auto flex flex-col md:flex-row">
      {/* Sidebar Profile */}
      <div className="w-full md:w-72 p-6 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-[#30363d]">
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          className="w-48 h-48 rounded-full border border-[#30363d] mb-4"
        />
        <h1 className="text-2xl font-bold text-[#c9d1d9]">{profile.name}</h1>
        <h2 className="text-lg text-[#8b949e] mb-4">{profile.login}</h2>
        <p className="text-sm text-[#c9d1d9] mb-4 text-center md:text-left">{profile.bio}</p>
        
        <div className="flex items-center gap-4 text-sm text-[#8b949e] mb-4">
          <div className="flex items-center gap-1">
            <UsersIcon size={16} />
            <span className="font-semibold text-[#c9d1d9]">{profile.followers}</span> followers
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#c9d1d9]">{profile.following}</span> following
          </div>
        </div>

        <a 
          href={profile.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="w-full py-1.5 text-center bg-[#21262d] border border-[#363b42] rounded-md text-sm font-medium hover:bg-[#30363d] transition-colors"
        >
          View on GitHub
        </a>
      </div>

      {/* Main Content - Repositories */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#30363d]">
          <FolderKanbanIcon size={20} />
          <h2 className="text-lg font-semibold">Repositories</h2>
          <span className="bg-[#30363d] px-2 py-0.5 rounded-full text-xs">{profile.public_repos}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max overflow-y-auto pb-8 pr-2">
          {repos.map(repo => (
            <div key={repo.id} className="p-4 rounded-xl border border-[#30363d] bg-[#161b22] hover:border-[#8b949e] transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#58a6ff] font-semibold text-base hover:underline break-all line-clamp-1"
                >
                  {repo.name}
                </a>
                <span className="px-2 py-0.5 rounded-full border border-[#30363d] text-xs text-[#8b949e]">Public</span>
              </div>
              <p className="text-sm text-[#8b949e] mb-4 flex-1 line-clamp-2">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    {repo.language}
                  </div>
                )}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                    <StarIcon size={14} />
                    {repo.stargazers_count}
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                    <GitForkIcon size={14} />
                    {repo.forks_count}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GithubApp;
