import type { PeriodData } from '../types.js';

export function renderRss(periods: PeriodData[], baseUrl: string, siteTitle: string): string {
  const items = periods.map(p => `
    <item>
      <title>${escapeXml(p.period.label)}: ${escapeXml(p.llm?.headline ?? p.period.label)}</title>
      <link>${baseUrl}/${p.period.frequency}/${p.period.label}/</link>
      <pubDate>${new Date(p.generatedAt).toUTCString()}</pubDate>
      <description>${escapeXml(p.llm?.archetype ?? '')}</description>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${baseUrl}</link>
    <description>Developer activity reports</description>
    ${items}
  </channel>
</rss>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
