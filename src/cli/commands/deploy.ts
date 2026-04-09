import { Command } from 'commander';
import { runDeploy } from '../../deployer/index.js';
import { spinner } from '../spinner.js';

export const deployCommand = new Command('deploy')
  .description('Deploy output to GitHub Pages')
  .action(async () => {
    const token = process.env.GITHUB_TOKEN ?? '';
    const repository = process.env.GITHUB_REPOSITORY ?? '';
    const outputDir = process.env.OUTPUT_DIR ?? './output';

    if (!token || !repository) {
      console.error('GITHUB_TOKEN and GITHUB_REPOSITORY are required');
      process.exit(1);
    }

    const s = spinner('Deploying to GitHub Pages...');
    await runDeploy({ outputDir, token, repository });
    s.stop('Deployed to GitHub Pages');
  });
