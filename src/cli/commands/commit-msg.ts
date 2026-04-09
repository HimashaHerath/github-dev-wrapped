import { Command } from 'commander';
import { getPeriod } from '../../collector/date-range.js';
import type { Frequency } from '../../types.js';

export const commitMsgCommand = new Command('commit-msg')
  .description('Print a git commit message for the current period data')
  .argument('<mode>', 'fetch or generate')
  .option('--date <YYYY-MM-DD>', 'target date')
  .action((mode: string, opts: { date?: string }) => {
    const frequency = (process.env.FREQUENCY ?? 'weekly') as Frequency;
    const timezone = process.env.TIMEZONE ?? 'UTC';
    const period = getPeriod(frequency, opts.date, timezone);
    const verb = mode === 'fetch' ? 'data: collect' : 'data: generate narrative';
    console.log(`${verb} ${period.label}`);
  });
