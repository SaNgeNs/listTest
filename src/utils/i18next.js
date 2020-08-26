import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import getLocalesFromUrl from 'Utils/getLocalesFromUrl';

export const i18next = (url) => {
  const locale = getLocalesFromUrl(url);
  let translation = {};

  try {
    translation = require(`../../etc/languages/${locale}.po`);
  } catch (error) {
    translation = require('../../etc/languages/en.po');
  }

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        [locale]: {
          translation: translation
        },
      },
      lng: locale,
      fallbackLng: locale,
      lowerCaseLng: true,
      nsSeparator: false,
      keySeparator: false,
      interpolation: {
        escapeValue: false
      },
    });

  return i18n;
};

export default i18next;
