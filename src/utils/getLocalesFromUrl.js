import localeRegexp from 'Utils/localeRegexp';

export const getLocaleFromUrl = (location) => {
  const localeReg = new RegExp(`/(${localeRegexp})/`, 'i');

  return (location.match(localeReg) && location.match(localeReg)[0].replace(/\//g, '')) || 'en';
};

export default getLocaleFromUrl;
