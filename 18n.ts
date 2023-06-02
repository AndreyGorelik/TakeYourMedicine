import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './src/locales/en.json';
import frTranslation from './src/locales/fr.json';
import ruTranslation from './src/locales/ru.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
};

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: (cb: (lang: string) => void) => cb('en'),
  // init: () => {},
  // cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
