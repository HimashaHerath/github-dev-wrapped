import Handlebars from 'handlebars';

export function formatHour(hour: number): string {
  if (hour === 0) return '12am';
  if (hour === 12) return '12pm';
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
}

export function deltaArrow(delta: number): string {
  if (delta > 0) return '↑';
  if (delta < 0) return '↓';
  return '→';
}

export function percentBar(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function heatOpacity(count: number, max: number): string {
  if (count === 0) return '0.07';
  return (0.15 + (count / max) * 0.85).toFixed(2);
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function shortRepo(nameWithOwner: string): string {
  return nameWithOwner.split('/')[1] ?? nameWithOwner;
}

export function repoOwner(nameWithOwner: string): string {
  return nameWithOwner.split('/')[0] ?? '';
}

export function registerHelpers(): void {
  Handlebars.registerHelper('formatHour', formatHour);
  Handlebars.registerHelper('deltaArrow', deltaArrow);
  Handlebars.registerHelper('percentBar', percentBar);
  Handlebars.registerHelper('heatOpacity', heatOpacity);
  Handlebars.registerHelper('formatPercent', formatPercent);
  Handlebars.registerHelper('shortRepo', shortRepo);
  Handlebars.registerHelper('repoOwner', repoOwner);
  Handlebars.registerHelper('json', (v: unknown) => JSON.stringify(v));
  Handlebars.registerHelper('gt', (a: number, b: number) => a > b);
  Handlebars.registerHelper('lt', (a: number, b: number) => a < b);
  Handlebars.registerHelper('abs', (n: number) => Math.abs(n));
  Handlebars.registerHelper('ifNull', (val: unknown, fallback: unknown) => val ?? fallback);
}
