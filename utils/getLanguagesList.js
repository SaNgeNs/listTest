import { sprintf } from 'sprintf-js';

const transifexUrl = '';

export const LANGUAGES = [
  {
    tmCode: 'en',
    transifexCode: 'en',
    resourcePath: sprintf(transifexUrl, 192),
  },
];

export const getLanguagesList = (locale) => {
  if (locale) {
    const currentLocale = LANGUAGES.find(item => item.transifexCode === locale);

    if (currentLocale) {
      return [ currentLocale ];
    }

    return [];
  }

  return LANGUAGES;
};

export default getLanguagesList;
