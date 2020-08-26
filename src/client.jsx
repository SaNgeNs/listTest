import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import { ApolloProvider } from '@apollo/react-common';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { I18nextProvider } from "react-i18next";
import { apolloClient } from 'ApolloClient';
import App from 'Components/App';
import i18next from 'Utils/i18next';

const client = apolloClient(false);
const cookies = new Cookies();
const renderMethod = window.__renderError__ ? 'render' : 'hydrate';

loadableReady(() => ReactDOM[renderMethod](
  <CookiesProvider cookies={cookies}>
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18next(window.location.href)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
));
