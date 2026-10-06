// ==============================================================
// SESSION 5 - Q2: GraphQL Query — playlist by ID
// ==============================================================
// Aa file ma Q2 nu example query lakhyun chhe.
// Server chalu hoy to GraphiQL playground ma paste karo
// URL: http://localhost:4000/graphql
// ==============================================================


// --------------------------------------------------------------
// Q2: Playlist ID vade fetch karo + tena badha songs
// --------------------------------------------------------------

/*

QUERY 1 — ID "1" playlist fetch karo (id, name, songs with title+artist)
──────────────────────────────────────────────────────────────────────────

query GetPlaylistWithSongs {
  playlist(id: "1") {
    id
    name
    songs {
      title
      artist
    }
  }
}

EXPECTED OUTPUT:
{
  "data": {
    "playlist": {
      "id": "1",
      "name": "Chill Vibes",
      "songs": [
        { "title": "Blinding Lights", "artist": "The Weeknd" },
        { "title": "Levitating",      "artist": "Dua Lipa"   },
        { "title": "Stay",            "artist": "Kid LAROI"  }
      ]
    }
  }
}


──────────────────────────────────────────────────────────────────────────
QUERY 2 — Badhi songs ni sathe song ID pan fetch karo
──────────────────────────────────────────────────────────────────────────

query GetPlaylistWithSongIds {
  playlist(id: "2") {
    id
    name
    songs {
      id
      title
      artist
    }
  }
}

EXPECTED OUTPUT:
{
  "data": {
    "playlist": {
      "id": "2",
      "name": "Workout Mix",
      "songs": [
        { "id": "s4", "title": "Eye of the Tiger", "artist": "Survivor"   },
        { "id": "s5", "title": "Stronger",          "artist": "Kanye West" }
      ]
    }
  }
}


──────────────────────────────────────────────────────────────────────────
QUERY 3 — Wrong ID pass karvu (error case)
──────────────────────────────────────────────────────────────────────────

query GetWrongPlaylist {
  playlist(id: "999") {
    id
    name
    songs {
      title
      artist
    }
  }
}

EXPECTED OUTPUT:
{
  "errors": [
    { "message": "Playlist with id \"999\" not found" }
  ]
}

*/

// ==============================================================
// How it works — Explanation
// ==============================================================
//
// Schema ma:
//   playlist(id: ID!): Playlist
//     ↑
//     Argument "id" mandatory chhe (!)
//     Return type "Playlist" chhe
//
// Playlist type:
//   {
//     id: ID!
//     name: String!
//     songs: [Song]   ← nested array of Song objects
//   }
//
// Song type:
//   {
//     id: ID!
//     title: String!  ← Q2 ma aa 2 fields request karay chhe
//     artist: String! ←
//   }
//
// Resolver (server.js):
//   playlist: ({ id }) => playlists.find(p => p.id === id)
//
// GraphQL automatically:
//   - "id" argument resolver ne pass kare chhe
//   - Returned Playlist object mathi songs array extract kare chhe
//   - Drek Song mathi sirf requested fields (title, artist) mokalse
//
// ==============================================================
