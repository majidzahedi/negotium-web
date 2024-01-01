import {
  Client,
  cacheExchange,
  fetchExchange,
  Provider,
  subscriptionExchange,
} from 'urql';

import { ReactNode } from 'react';
import { useToken } from '@/hooks/use-token';

import { createClient as createWsClient, SubscribePayload } from 'graphql-ws';

export const UrqlProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useToken();

  const wsClient = createWsClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: () => {
      return {
        headers: {
          authorization: token ? `Bearer ${token.accessToken}` : '',
        },
      };
    },
  });

  const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(operation) {
          return {
            subscribe: (sink) => {
              const dispose = wsClient.subscribe(
                operation as SubscribePayload,
                sink,
              );
              return {
                unsubscribe: dispose,
              };
            },
          };
        },
      }),
    ],
    fetchOptions: () => ({
      headers: {
        authorization: token ? `Bearer ${token.accessToken}` : '',
      },
    }),
  });

  return <Provider value={client}>{children}</Provider>;
};
