// ============================================================
// Apollo Client Setup
// React app ne GraphQL server sathe connect kare chhe
// ============================================================

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Backend server URL
  cache: new InMemoryCache(),           // Cache for automatic UI updates
});

export default client;
