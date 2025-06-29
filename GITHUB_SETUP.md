# GitHub API Setup Guide

This guide will help you set up the GitHub API for your portfolio to fetch your repositories and profile information.

## 1. Create a GitHub Personal Access Token

### Step 1: Go to GitHub Settings
1. Log in to your GitHub account
2. Click on your profile picture → Settings
3. Scroll down to "Developer settings" (bottom left)
4. Click on "Personal access tokens" → "Tokens (classic)"

### Step 2: Generate New Token
1. Click "Generate new token" → "Generate new token (classic)"
2. Give it a descriptive name like "Portfolio API Access"
3. Set expiration (recommended: 90 days or custom)
4. Select the following scopes:
   - ✅ `public_repo` (to read public repositories)
   - ✅ `read:user` (to read user profile)
   - ✅ `read:org` (to read organization memberships)
   - ✅ `repo` (if you want to access private repos too)

### Step 3: Copy the Token
1. Click "Generate token"
2. **IMPORTANT**: Copy the token immediately - you won't see it again!
3. Store it securely

## 2. Environment Configuration

### Create .env.local file
Create a `.env.local` file in your project root with:

```env
# GitHub Configuration
GH_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username

# Email Configuration (if using EmailJS)
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_USER_ID=your_user_id_here

# Vercel Configuration (optional)
VC_TOKEN=your_vercel_token_here
```

### Update data.json
Make sure your `data.json` file has the correct GitHub username:

```json
{
  "description": "My portfolio projects",
  "githubUsername": "your_github_username",
  "avatarUrl": "",
  "displayName": "Your Name",
  "email": "your.email@example.com",
  "projects": {
    "blacklist": [],
    "heroNames": []
  }
}
```

## 3. Test the Setup

### Start the Development Server
```bash
npm run dev
```

### Check Console Logs
Look for these messages in your terminal:
- ✅ "Fetching user data for [username]"
- ✅ "Fetching repos for [username]"
- ✅ "GitHub API getUser completed in Xms"

### Common Issues and Solutions

#### Issue 1: "GitHub API getUser error: 401 Unauthorized"
**Solution**: 
- Check if your `GH_TOKEN` is correct
- Ensure the token hasn't expired
- Verify the token has the required scopes

#### Issue 2: "GitHub API getUser error: 403 Forbidden"
**Solution**:
- You might have hit the rate limit
- Wait a few minutes and try again
- Consider using a token with higher rate limits

#### Issue 3: "GitHub API getUser error: 404 Not Found"
**Solution**:
- Check if the GitHub username in `data.json` is correct
- Ensure the user exists and has a public profile

#### Issue 4: No repositories showing
**Solution**:
- Make sure you have public repositories
- Check if repositories are not in the blacklist
- Verify the token has `public_repo` scope

## 4. Rate Limiting

### GitHub API Limits
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour
- **Enterprise**: Higher limits available

### Monitoring Rate Limits
Check the response headers for rate limit information:
- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when limit resets

## 5. Advanced Configuration

### Custom Repository Filtering
You can modify the filtering logic in `app/components/github-projects.jsx`:

```javascript
// Filter out specific repositories
const filteredRepos = repos
  .filter(repo => !repo.fork && repo.name !== username)
  .filter(repo => !repo.name.includes('test')) // Exclude test repos
  .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
  .slice(0, 12);
```

### Caching Configuration
The API uses Next.js caching. You can adjust cache times in `app/data.js`:

```javascript
const revalidate = 60; // 1 minute
const MINUTES_5 = 60 * 5;
const HOURS_1 = 60 * 60;
const HOURS_12 = 60 * 60 * 12;
```

## 6. Security Best Practices

### Token Security
- Never commit your token to version control
- Use environment variables
- Rotate tokens regularly
- Use minimal required scopes

### Environment Variables
- Always use `.env.local` for local development
- Use platform environment variables for production
- Never expose tokens in client-side code

## 7. Troubleshooting Checklist

- [ ] GitHub token is valid and not expired
- [ ] Token has required scopes (`public_repo`, `read:user`)
- [ ] GitHub username is correct in `data.json`
- [ ] `.env.local` file exists with `GH_TOKEN`
- [ ] No typos in environment variable names
- [ ] Development server restarted after adding environment variables
- [ ] GitHub profile is public
- [ ] You have public repositories

## 8. Support

If you're still having issues:
1. Check the browser console for errors
2. Check the terminal for API error messages
3. Verify your GitHub token works with a simple curl request:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user
   ```
4. Check GitHub's API status: https://www.githubstatus.com/ 