# Session 8 Assignment: Next.js Data Fetching Strategies

**Student:** Mamta Chavda  
**Topic:** SSG (`getStaticProps`), SSR (`getServerSideProps`), Dynamic SSG (`getStaticPaths`), and GraphQL in Next.js

---

## 1. Question 1: Trending Movies (`/pages/trending-movies.js`)
- **Strategy:** Static Site Generation (SSG) with `getStaticProps`.
- Fetches trending movie data (titles, ratings, genres, posters) at **build time**.
- Renders HTML once on the server and caches it across global CDNs for blazing-fast page loads.

---

## 2. Question 2: My Food Orders (`/pages/my-orders.js`)
- **Strategy:** Server-Side Rendering (SSR) with `getServerSideProps`.
- Simulates real-time food orders (Zomato / Swiggy).
- Data is fetched from the server on **every single incoming request**, ensuring real-time order tracking and personalized customer information.

---

## 3. Question 3: Flipkart Products (`/pages/products/[id].js`)
- **Strategy:** `getStaticPaths` + `getStaticProps`.
- Pre-generates exact paths for **5 fake Flipkart products** (IDs: `1`, `2`, `3`, `4`, `5`) using a local hardcoded array.
- Setting `fallback: false` ensures non-existent product IDs automatically return a 404 error page.

---

## 4. Question 4: Latest Music Albums (`/pages/latest-albums.js`)
- **Strategy:** GraphQL query inside `getStaticProps`.
- Executes a GraphQL query to fetch the 5 latest Spotify albums (album name, artist, release date, track count) at build time.

---

## 5. Question 5: SSR vs SSG Diagram & Explanation (`/pages/rendering-comparison.js`)
- **Infographic Diagram:** Saved as `public/ssr_vs_ssg_diagram.jpg` and displayed dynamically in the UI.
- **2-3 Line Summary:**
  > In Next.js, **SSG (`getStaticProps`)** pre-builds the entire HTML page with data at build time, allowing CDNs to serve it instantly in ~20ms, which is ideal for public blogs, trending movies, and catalogs. In contrast, **SSR (`getServerSideProps`)** computes and fetches data on the server for every single user request, making it essential for dynamic, private, or real-time pages like live food orders, carts, and user feeds.
