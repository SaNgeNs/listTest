import wget from 'node-wget-promise';
import { LANGUAGES } from './getLanguagesList';

const baseDir = process.cwd();
const languagesPath = `${baseDir}/etc/languages`;

Promise.all(
  LANGUAGES.map(async (locale) => {
    const filePath = `${languagesPath}/${locale.transifexCode}.po`;

    try {
      await wget(locale.resourcePath, {
        output: filePath,
      });

      console.log(`File ${locale.resourcePath} is 200`);
    } catch (exception) {
      console.error(`File ${locale.resourcePath} is 404`);
    }
  }),
);
