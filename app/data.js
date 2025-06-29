// Note: This API will be replaced by use cache when it reaches stability.
import { unstable_cache } from 'next/cache';

const revalidate = 60;
const MINUTES_5 = 60 * 5;
const HOURS_1 = 60 * 60;
const HOURS_12 = 60 * 60 * 12;

// Helper function to create GitHub API headers
function createGitHubHeaders() {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'portfolio-app'
    };
    
    // Add authorization if token is available
    if (process.env.GH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GH_TOKEN}`;
    }
    
    return headers;
}

// TODO: Implement option to switch between info for authenticated user and other users.
export async function getUser(username) {
    console.log('Fetching user data for', username);
    console.time('getUser');
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
            headers: createGitHubHeaders(),
            next: { revalidate }
        });
        
        if (!res.ok) {
            console.error('GitHub API getUser error:', res.status, res.statusText);
            // Return fallback data if API fails
            return {
                name: username,
                login: username,
                avatar_url: '',
                bio: 'GitHub profile information unavailable',
                public_repos: 0,
                followers: 0,
                following: 0
            };
        }
        
        console.timeEnd('getUser');
        return res.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            name: username,
            login: username,
            avatar_url: '',
            bio: 'GitHub profile information unavailable',
            public_repos: 0,
            followers: 0,
            following: 0
        };
    }
}

export async function getRepos(username) {
    console.log('Fetching repos for', username);
    console.time('getRepos');
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            headers: createGitHubHeaders(),
            next: { revalidate: HOURS_1 }
        });
        
        if (!res.ok) {
            console.error('GitHub API getRepos error:', res.status, res.statusText);
            return [];
        }
        
        console.timeEnd('getRepos');
        const repos = await res.json();
        
        // Handle pagination if needed
        if (res.headers.get('link') && repos.length === 100) {
            console.log('More than 100 repos found, fetching additional pages...');
            let page = 2;
            let hasMore = true;
            
            while (hasMore && page <= 3) { // Limit to 3 pages (300 repos max)
                try {
                    const nextRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&page=${page}`, {
                        headers: createGitHubHeaders(),
                        next: { revalidate: HOURS_1 }
                    });
                    
                    if (nextRes.ok) {
                        const nextRepos = await nextRes.json();
                        repos.push(...nextRepos);
                        
                        // Check if there are more pages
                        const linkHeader = nextRes.headers.get('link');
                        hasMore = linkHeader && linkHeader.includes('rel="next"');
                        page++;
                    } else {
                        hasMore = false;
                    }
                } catch (error) {
                    console.error('Error fetching additional repos page:', error);
                    hasMore = false;
                }
            }
        }
        
        return repos;
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
}

export async function getSocialAccounts(username) {
    console.log('Fetching social accounts for', username);
    console.time('getSocialAccounts');
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}/social_accounts`, {
            headers: createGitHubHeaders(),
            next: { revalidate: HOURS_12 }
        });
        
        if (!res.ok) {
            console.error('GitHub API getSocialAccounts error:', res.status, res.statusText);
            return [];
        }
        
        console.timeEnd('getSocialAccounts');
        return res.json();
    } catch (error) {
        console.error('Error fetching social accounts:', error);
        return [];
    }
}

export const getPinnedRepos = unstable_cache(async (username) => {
    console.log('Fetching pinned repos for', username);
    console.time('getPinnedRepos');
    
    try {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                ...createGitHubHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                query: `{
                    user(login: "${username}") {
                        pinnedItems(first: 6, types: REPOSITORY) {
                            nodes {
                                ... on Repository {
                                    name
                                    description
                                    stargazerCount
                                    forkCount
                                    primaryLanguage {
                                        name
                                    }
                                    url
                                }
                            }
                        }
                    }
                }`
            }),
        });
        
        if (!res.ok) {
            console.error('GitHub GraphQL getPinnedRepos error:', res.status, res.statusText);
            return [];
        }
        
        const pinned = await res.json();
        console.timeEnd('getPinnedRepos');
        
        if (pinned.data?.user?.pinnedItems?.nodes) {
            return pinned.data.user.pinnedItems.nodes;
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching pinned repos:', error);
        return [];
    }
}, ['getPinnedRepos'], { revalidate: HOURS_12 });

export const getUserOrganizations = unstable_cache(async (username) => {
    console.log('Fetching organizations for', username);
    console.time('getUserOrganizations');
    
    try {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                ...createGitHubHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    user(login: "${username}") {
                        organizations(first: 6) {
                            nodes {
                                name
                                websiteUrl
                                url
                                avatarUrl
                                description
                            }
                        }
                    }
                }`
            }),
        });
        
        console.timeEnd('getUserOrganizations');
        
        if (!res.ok) {
            console.error('GitHub GraphQL getUserOrganizations error:', res.status, res.statusText);
            return { data: { user: { organizations: { nodes: [] } } } };
        }
        
        const orgs = await res.json();
        return orgs;
    } catch (error) {
        console.error('Error fetching organizations:', error);
        return { data: { user: { organizations: { nodes: [] } } } };
    }
}, ['getUserOrganizations'], { revalidate: HOURS_12 });

export const getVercelProjects = async () => {
    if (!process.env.VC_TOKEN) {
        console.log('No Vercel token found - no projects will be shown.');
        return { projects: [] };
    }
    
    console.log('Fetching Vercel projects');
    console.time('getVercelProjects');
    
    try {
        const res = await fetch('https://api.vercel.com/v9/projects', {
            headers: { Authorization: `Bearer ${process.env.VC_TOKEN}` },
            next: { revalidate: HOURS_12 }
        });
        
        console.timeEnd('getVercelProjects');
        
        if (!res.ok) {
            console.error('Vercel API returned an error.', res.status, res.statusText);
            return { projects: [] };
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching Vercel projects:', error);
        return { projects: [] };
    }
};

/** Cache revalidated every 12 hours. */
export const getNextjsLatestRelease = unstable_cache(async () => {
    try {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                ...createGitHubHeaders(),
                'Content-Type': 'application/json'
            },
            next: { revalidate: HOURS_12 },
            body: JSON.stringify({
                query: `{
                    repository(name: "next.js", owner: "vercel") {
                        latestRelease {
                            tagName
                            updatedAt
                        }
                    }
                }`
            }),
        });
        
        if (!res.ok) {
            console.error('GitHub API getNextjsLatestRelease error:', res.status, res.statusText);
            return {};
        }
        
        const nextjsLatest = await res.json();
        
        if (nextjsLatest.data?.repository?.latestRelease) {
            const result = {
                tagName: nextjsLatest.data.repository.latestRelease.tagName.replace('v', ''),
                updatedAt: nextjsLatest.data.repository.latestRelease.updatedAt,
            };
            return result;
        }
        
        return {};
    } catch (error) {
        console.error('Error fetching Next.js latest release:', error);
        return {};
    }
}, ['getNextjsLatestRelease'], { revalidate: HOURS_1 });

export const getRepositoryPackageJson = unstable_cache(async (username, reponame) => {
    try {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                ...createGitHubHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    repository(name: "${reponame}", owner: "${username}") {
                        object(expression: "HEAD:package.json") {
                            ... on Blob {
                                text
                            }
                        }
                    }
                }`
            }),
        });
        
        const response = await res.json();
        
        if (response.data?.repository?.object?.text) {
            try {
                const packageJson = JSON.parse(response.data.repository.object.text);
                return packageJson;
            } catch (error) {
                console.error('Error parsing package.json', username, reponame, error);
                return null;
            }
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching repository package.json:', error);
        return null;
    }
}, ['getRepositoryPackageJson'], { revalidate: HOURS_1 });

export const getRecentUserActivity = async (username) => {
    console.log('Fetching recent activity for', username);
    console.time('getRecentUserActivity');
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, {
            headers: createGitHubHeaders(),
            next: { revalidate: MINUTES_5 }
        });
        
        if (!res.ok) {
            console.error('GitHub API getRecentUserActivity error:', res.status, res.statusText);
            return [];
        }
        
        const response = await res.json();
        
        // Check pagination
        if (res.headers.get('link')) {
            let page = 2;
            let nextLink = res.headers.get('link').split(',').find((link) => link.includes('rel="next"'));
            
            while (nextLink && page <= 3) { // Limit to 3 pages
                try {
                    const nextRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`, {
                        headers: createGitHubHeaders(),
                        next: { revalidate: MINUTES_5 }
                    });
                    
                    if (nextRes.ok) {
                        const nextResponse = await nextRes.json();
                        response.push(...nextResponse);
                        nextLink = nextRes.headers.get('link')?.split(',').find((link) => link.includes('rel="next"'));
                        page++;
                    } else {
                        break;
                    }
                } catch (error) {
                    console.error('Error fetching additional activity page:', error);
                    break;
                }
            }
        }
        
        console.timeEnd('getRecentUserActivity');
        return response;
    } catch (error) {
        console.error('Error fetching recent user activity:', error);
        return [];
    }
};

export const getTrafficPageViews = async (username, reponame) => {
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${reponame}/traffic/views`, {
            headers: createGitHubHeaders(),
            next: { revalidate: HOURS_1 }
        });
        
        if (!res.ok) {
            console.error('GitHub API getTrafficPageViews error:', res.status, res.statusText);
            return { uniques: 0, views: [] };
        }
        
        const response = await res.json();
        return response;
    } catch (error) {
        console.error('Error fetching traffic page views:', error);
        return { uniques: 0, views: [] };
    }
};

export const getDependabotAlerts = unstable_cache(async (username, reponame) => {
    const res = await fetch('https://api.github.com/repos/' + username + '/' + reponame + '/dependabot/alerts', {
        headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
        next: { revalidate: HOURS_12 }
    });

    const response = await res.json();

    // Id dependabot is not enabled, the response will be an object, not an array.
    if (response.length === undefined) {
        return [];
    }
    const openAlertsBySeverity = response.reduce((acc, alert) => {
        if (alert.state === 'open') {
            acc[alert.security_advisory.severity] = acc[alert.security_advisory.severity] ? acc[alert.security_advisory.severity] + 1 : 1;
        }
        return acc;
    }, {});

    return openAlertsBySeverity;
}, ['getDependabotAlerts'], { revalidate: HOURS_12 });

/**
 * Determines if a repository is using Next.js App Router or legacy pages/_app.jsx. Or both.
 * Using unstable_cache because fetch calls are not cached when failing. This is the case when eg _app.jsx is not found.
 * @param {*} repoOwner GitHub username
 * @param {string} repoName repository name
 * @returns Object with two booleans: isRouterPages and isRouterApp
 */
export const checkAppJsxExistence = unstable_cache(async (repoOwner, repoName) => {
    const urlPagesApp = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/pages/_app.jsx`;
    // TODO: Add more possible ways to check for App Router.
    const urlAppLayout = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/app/layout.jsx`;

    const res = {
        isRouterPages: false,
        isRouterApp: false,
    };

    try {
        const [ isPagesRes, isAppLayoutRes ] = await Promise.all([
            fetch(urlPagesApp, {
                headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
                next: { revalidate: HOURS_1 }
            }),
            fetch(urlAppLayout, {
                headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
                next: { revalidate: HOURS_1 }
            }),
        ]);

        if (isPagesRes.status === 200) {
            res.isRouterPages = true;
        }

        if (isAppLayoutRes.status === 200) {
            res.isRouterApp = true;
        }
    } catch (error) {
        console.error(`Error checking _app.jsx existence in ${repoName}: ${error.message}`);
    }

    return res;
}, ['checkAppJsxExistence'], { revalidate: HOURS_1 });
