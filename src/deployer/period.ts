import type { Frequency } from '../types.js';

export function getPeriodFilePath(frequency: Frequency, label: string): string {
  return `${frequency}/${label}.json`;
}
