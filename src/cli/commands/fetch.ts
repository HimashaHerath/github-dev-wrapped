import { Command } from 'commander';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { runCollector } from '../../collector/index.js';
import { getPeriod } from '../../collector/date-range.js';
import { getPeriodFilePath } from '../../deployer/period.js';
import { readPeriodData, writePeriodData } from '../../deployer/orphan-branch.js';
import { spinner } from '../spinner.js';
import type { Frequency } from '../../types.js';

export const fetchCommand = new Command('fetch')
  .description('Collect GitHub activity for the current period')
  .option('--date <YYYY-MM-DD>', 'target date within the period')
  .action(async (opts: { date?: string }) => {
    const token = process.env.GITHUB_TOKEN ?? '';
    const username = process.env.GITHUB_USERNAME ?? '';
    const frequency = (process.env.FREQUENCY ?? 'weekly') as Frequency;
    const timezone = process.env.TIMEZONE ?? 'UTC';
    const dataDir = process.env.DATA_DIR ?? './data';

    if (!token || !username) {
      console.error('GITHUB_TOKEN and GITHUB_USERNAME are required');
      process.exit(1);
    }

    const period = getPeriod(frequency, opts.date, timezone);
    const filePath = getPeriodFilePath(frequency, period.label);
    const prevPath = getPreviousPeriodPath(dataDir, frequency, period.label);
    const previous = prevPath ? readPeriodData(dataDir, prevPath) : null;

    const s = spinner('Collecting GitHub activity...');
    const data = await runCollector({ username, token, frequency, timezone, dateStr: opts.date, previousPeriodData: previous });

    mkdirSync(join(dataDir, frequency), { recursive: true });
    writePeriodData(dataDir, filePath, data);
    s.stop(`Collected ${data.signals.totalCommits} commits for ${data.period.label}`);
  });

function getPreviousPeriodPath(dataDir: string, frequency: Frequency, currentLabel: string): string | null {
  const dir = join(dataDir, frequency);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  const idx = files.indexOf(`${currentLabel}.json`);
  return idx > 0 ? `${frequency}/${files[idx - 1]}` : null;
}
