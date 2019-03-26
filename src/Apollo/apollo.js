import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const server = 'https://radiant-woodland-33924.herokuapp.com/graphql/';
const server = 'http://127.0.0.1:8000/graphql/';

export const client = new ApolloClient({
  link: new HttpLink({ uri: server }),
  cache: new InMemoryCache()
})
