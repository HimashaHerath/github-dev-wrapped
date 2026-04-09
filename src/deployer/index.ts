import { execSync } from 'child_process';

export interface DeployOptions {
  outputDir: string;
  token: string;
  repository: string;
}

export async function runDeploy(opts: DeployOptions): Promise<void> {
  const { outputDir, token, repository } = opts;
  const [owner, repo] = repository.split('/');
  const remote = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;

  execSync(`git -C "${outputDir}" init -b gh-pages`, { stdio: 'inherit' });
  execSync(`git -C "${outputDir}" add .`, { stdio: 'inherit' });
  execSync(`git -C "${outputDir}" -c user.name="github-dev-wrapped[bot]" -c user.email="bot@noreply" commit -m "deploy: update report"`, { stdio: 'inherit' });
  execSync(`git -C "${outputDir}" push "${remote}" gh-pages --force`, { stdio: 'inherit' });
}
