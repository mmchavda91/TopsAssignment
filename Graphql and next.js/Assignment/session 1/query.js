// ============================================================
// SESSION 1 - GraphQL Assignment Queries
// ============================================================

// ----------------------------------------------------------
// Q1: Fetch name and image of 3 Pokémon
// URL: https://pokeapi.graphql.dev/
// ----------------------------------------------------------
const query1 = `
query FetchThreePokemons {
  pokemons(first: 3) {
    results {
      name
      image
    }
  }
}
`;

// ----------------------------------------------------------
// Q2: Fetch name, types, and max HP of Pikachu
// ----------------------------------------------------------
const query2 = `
query GetPikachuDetails {
  pokemon(name: "pikachu") {
    name
    types {
      type {
        name
      }
    }
    stats {
      base_stat
      stat {
        name
      }
    }
  }
}
`;

// ----------------------------------------------------------
// Q4: Fetch title and poster of movie "Inception"
// Schema: type Movie { title, rating, poster }
//         type Query { movie(title: String): Movie }
// ----------------------------------------------------------
const query4 = `
query GetInceptionMovie {
  movie(title: "Inception") {
    title
    poster
  }
}
`;

// ----------------------------------------------------------
// Q5: Mutation – Add a new Playlist to a music app (Spotify)
// ----------------------------------------------------------
const mutation5 = `
mutation AddNewPlaylist {
  createPlaylist(input: {
    name: "Chill Vibes",
    description: "Relaxing songs for evening",
    isPublic: true,
    userId: "user_42"
  }) {
    id
    name
    description
    isPublic
    createdAt
  }
}
`;