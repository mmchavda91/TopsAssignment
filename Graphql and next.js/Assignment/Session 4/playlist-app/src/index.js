// ============================================================
// index.js - React Entry Point
// ApolloProvider vade poora app ne GraphQL client provide karie chhe
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./apolloClient";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // ApolloProvider wrapper - allows any component to use useQuery/useMutation
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
