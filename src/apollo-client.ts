import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

let client: ApolloClient<NormalizedCacheObject>;

export const apolloClient = () => {
  if (!client) {
    const host =
      typeof window === 'undefined' ? 'localhost:3000' : window.location.host;
    const wsProtocol = global?.location?.protocol === 'https:' ? 'wss:' : 'ws:';
    const httpLink = new HttpLink({
      uri: '/graphql',
    });
    const wsLink = new GraphQLWsLink(
      createClient({
        url: `${wsProtocol}//${host}/graphql`,
      }),
    );
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );

    client = new ApolloClient({
      link: splitLink,
      credentials: 'include',
      cache: new InMemoryCache(),
      // connectToDevTools: true,
      defaultOptions: {
        query: {
          fetchPolicy: 'cache-first',
        },
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    });
  }
  return client;
};
