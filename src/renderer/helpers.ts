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

export function registerHelpers(): void {
  Handlebars.registerHelper('formatHour', formatHour);
  Handlebars.registerHelper('deltaArrow', deltaArrow);
  Handlebars.registerHelper('percentBar', percentBar);
  Handlebars.registerHelper('json', (v: unknown) => JSON.stringify(v));
  Handlebars.registerHelper('gt', (a: number, b: number) => a > b);
  Handlebars.registerHelper('lt', (a: number, b: number) => a < b);
  Handlebars.registerHelper('abs', (n: number) => Math.abs(n));
  Handlebars.registerHelper('ifNull', (val: unknown, fallback: unknown) => val ?? fallback);
}
