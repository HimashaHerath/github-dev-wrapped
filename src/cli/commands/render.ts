import { Command } from 'commander';
import { runRenderer } from '../../renderer/index.js';
import { getPeriod } from '../../collector/date-range.js';
import { readPeriodData, readAllPeriods } from '../../deployer/orphan-branch.js';
import { getPeriodFilePath } from '../../deployer/period.js';
import { spinner } from '../spinner.js';
import type { Frequency, Language, Theme, RenderConfig } from '../../types.js';

export const renderCommand = new Command('render')
  .description('Render HTML report and SVG card')
  .option('--date <YYYY-MM-DD>', 'target date within the period')
  .action(async (opts: { date?: string }) => {
    const frequency = (process.env.FREQUENCY ?? 'weekly') as Frequency;
    const timezone = process.env.TIMEZONE ?? 'UTC';
    const language = (process.env.LANGUAGE ?? 'en') as Language;
    const theme = (process.env.THEME ?? 'noir') as Theme;
    const dataDir = process.env.DATA_DIR ?? './data';
    const outputDir = process.env.OUTPUT_DIR ?? './output';
    const baseUrl = process.env.BASE_URL ?? '';
    const siteTitle = process.env.SITE_TITLE ?? 'Dev Wrapped';

    const period = getPeriod(frequency, opts.date, timezone);
    const filePath = getPeriodFilePath(frequency, period.label);
    const data = readPeriodData(dataDir, filePath);

    if (!data) {
      console.error(`No data found for ${period.label}. Run fetch first.`);
      process.exit(1);
    }

    const allPeriods = readAllPeriods(dataDir, frequency);
    const config: RenderConfig = { theme, language, timezone, baseUrl, siteTitle };

    const s = spinner('Rendering report...');
    await runRenderer(data, allPeriods, config, outputDir);
    s.stop(`Report rendered to ${outputDir}`);
  });
