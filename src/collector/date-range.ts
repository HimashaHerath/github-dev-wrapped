import type { Frequency, Period } from '../types.js';

export function getPeriod(frequency: Frequency, dateStr: string | undefined, _timezone: string): Period {
  const ref = dateStr ? new Date(dateStr + 'T12:00:00Z') : new Date();
  if (frequency === 'weekly') return getWeeklyPeriod(ref);
  return getMonthlyPeriod(ref);
}

function getWeeklyPeriod(ref: Date): Period {
  const day = ref.getUTCDay() || 7; // Sunday = 7
  const monday = new Date(ref);
  monday.setUTCDate(ref.getUTCDate() - day + 1);
  monday.setUTCHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);

  return {
    frequency: 'weekly',
    label: getPeriodLabel('weekly', monday),
    startDate: monday,
    endDate: sunday,
  };
}

function getMonthlyPeriod(ref: Date): Period {
  const start = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), 1));
  const end = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth() + 1, 0, 23, 59, 59, 999));
  return {
    frequency: 'monthly',
    label: getPeriodLabel('monthly', start),
    startDate: start,
    endDate: end,
  };
}

export function getPeriodLabel(frequency: Frequency, date: Date): string {
  if (frequency === 'weekly') {
    const week = getISOWeek(date);
    const year = getISOWeekYear(date);
    return `${year}-W${String(week).padStart(2, '0')}`;
  }
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getISOWeekYear(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return d.getUTCFullYear();
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
