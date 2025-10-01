import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  try {
    const octokit = await getGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    const repoName = 'tco-application';
    
    // Check if repository exists
    let repoExists = false;
    try {
      await octokit.repos.get({
        owner: user.login,
        repo: repoName,
      });
      repoExists = true;
      console.log(`Repository ${repoName} already exists`);
    } catch (error: any) {
      if (error.status === 404) {
        console.log(`Repository ${repoName} does not exist, creating...`);
        
        // Create repository
        await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          description: 'Enterprise TCO (Total Cost of Ownership) Application for Shipping Terminals',
          private: false,
          auto_init: false,
        });
        console.log(`Created repository: ${repoName}`);
      } else {
        throw error;
      }
    }
    
    // Configure git
    const gitUser = user.login;
    const gitEmail = user.email || `${user.login}@users.noreply.github.com`;
    
    execSync(`git config user.name "${gitUser}"`, { stdio: 'inherit' });
    execSync(`git config user.email "${gitEmail}"`, { stdio: 'inherit' });
    
    // Add GitHub remote if not exists
    try {
      execSync('git remote get-url github', { stdio: 'pipe' });
      console.log('GitHub remote already configured');
    } catch {
      const repoUrl = `https://github.com/${user.login}/${repoName}.git`;
      execSync(`git remote add github ${repoUrl}`, { stdio: 'inherit' });
      console.log(`Added GitHub remote: ${repoUrl}`);
    }
    
    // Stage all changes
    execSync('git add -A', { stdio: 'inherit' });
    
    // Commit changes
    try {
      execSync('git commit -m "feat: Initial commit - TCO Application with Maersk Design System"', { stdio: 'inherit' });
      console.log('Changes committed');
    } catch (error: any) {
      if (error.message.includes('nothing to commit')) {
        console.log('No changes to commit');
      } else {
        throw error;
      }
    }
    
    // Push to GitHub
    const accessToken = await getAccessToken();
    const repoUrlWithAuth = `https://${accessToken}@github.com/${user.login}/${repoName}.git`;
    
    execSync(`git push ${repoUrlWithAuth} main --force`, { stdio: 'inherit' });
    console.log(`\n✅ Successfully pushed to GitHub!`);
    console.log(`Repository URL: https://github.com/${user.login}/${repoName}`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
