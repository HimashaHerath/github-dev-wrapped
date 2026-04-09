import type { Language } from '../types.js';
import { locale as en, type Locale } from './locales/en.js';
import { locale as ja } from './locales/ja.js';
import { locale as zhCN } from './locales/zh-CN.js';
import { locale as zhTW } from './locales/zh-TW.js';
import { locale as ko } from './locales/ko.js';
import { locale as es } from './locales/es.js';
import { locale as fr } from './locales/fr.js';
import { locale as de } from './locales/de.js';
import { locale as pt } from './locales/pt.js';
import { locale as ru } from './locales/ru.js';

const LOCALES: Record<Language, Locale> = {
  en, ja, 'zh-CN': zhCN, 'zh-TW': zhTW, ko, es, fr, de, pt, ru,
};

export function t(language: Language, key: keyof Locale): string {
  return LOCALES[language]?.[key] ?? en[key];
}
