// ============================================================
// SESSION 4 - GraphQL Mutations - Playlist App BACKEND
// ============================================================
// Run: node server.js
// GraphQL Playground: http://localhost:4000/graphql
// ============================================================

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const app = express();
app.use(cors()); // Frontend (React) ne allow karva mate

// -------------------------------------------------------
// In-memory "Database" - server restart karata reset thase
// -------------------------------------------------------
let songs = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd" },
  { id: "2", title: "Shape of You", artist: "Ed Sheeran" },
  { id: "3", title: "Levitating", artist: "Dua Lipa" },
];

let nextId = 4; // Auto-increment ID counter

// -------------------------------------------------------
// GraphQL Schema (Type definitions)
// -------------------------------------------------------
const schema = buildSchema(`
  type Song {
    id: ID!
    title: String!
    artist: String!
  }

  type Query {
    getSongs: [Song]
    getSong(id: ID!): Song
  }

  type Mutation {
    addSong(title: String!, artist: String!): Song
    updateSong(id: ID!, title: String!): Song
    deleteSong(id: ID!): Song
  }
`);

// -------------------------------------------------------
// Resolvers (actual logic for each query/mutation)
// -------------------------------------------------------
const root = {
  // --- QUERY ---
  getSongs: () => songs,
  getSong: ({ id }) => songs.find((s) => s.id === id),

  // --- MUTATIONS ---

  // Q1: addSong
  addSong: ({ title, artist }) => {
    const newSong = { id: String(nextId++), title, artist };
    songs.push(newSong);
    console.log(`[addSong] Added: "${title}" by ${artist}`);
    return newSong;
  },

  // Q2: updateSong
  updateSong: ({ id, title }) => {
    const song = songs.find((s) => s.id === id);
    if (!song) throw new Error(`Song with ID ${id} not found`);
    song.title = title;
    console.log(`[updateSong] ID ${id} title updated to: "${title}"`);
    return song;
  },

  // Q3: deleteSong
  deleteSong: ({ id }) => {
    const index = songs.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Song with ID ${id} not found`);
    const [deleted] = songs.splice(index, 1);
    console.log(`[deleteSong] Deleted: "${deleted.title}" (ID: ${id})`);
    return deleted;
  },
};

// Mount GraphQL at /graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enables browser-based playground
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ GraphQL Server: http://localhost:${PORT}/graphql`);
});
