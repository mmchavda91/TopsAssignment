# Session 1 – GraphQL Assignment Answers

---

## Question 1: Fetch Name & Image of 3 Pokémon using GraphiQL Playground

**URL:** https://pokeapi.graphql.dev/

### GraphQL Query Used:
```graphql
query FetchThreePokemons {
  pokemons(first: 3) {
    results {
      name
      image
    }
  }
}
```

### Steps Performed:
1. Opened https://pokeapi.graphql.dev/ in the browser
2. Pasted the above query in the left editor panel
3. Clicked the ▶ (Run/Play) button to execute
4. Received the following JSON result on the right panel:

### Result (JSON Response):
```json
{
  "data": {
    "pokemons": {
      "results": [
        {
          "name": "bulbasaur",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        },
        {
          "name": "ivysaur",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
        },
        {
          "name": "venusaur",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
        }
      ]
    }
  }
}
```

**Pokémon Fetched:**
| # | Name      | Image URL |
|---|-----------|-----------|
| 1 | bulbasaur | .../sprites/pokemon/1.png |
| 2 | ivysaur   | .../sprites/pokemon/2.png |
| 3 | venusaur  | .../sprites/pokemon/3.png |

---

## Question 2: Fetch Name, Types & Maximum HP of Pikachu

**Hint used:** `pokemon(name: "pikachu")` field

### GraphQL Query:
```graphql
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
```

### Result (JSON Response):
```json
{
  "data": {
    "pokemon": {
      "name": "pikachu",
      "types": [
        {
          "type": {
            "name": "electric"
          }
        }
      ],
      "stats": [
        { "base_stat": 35, "stat": { "name": "hp" } },
        { "base_stat": 55, "stat": { "name": "attack" } },
        { "base_stat": 40, "stat": { "name": "defense" } },
        { "base_stat": 50, "stat": { "name": "special-attack" } },
        { "base_stat": 50, "stat": { "name": "special-defense" } },
        { "base_stat": 90, "stat": { "name": "speed" } }
      ]
    }
  }
}
```

### Answer Summary:
| Field       | Value      |
|-------------|------------|
| **Name**    | pikachu    |
| **Type**    | electric   |
| **Max HP**  | 35 (base_stat) |

> **Note:** In the Pokémon API, `base_stat` for `hp` represents the base HP value. Pikachu's base HP is **35**.

---

## Question 3: GraphQL vs REST – 3 Key Differences

### How GraphQL Helps Apps like Zomato or Flipkart Fetch Only What They Need:

| # | Feature | GraphQL | REST API |
|---|---------|---------|----------|
| 1 | **No Over-fetching** | Client requests only specific fields (e.g., `name` and `price`). Only those fields are returned. | Server returns the entire object with all fields — even unused ones like `created_at`, `internal_id`, `warehouse_location`, etc. |
| 2 | **No Under-fetching (Single Request)** | A single GraphQL query can fetch data from multiple resources at once (e.g., restaurant info + menu + reviews in one call). | Multiple REST endpoints must be called separately: `/restaurant/1`, `/restaurant/1/menu`, `/restaurant/1/reviews` — increasing load time. |
| 3 | **Client-Controlled Queries** | The frontend decides what shape and structure of data it wants. Different screens can request different fields. | The server defines the response structure. All clients get the same fixed response regardless of actual needs, wasting bandwidth. |

### Real-World Example (Zomato):

**REST Approach:**
```
GET /restaurants/101
Returns: id, name, address, phone, email, owner_id, created_at, updated_at,
         rating, delivery_time, menu[], reviews[], images[], ...
(50+ fields even if app only needs name, rating, delivery_time)
```

**GraphQL Approach:**
```graphql
query {
  restaurant(id: 101) {
    name
    rating
    delivery_time
  }
}
(Returns exactly 3 fields — nothing more, nothing less)
```

---

## Question 4: GraphQL Query for Movie Schema

### Given Schema:
```graphql
type Movie {
  title: String
  rating: Float
  poster: String
}

type Query {
  movie(title: String): Movie
}
```

### Query to Fetch Title and Poster of "Inception":
```graphql
query GetInceptionMovie {
  movie(title: "Inception") {
    title
    poster
  }
}
```

### Expected Result:
```json
{
  "data": {
    "movie": {
      "title": "Inception",
      "poster": "https://example.com/posters/inception.jpg"
    }
  }
}
```

### Explanation:
| Part | Meaning |
|------|---------|
| `query GetInceptionMovie` | Named query (optional but good practice) |
| `movie(title: "Inception")` | Calls the `movie` field with argument `title = "Inception"` |
| `{ title poster }` | Requests only 2 fields — `rating` is NOT fetched (GraphQL advantage!) |

---

## Question 5: GraphQL Mutation – Add New Playlist (like Spotify)

*(Generated using ChatGPT and explained below)*

### GraphQL Mutation:
```graphql
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
```

### Explanation (Each Part):

| Part | Explanation |
|------|-------------|
| `mutation` | Declares this as a **write operation** (unlike `query` which only reads data) |
| `AddNewPlaylist` | **Operation name** — optional label for identifying this mutation |
| `createPlaylist(...)` | The **mutation field** on the server that handles playlist creation |
| `input: { ... }` | **Input argument** — object containing all data needed to create the playlist |
| `name: "Chill Vibes"` | The **name** of the new playlist being created |
| `description: "..."` | A short **description** of what the playlist is about |
| `isPublic: true` | **Visibility setting** — true means anyone can see/follow this playlist |
| `userId: "user_42"` | **Owner ID** — identifies which user is creating this playlist |
| `{ id name description isPublic createdAt }` | **Selection set** — fields returned after playlist is created (confirmation data) |

### What Happens:
1. The mutation sends new playlist data to the server
2. Server saves the playlist in the database
3. Server returns the saved playlist's details as confirmation
4. The app can immediately show the newly created playlist to the user

---

## Summary Table

| Q# | Topic | Key Takeaway |
|----|-------|--------------|
| 1 | GraphiQL Playground | Used `pokemons(first: 3)` to fetch name + image of 3 Pokémon |
| 2 | Single Pokémon Query | Used `pokemon(name: "pikachu")` to get types and HP stat |
| 3 | GraphQL vs REST | GraphQL avoids over-fetching, under-fetching, and gives client control |
| 4 | Schema-based Query | Used `movie(title: "Inception")` to fetch only title and poster |
| 5 | Mutation | `createPlaylist` mutation adds a new playlist with input fields |
