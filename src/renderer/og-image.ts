import type { PeriodData } from '../types.js';

export function renderOgImageSvg(data: PeriodData): string {
  const { period, signals, llm } = data;
  const headline = llm?.headline ?? period.label;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <text x="60" y="120" font-family="monospace" font-size="72" font-weight="900" fill="#ffffff">${escapeXml(headline)}</text>
  <text x="60" y="200" font-family="monospace" font-size="28" fill="#888">${escapeXml(period.label)}</text>
  <text x="60" y="340" font-family="monospace" font-size="48" font-weight="700" fill="#ffffff">${signals.totalCommits}</text>
  <text x="60" y="380" font-family="monospace" font-size="18" fill="#666">commits</text>
  <text x="220" y="340" font-family="monospace" font-size="48" font-weight="700" fill="#ffffff">${signals.totalPRsMerged}</text>
  <text x="220" y="380" font-family="monospace" font-size="18" fill="#666">PRs merged</text>
  <text x="420" y="340" font-family="monospace" font-size="48" font-weight="700" fill="#ffffff">${signals.streak}</text>
  <text x="420" y="380" font-family="monospace" font-size="18" fill="#666">day streak</text>
</svg>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
