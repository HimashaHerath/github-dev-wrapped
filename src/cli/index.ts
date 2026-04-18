#!/usr/bin/env node
import { Command } from 'commander';
import { createRequire } from 'module';
import { fetchCommand } from './commands/fetch.js';
import { generateCommand } from './commands/generate.js';
import { renderCommand } from './commands/render.js';
import { deployCommand } from './commands/deploy.js';
import { commitMsgCommand } from './commands/commit-msg.js';
import { setupCommand } from './commands/setup/index.js';

const require = createRequire(import.meta.url);
const { version } = require('../../package.json') as { version: string };

const program = new Command();

program
  .name('github-dev-wrapped')
  .description('AI-powered GitHub activity reports')
  .version(version);

program.addCommand(fetchCommand);
program.addCommand(generateCommand);
program.addCommand(renderCommand);
program.addCommand(deployCommand);
program.addCommand(commitMsgCommand);
program.addCommand(setupCommand);

program.parse();
