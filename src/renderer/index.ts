import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Period, PeriodData, RenderConfig } from '../types.js';
import { registerHelpers } from './helpers.js';
import { getTheme } from './themes/index.js';
import { buildCardSvgData, renderCardSvg } from './card.js';
import { renderOgImageSvg } from './og-image.js';
import { renderRss } from './rss.js';

function formatDateRange(period: Period): string {
  const start = new Date(period.startDate);
  const end = new Date(period.endDate);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (period.frequency === 'monthly') {
    return `${months[start.getUTCMonth()]} ${start.getUTCFullYear()}`;
  }
  const sm = months[start.getUTCMonth()];
  const em = months[end.getUTCMonth()];
  const sd = start.getUTCDate();
  const ed = end.getUTCDate();
  const year = end.getUTCFullYear();
  return sm === em ? `${sm} ${sd}–${ed}, ${year}` : `${sm} ${sd} – ${em} ${ed}, ${year}`;
}

export async function runRenderer(
  currentData: PeriodData,
  allPeriods: PeriodData[],
  config: RenderConfig,
  outputDir: string
): Promise<void> {
  registerHelpers();
  const theme = await getTheme(config.theme);

  const periodPath = join(outputDir, currentData.period.frequency, currentData.period.label);
  mkdirSync(periodPath, { recursive: true });

  const showArc = allPeriods.length >= 3;
  const maxHourCount = Math.max(...currentData.signals.hourDistribution.map(h => h.count), 1);
  const maxArcCommits = Math.max(...allPeriods.map(p => p.signals.totalCommits), 1);
  const historyWithHeights = allPeriods.map(p => ({
    ...p,
    barHeight: Math.max(4, Math.round((p.signals.totalCommits / maxArcCommits) * 100)),
  }));

  const templateData = {
    signals: currentData.signals,
    delta: currentData.delta,
    llm: currentData.llm,
    period: currentData.period,
    periodLabel: currentData.period.label,
    dateRange: formatDateRange(currentData.period),
    history: historyWithHeights,
    showArc,
    maxHourCount,
    baseUrl: config.baseUrl,
    language: config.language,
    title: `${config.siteTitle} — ${currentData.period.label}`,
    description: currentData.llm?.archetype ?? `GitHub activity for ${currentData.period.label}`,
    subtitle: `${currentData.period.frequency} report`,
    ogImage: `${config.baseUrl}/${currentData.period.frequency}/${currentData.period.label}/og.svg`,
    styles: '',
  };

  writeFileSync(join(periodPath, 'index.html'), theme.renderReport(templateData));
  writeFileSync(join(periodPath, 'og.svg'), renderOgImageSvg(currentData));

  const cardData = buildCardSvgData(currentData.signals, currentData.llm);
  mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
  writeFileSync(join(outputDir, 'screenshots', 'card.svg'), renderCardSvg(cardData, false));
  writeFileSync(join(outputDir, 'screenshots', 'card-dark.svg'), renderCardSvg(cardData, true));

  writeFileSync(join(outputDir, 'index.html'), theme.renderIndexPage({ ...templateData, periods: allPeriods }));
  writeFileSync(join(outputDir, 'feed.xml'), renderRss(allPeriods, config.baseUrl, config.siteTitle));
}
