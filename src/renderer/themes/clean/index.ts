import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import { cleanStyles } from './styles.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMPL_DIR = join(__dirname, 'templates');

const PARTIALS = ['header', 'footer', 'overview', 'rhythm', 'repos', 'languages', 'narrative', 'arc'];

function registerPartials(): void {
  for (const name of PARTIALS) {
    const src = readFileSync(join(TMPL_DIR, 'partials', `${name}.hbs`), 'utf8');
    Handlebars.registerPartial(name, src);
  }
}

function loadTemplate(name: string): HandlebarsTemplateDelegate {
  const src = readFileSync(join(TMPL_DIR, name), 'utf8');
  return Handlebars.compile(src);
}

export function renderReport(data: object): string {
  registerPartials();
  return loadTemplate('report.hbs')({ ...data, styles: cleanStyles });
}

export function renderIndexPage(data: object): string {
  registerPartials();
  return loadTemplate('index-page.hbs')({ ...data, styles: cleanStyles });
}
