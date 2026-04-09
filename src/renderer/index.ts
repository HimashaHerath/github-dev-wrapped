import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { PeriodData, RenderConfig } from '../types.js';
import { registerHelpers } from './helpers.js';
import { getTheme } from './themes/index.js';
import { buildCardSvgData, renderCardSvg } from './card.js';
import { renderOgImageSvg } from './og-image.js';
import { renderRss } from './rss.js';

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
  const templateData = {
    signals: currentData.signals,
    delta: currentData.delta,
    llm: currentData.llm,
    period: currentData.period,
    periodLabel: currentData.period.label,
    history: allPeriods,
    showArc,
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
