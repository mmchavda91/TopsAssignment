# Session 7 Assignment: Next.js Routing & Static Path Generation

**Student:** Mamta Chavda  
**Framework:** Next.js (Pages Router)

---

## Question 1: Basic File-Based Routing
Created three pages inside `/pages`:
1. `/pages/home.js` $\rightarrow$ Displays heading: `🏠 Welcome to Home Page!`
2. `/pages/explore.js` $\rightarrow$ Displays heading: `🚀 Explore New Destinations & Features!`
3. `/pages/contact.js` $\rightarrow$ Displays heading: `📞 Get in Touch With Us!`

---

## Question 2: Dynamic Route (`/pages/playlists/[playlistId].js`)
- Uses `useRouter` from `next/router` to read `playlistId` from the URL parameter.
- Simulates a Spotify playlist view with songs, album art, play/save controls, and metadata.

---

## Question 3: Navigation with `next/link`
- Created a top navigation bar component (`/components/Navbar.js`) using:
  ```javascript
  import Link from "next/link";
  ```
- Placed on all pages (`home.js`, `explore.js`, `contact.js`) providing smooth, client-side transitions.

---

## Question 4: Static Path Generation (`getStaticPaths` & `getStaticProps`)
In `/pages/playlists/[playlistId].js`, pre-rendered exactly three playlist pages (101, 202, 303) at build time:

```javascript
export async function getStaticPaths() {
  const paths = [
    { params: { playlistId: "101" } },
    { params: { playlistId: "202" } },
    { params: { playlistId: "303" } },
  ];

  return {
    paths,
    fallback: false, // Non-specified IDs return 404
  };
}

export async function getStaticProps({ params }) {
  const { playlistId } = params;
  const playlist = playlistsData[playlistId] || null;

  return {
    props: {
      playlist,
      playlistId,
    },
  };
}
```

---

## Question 5: Flipkart Product Detail Page (`/pages/products/[productId].js`)
Created a dynamic route for Flipkart products displaying:
- Dynamic `productId` extracted via `useRouter()`.
- **Custom Message Banner:**
  > *"Special Offer Applied! You are currently viewing product ID: [productId] on Flipkart!"*
- Flipkart-style UI with Flipkart Assured badge, pricing, ratings, specifications, Add to Cart, and Buy Now buttons.
