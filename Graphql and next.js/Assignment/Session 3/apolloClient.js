import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_URL ||
      process.env.REACT_APP_GRAPHQL_URL ||
      "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
