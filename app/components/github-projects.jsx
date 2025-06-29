'use client';

import { useState, useEffect } from 'react';

// Function to format repository names
function formatRepoName(name) {
  return name
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
    .trim();
}

// Client-side function to fetch repos
async function fetchRepos(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching repos:', error);
    throw error;
  }
}

export default function GitHubProjects({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedRepos = await fetchRepos(username);
        
        // Filter out forked repositories and sort by stars/updated date
        const filteredRepos = fetchedRepos
          .filter(repo => !repo.fork && repo.name !== username) // Exclude forks and user's own profile repo
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 12); // Limit to 12 projects
        
        setRepos(filteredRepos);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError('Failed to load projects. Please check your GitHub username or try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getRepos();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="text-center text-zinc-500 py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-400"></div>
        <p className="mt-4 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-zinc-500 py-12">
        <p className="text-lg text-red-400">{error}</p>
        <p className="mt-2">Please try again later.</p>
      </div>
    );
  }

  // Only render if there are actual projects
  if (!repos || repos.length === 0) {
    return (
      <div className="text-center text-zinc-500 py-12">
        <p className="text-lg">No projects found. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl auto-rows-fr">
      {repos.map((repo) => (
        <div key={repo.id} className="bg-zinc-800/50 p-8 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all group flex flex-col h-full min-h-[280px]">
          <div className="flex items-start justify-between mb-6 flex-shrink-0">
            <h3 className="text-xl md:text-2xl text-zinc-300 font-bold group-hover:text-white transition-colors break-words pr-3 leading-tight">
              {formatRepoName(repo.name)}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-zinc-400 flex-shrink-0">
              <span className="flex items-center gap-1">
                <span>⭐</span>
                <span className="font-semibold">{repo.stargazers_count || 0}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>🔀</span>
                <span className="font-semibold">{repo.forks_count || 0}</span>
              </span>
            </div>
          </div>
          
          <p className="text-base md:text-lg text-zinc-500 mb-6 line-clamp-4 flex-grow leading-relaxed">
            {repo.description || 'No description available'}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6 flex-shrink-0">
            {repo.language && (
              <span className="px-3 py-2 text-sm bg-zinc-700 text-zinc-300 rounded-lg font-medium">
                {repo.language}
              </span>
            )}
            {repo.topics && repo.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="px-3 py-2 text-sm bg-zinc-700 text-zinc-300 rounded-lg font-medium">
                {topic}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-auto flex-shrink-0">
            <div className="text-sm text-zinc-400">
              Updated {new Date(repo.updated_at).toLocaleDateString()}
            </div>
            <div className="flex space-x-3">
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Demo
                </a>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
              >
                Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 