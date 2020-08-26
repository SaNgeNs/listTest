import ApolloClient from 'apollo-client/ApolloClient';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import Config from 'Config';

export const apolloClient = (ssr, fetch) => {
  const params = {
    credentials: 'include',
    ssrMode: Boolean(ssr),
    link: createHttpLink({
      uri: Config.graphql,
      credentials: 'same-origin',
      fetch,
    }),
    cache: ssr ? new InMemoryCache() : new InMemoryCache().restore(window.__APOLLO_STATE__),
  };

  return new ApolloClient(params);
};

export default apolloClient;
