import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import type { PeriodData } from '../types.js';

export function readPeriodData(dataDir: string, filePath: string): PeriodData | null {
  const fullPath = join(dataDir, filePath);
  if (!existsSync(fullPath)) return null;
  return JSON.parse(readFileSync(fullPath, 'utf8')) as PeriodData;
}

export function writePeriodData(dataDir: string, filePath: string, data: PeriodData): void {
  const fullPath = join(dataDir, filePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

export function readAllPeriods(dataDir: string, frequency: string): PeriodData[] {
  const dir = join(dataDir, frequency);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f: string) => f.endsWith('.json'))
    .sort()
    .map((f: string) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as PeriodData);
}
