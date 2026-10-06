// ============================================================
// SESSION 4 - All GraphQL Queries & Mutations
// ============================================================
// gql tag vade GraphQL queries ane mutations define karie chhe
// ============================================================

import { gql } from "@apollo/client";

// -------------------------------------------------------
// QUERY: All songs fetch karva
// -------------------------------------------------------
export const GET_SONGS = gql`
  query GetSongs {
    getSongs {
      id
      title
      artist
    }
  }
`;

// -------------------------------------------------------
// Q1: addSong Mutation
// Title ane artist input leta, new song add kare chhe
// -------------------------------------------------------
export const ADD_SONG = gql`
  mutation AddSong($title: String!, $artist: String!) {
    addSong(title: $title, artist: $artist) {
      id
      title
      artist
    }
  }
`;

// -------------------------------------------------------
// Q2: updateSong Mutation
// ID vade song find kari, title update kare chhe
// -------------------------------------------------------
export const UPDATE_SONG = gql`
  mutation UpdateSong($id: ID!, $title: String!) {
    updateSong(id: $id, title: $title) {
      id
      title
      artist
    }
  }
`;

// -------------------------------------------------------
// Q3: deleteSong Mutation
// ID vade song delete kare chhe
// -------------------------------------------------------
export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
      title
      artist
    }
  }
`;
