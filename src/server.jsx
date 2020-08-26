import React from 'react';
import { ApolloServer } from 'apollo-server-express';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { CookiesProvider } from 'react-cookie';
import cookiesMiddleware from 'universal-cookie-express';
import compression from 'compression';
import { ApolloProvider } from '@apollo/react-common';
import Helmet from 'react-helmet/lib/Helmet';
import { renderToStringWithData } from "@apollo/react-ssr";
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import fetch from 'node-fetch';
import { I18nextProvider } from "react-i18next";
import { apolloClient } from 'ApolloClient';
import App from 'Components/App';
import i18next from 'Utils/i18next';
import ServerConfig from 'ServerConfig';
import localeRegexp from 'Utils/localeRegexp';
import Template from 'Src/template/index.pug';
import typeDefs from './serverData/typeDef';
import resolvers from './serverData/resolvers';

const serverPort = process.env.PORT || ServerConfig.PORT;
const path = require('path');
const statsFile = path.join(process.cwd(), 'build/spa/loadable-stats.json');

const minify = require('express-minify');
const uglifyEs = require('uglify-es');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

// app.get('*.svg', (req, res, next) => {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'image/svg+xml svg svgz');
//   next();
// });

// app.get('*.css', (req, res, next) => {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css; charset=UTF-8');
//   next();
// });

app.use(compression());
app.use(minify({
  cache: false,
  uglifyJsModule: uglifyEs,
  errorHandler: null,
  jsMatch: /js/,
  cssMatch: /styles/,
}));
app.use(express.static('build/spa'));
app.use(cookiesMiddleware());

app.get(`/:locale(${localeRegexp})?*`, (req, res) => {
  const extractor = new ChunkExtractor({
    statsFile,
  });

  const client = apolloClient(true, fetch);

  const context = {};

  const AppContent = (
    <ChunkExtractorManager extractor={extractor}>
      <CookiesProvider cookies={req.universalCookies}>
        <ApolloProvider client={client}>
          <I18nextProvider i18n={i18next(req.url)}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </I18nextProvider>
        </ApolloProvider>
      </CookiesProvider>
    </ChunkExtractorManager>
  );

  const HTML = (content) => {
    const initialState = client.extract();
    const scriptTags = extractor.getScriptTags();
    const stylesTags = extractor.getStyleTags();
    const helmet = Helmet.renderStatic();

    return Template({
      helmetTitle: helmet.title ? helmet.title.toString() : '',
      helmetMeta: helmet.meta ? helmet.meta.toString() : '',
      helmetLinks: helmet.link ? helmet.link.toString() : '',
      application: content,
      locale: 'en',
      state: initialState,
      styles: stylesTags,
      scripts: scriptTags,
    });
  };

  renderToStringWithData(AppContent).then((content) => {
    res.status(200);
    res.send(HTML(content));
  }).catch(() => {
    res.status(400);
    res.send(HTML('<script>window.__renderError__=true</script>'));
  });
});

app.listen(serverPort, () => {
  console.log(`🚀  Client server on port ${serverPort}`);
});
