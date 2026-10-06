// ==============================================================
// SESSION 5 - Q2: Server with playlist(id) Query
// ==============================================================
// Schema ma define karyelu playlist(id: ID!): Playlist query
// aa file ma actual resolver implement kario chhe.
//
// Run: node server.js
// Playground: http://localhost:4000/graphql
// ==============================================================

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const app = express();
app.use(cors());

// --------------------------------------------------------------
// Schema — schema.graphql ma thi copy (buildSchema vade load)
// --------------------------------------------------------------
const schema = buildSchema(`
  type Song {
    id: ID!
    title: String!
    artist: String!
  }

  type Playlist {
    id: ID!
    name: String!
    songs: [Song]
  }

  type Query {
    playlists: [Playlist]

    # Q2: ID vade playlist fetch karo — teni badhi songs sathe
    playlist(id: ID!): Playlist

    songs: [Song]
    song(id: ID!): Song
  }

  type Mutation {
    createPlaylist(name: String!): Playlist
    addSongToPlaylist(playlistId: ID!, title: String!, artist: String!): Playlist
    removeSongFromPlaylist(playlistId: ID!, songId: ID!): Playlist
    deletePlaylist(id: ID!): Playlist
  }
`);

// --------------------------------------------------------------
// In-memory Database
// Real app ma MongoDB/PostgreSQL vaparay
// --------------------------------------------------------------
let playlists = [
  {
    id: "1",
    name: "Chill Vibes",
    songs: [
      { id: "s1", title: "Blinding Lights", artist: "The Weeknd" },
      { id: "s2", title: "Levitating",      artist: "Dua Lipa" },
      { id: "s3", title: "Stay",            artist: "Kid LAROI" },
    ],
  },
  {
    id: "2",
    name: "Workout Mix",
    songs: [
      { id: "s4", title: "Eye of the Tiger", artist: "Survivor" },
      { id: "s5", title: "Stronger",         artist: "Kanye West" },
    ],
  },
  {
    id: "3",
    name: "Bollywood Hits",
    songs: [
      { id: "s6", title: "Kesariya",  artist: "Arijit Singh" },
      { id: "s7", title: "Tum Hi Ho", artist: "Arijit Singh" },
    ],
  },
];

let songIdCounter = 8;
let playlistIdCounter = 4;

// --------------------------------------------------------------
// Resolvers
// --------------------------------------------------------------
const root = {

  // ★ Q2: playlist(id) resolver
  // id argument leto ane matching playlist return kare chhe
  // Aa playlist ni andar songs array chhe — drek song ma title + artist chhe
  playlist: ({ id }) => {
    const found = playlists.find((p) => p.id === id);
    if (!found) throw new Error(`Playlist with id "${id}" not found`);
    return found;
  },

  // Badhi playlists (list)
  playlists: () => playlists,

  // Badha songs (flat list)
  songs: () => playlists.flatMap((p) => p.songs),

  // ID vade single song
  song: ({ id }) => {
    for (const p of playlists) {
      const s = p.songs.find((s) => s.id === id);
      if (s) return s;
    }
    throw new Error(`Song with id "${id}" not found`);
  },

  // --- Mutations ---
  createPlaylist: ({ name }) => {
    const newPlaylist = { id: String(playlistIdCounter++), name, songs: [] };
    playlists.push(newPlaylist);
    return newPlaylist;
  },

  addSongToPlaylist: ({ playlistId, title, artist }) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) throw new Error(`Playlist "${playlistId}" not found`);
    const newSong = { id: `s${songIdCounter++}`, title, artist };
    playlist.songs.push(newSong);
    return playlist;
  },

  removeSongFromPlaylist: ({ playlistId, songId }) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) throw new Error(`Playlist "${playlistId}" not found`);
    playlist.songs = playlist.songs.filter((s) => s.id !== songId);
    return playlist;
  },

  deletePlaylist: ({ id }) => {
    const index = playlists.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Playlist "${id}" not found`);
    const [deleted] = playlists.splice(index, 1);
    return deleted;
  },
};

// --------------------------------------------------------------
// Start Server
// --------------------------------------------------------------
app.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: root, graphiql: true })
);

const PORT = 4001; // Session 4 port 4000 par chhe, aa 4001 par chalse
app.listen(PORT, () => {
  console.log(`✅ Session 5 Server: http://localhost:${PORT}/graphql`);
  console.log(`📋 GraphiQL Playground: http://localhost:${PORT}/graphql`);
});
