import type { PeriodData, Frequency } from '../types.js';
import { getPeriod } from './date-range.js';
import { collectActivity } from './aggregate.js';
import { deriveSignals } from './signals.js';
import { computeDelta } from './delta.js';

export interface CollectorOptions {
  username: string;
  token: string;
  frequency: Frequency;
  timezone: string;
  dateStr?: string;
  previousPeriodData?: PeriodData | null;
}

export async function runCollector(opts: CollectorOptions): Promise<PeriodData> {
  const period = getPeriod(opts.frequency, opts.dateStr, opts.timezone);
  const activity = await collectActivity(opts.username, period, opts.token);
  const signals = deriveSignals(activity);
  const delta = opts.previousPeriodData
    ? computeDelta(signals, opts.previousPeriodData.signals)
    : null;

  return {
    period,
    signals,
    delta,
    llm: null,
    generatedAt: new Date().toISOString(),
  };
}
