export interface Language {
  code: string;
  name: string;
  flag: string;
  native: string;
  latestNews: string;
  locale: string;
}

export const languages: Language[] = [
  {
    code: 'alb',
    name: 'Albanian',
    native: 'Shqip',
    flag: '🇦🇱',
    latestNews: 'Lajmet e Fundit',
    locale: 'sq_AL'
  },
  {
    code: 'ara',
    name: 'Arabic',
    native: 'العربية',
    flag: '🇦🇪',
    latestNews: 'آخر الأخبار',
    locale: 'ar_AE'
  },
  {
    code: 'bos',
    name: 'Bosnian',
    native: 'Bosanski',
    flag: '🇧🇦',
    latestNews: 'Najnovije Vijesti',
    locale: 'bs_BA'
  },
  {
    code: 'deu',
    name: 'German',
    native: 'Deutsch',
    flag: '🇩🇪',
    latestNews: 'Aktuelle Nachrichten',
    locale: 'de_DE'
  },
  {
    code: 'fra',
    name: 'French',
    native: 'Français',
    flag: '🇫🇷',
    latestNews: 'Dernières Actualités',
    locale: 'fr_FR'
  },
  {
    code: 'mkd',
    name: 'Macedonian',
    native: 'Македонски',
    flag: '🇲🇰',
    latestNews: 'Најнови Вести',
    locale: 'mk_MK'
  },
  {
    code: 'rus',
    name: 'Russian',
    native: 'Русский',
    flag: '🇷🇺',
    latestNews: 'Последние Новости',
    locale: 'ru_RU'
  }
].sort((a, b) => a.name.localeCompare(b.name));

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find((lang) => lang.code === code);
}
