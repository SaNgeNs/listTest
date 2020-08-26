import getLocaleFromUrl from '../getLocalesFromUrl';

test('getLocalesFromUrl: ', () => {
  expect(getLocaleFromUrl('https://test.com/ru/')).toBe('ru');
  expect(getLocaleFromUrl('https://test.com/')).toBe('en');
});
