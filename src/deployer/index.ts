import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export interface DeployOptions {
  outputDir: string;
  token: string;
  repository: string;
}

export async function runDeploy(opts: DeployOptions): Promise<void> {
  const { outputDir, token, repository } = opts;
  const [owner, repo] = repository.split('/');
  const remote = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;

  // Work in a temp directory so we can merge old + new content
  const workDir = join(tmpdir(), `gh-pages-deploy-${Date.now()}`);
  mkdirSync(workDir, { recursive: true });

  // Try to clone the existing gh-pages branch to preserve previous reports
  let hasExistingBranch = false;
  try {
    execSync(
      `git clone --depth 1 --branch gh-pages "${remote}" "${workDir}"`,
      { stdio: 'pipe' }
    );
    hasExistingBranch = true;
  } catch {
    // gh-pages branch doesn't exist yet — start fresh
    execSync(`git -C "${workDir}" init -b gh-pages`, { stdio: 'inherit' });
  }

  // Copy new output files on top of existing content (overwriting updated files)
  cpSync(outputDir, workDir, { recursive: true, force: true });

  // Prevent Jekyll from processing our static HTML
  writeFileSync(join(workDir, '.nojekyll'), '');

  if (!hasExistingBranch) {
    execSync(`git -C "${workDir}" remote add origin "${remote}"`, { stdio: 'inherit' });
  }

  execSync(`git -C "${workDir}" add .`, { stdio: 'inherit' });

  // Check if there are changes to commit
  try {
    execSync(`git -C "${workDir}" diff --cached --quiet`, { stdio: 'pipe' });
    console.log('No deployment changes to commit');
    return;
  } catch {
    // There are changes — continue with commit
  }

  execSync(
    `git -C "${workDir}" -c user.name="github-dev-wrapped[bot]" -c user.email="bot@noreply" commit -m "deploy: update report"`,
    { stdio: 'inherit' }
  );
  execSync(
    `git -C "${workDir}" push origin gh-pages --force`,
    { stdio: 'inherit' }
  );
}
