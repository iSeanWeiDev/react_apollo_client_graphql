/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import App from './App';
import appConfig from './Config';
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({
  uri: appConfig.apollo.http
});

const wsLink = new WebSocketLink({
  uri: appConfig.apollo.ws,
  options: {
    reconnect: true,
    minTimeout: 10000
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache: new InMemoryCache(),
  resolvers: {}
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
