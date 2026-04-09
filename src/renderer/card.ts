import type { ActivitySignals, LLMOutput } from '../types.js';

export interface CardSvgData {
  headline: string;
  stats: { label: string; value: string }[];
}

export function buildCardSvgData(signals: ActivitySignals, llm: LLMOutput | null): CardSvgData {
  return {
    headline: llm?.headline ?? 'GITHUB ACTIVITY REPORT',
    stats: [
      { label: 'commits', value: String(signals.totalCommits) },
      { label: 'PRs', value: String(signals.totalPRsMerged) },
      { label: 'streak', value: `${signals.streak}d` },
    ],
  };
}

export function renderCardSvg(data: CardSvgData, dark: boolean): string {
  const bg = dark ? '#0a0a0a' : '#ffffff';
  const fg = dark ? '#e8e8e8' : '#1a1a1a';
  const muted = dark ? '#666' : '#999';
  const statsText = data.stats.map(s => `${s.value} ${s.label}`).join('  ·  ');
  const ticker = `${data.headline}  ——  ${statsText}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="48" viewBox="0 0 800 48">
  <rect width="800" height="48" fill="${bg}"/>
  <style>
    @keyframes scroll { 0% { transform: translateX(800px); } 100% { transform: translateX(-100%); } }
    .ticker { animation: scroll 20s linear infinite; font-family: monospace; font-size: 13px; fill: ${fg}; }
    .label { font-family: monospace; font-size: 10px; fill: ${muted}; }
  </style>
  <text class="label" x="8" y="32">DEV REPORT</text>
  <clipPath id="clip"><rect x="90" y="0" width="702" height="48"/></clipPath>
  <g clip-path="url(#clip)">
    <text class="ticker" y="30">${escapeXml(ticker)}</text>
  </g>
</svg>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
