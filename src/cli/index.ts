#!/usr/bin/env node
import { Command } from 'commander';
import { fetchCommand } from './commands/fetch.js';
import { generateCommand } from './commands/generate.js';
import { renderCommand } from './commands/render.js';
import { deployCommand } from './commands/deploy.js';
import { commitMsgCommand } from './commands/commit-msg.js';

const program = new Command();

program
  .name('github-dev-wrapped')
  .description('AI-powered GitHub activity reports')
  .version('0.1.0');

program.addCommand(fetchCommand);
program.addCommand(generateCommand);
program.addCommand(renderCommand);
program.addCommand(deployCommand);
program.addCommand(commitMsgCommand);

program.parse();
