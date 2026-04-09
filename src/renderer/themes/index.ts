import type { Theme } from '../../types.js';

export interface ThemeRenderer {
  renderReport(data: object): string;
  renderIndexPage(data: object): string;
}

export async function getTheme(theme: Theme): Promise<ThemeRenderer> {
  switch (theme) {
    case 'noir':  return import('./noir/index.js');
    case 'clean': return import('./clean/index.js');
    default:      throw new Error(`Unknown theme: ${theme}`);
  }
}
