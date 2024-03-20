import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { headers } from 'next/headers';
// const { headers } = require('next/headers');

let client: ApolloClient<NormalizedCacheObject>;
let oldCookie: string = '';

export function apolloServerClient() {
  const headersInstance = headers();
  const cookie = headersInstance.get('cookie') || '';
  if (!client || cookie !== oldCookie) {
    oldCookie = cookie;
    const httpLink = new HttpLink({
      uri: '',
      headers: {
        cookie,
      },
    });

    client = new ApolloClient({
      //   connectToDevTools: isBrowser,
      //   ssrMode: !isBrowser,
      link: httpLink,
      credentials: 'include',
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
        watchQuery: {
          fetchPolicy: 'network-only',
        },
      },
    });
  }
  return client;
}
