import {
  GettextExtractor,
  JsExtractors,
} from 'gettext-extractor';
import appRoot from 'app-root-path';
import path from 'path';

const rootPath = appRoot.path;
const languagesPath = path.join(rootPath, 'etc', 'languages');
const srcPath = path.join(rootPath, 'src/**/*.@(js|jsx)');
const extractor = new GettextExtractor();

extractor
  .createJsParser([
    JsExtractors.callExpression(['t'], {
      arguments: {
        text: 0,
        context: 3,
      },
    }),
  ])
  .parseFilesGlob(srcPath);

extractor.savePotFile(path.join(languagesPath, 'messages.pot'), {
  Language: '',
});
extractor.printStats();
