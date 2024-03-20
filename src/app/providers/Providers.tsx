'use client';
import React, { FC } from 'react';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { apolloClient } from '@/apollo-client';
import { UserFragmentFragment } from '@/gql/graphql';
import { UserProvider } from './UserProvider';
import { CartProvider } from './CartProvider';
import { GlobalStateProvider } from './GlobalState';

export type ProvidersProps = {
  children: React.ReactNode;
  initApolloData: NormalizedCacheObject;
  initUser: UserFragmentFragment | null | undefined;
};

const client = apolloClient();

export const Providers: FC<ProvidersProps> = ({
  initApolloData,
  children,
  initUser,
}) => {
  client.cache.restore(initApolloData);
  return (
    <ApolloProvider client={client}>
      <UserProvider initUser={initUser}>
        <GlobalStateProvider>
          <CartProvider>{children}</CartProvider>
        </GlobalStateProvider>
      </UserProvider>
    </ApolloProvider>
  );
};
