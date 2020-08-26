const path = require('path').resolve;
const baseDir = process.cwd();

const env = process.env.NODE_ENV;

module.exports = (api) => {
  api.cache(false);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      ['module-resolver',
        {
          root: ['/'],
          alias: {
            Config: path(baseDir, `config/client/${env}.js`),
            ServerConfig: path(baseDir, `config/server/${env}.js`),
            Src: path(baseDir, 'src/'),
            Hooks: path(baseDir, 'src/hooks'),
            Utils: path(baseDir, 'src/utils'),
            Images: path(baseDir, 'src/images'),
            Queries: path(baseDir, 'src/queries'),
            Components: path(baseDir, 'src/components/'),
            Pages: path(baseDir, 'src/pages/'),
            Routes: path(baseDir, 'src/routes/'),
            ApolloClient: path(baseDir, 'src/apolloClient/'),
            Mock: path(baseDir, '__mocks__/'),
          },
        }],
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-runtime',
      '@loadable/babel-plugin',
    ],
  };
};
