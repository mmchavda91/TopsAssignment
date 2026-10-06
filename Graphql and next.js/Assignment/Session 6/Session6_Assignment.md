# Session 6 Assignment: Introduction to Next.js

## Student Name: Mamta Chavda
**Project Name:** `insta-feed`

---

## 1. Project Creation & Setup (Task 1)
- **Node.js Status:** Installed (`v24.16.0`, npm `v11.13.0`).
- **Command executed:**
  ```bash
  npx create-next-app@latest insta-feed --js --no-tailwind --no-eslint --no-src-dir --no-app
  ```
- **Run command:**
  ```bash
  cd "Session 6"
  npm run dev
  ```
- Project is created with Pages Router directly inside `Session 6`.

---

## 2. Updated Homepage (`pages/index.js`) (Task 2)
Code has been updated to display **"Welcome to Insta Feed!"** and author name **Mamta Chavda**:

```javascript
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Insta Feed – Home</title>
        <meta name="description" content="Welcome to Insta Feed" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Insta Feed! 📸</h1>
        <p className={styles.description}>
          Made by <strong>Mamta Chavda</strong>
        </p>

        <div className={styles.grid}>
          <a href="/explore" className={styles.card}>
            <h2>Explore &rarr;</h2>
            <p>Discover trending reels and popular content.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
```

---

## 3. Explore Page (`pages/explore.js`) (Task 3)
Created `pages/explore.js` containing the heading **"Explore Trending Reels"** and an explanation of Server-Side Rendering (SSR):

```javascript
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Explore() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore Trending Reels – Insta Feed</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Explore Trending Reels 🎬</h1>
        <div className={styles.description} style={{ maxWidth: "700px", textAlign: "left", lineHeight: "1.8" }}>
          <h2>Why SSR Helps Social Media Apps Load Trending Content Faster:</h2>
          <p>
            In social media apps where reels and trends change rapidly, <strong>Server-Side Rendering (SSR)</strong> fetches 
            the latest trending data directly on the server on every request and pre-renders the complete HTML page before sending 
            it to the user's device.
          </p>
          <ul>
            <li><strong>Instant First Contentful Paint:</strong> Users see videos and headings immediately rather than an empty loading screen.</li>
            <li><strong>Always Fresh & Real-Time:</strong> Newest reels are populated on the server on each request.</li>
            <li><strong>Fast on Slow Devices/Networks:</strong> Client devices don't have to execute bulky JavaScript bundles to download and display primary content.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
```

---

## 4. Next.js vs Create React App (CRA) Folder Structure Comparison (Task 4)

Here are the 3 major differences in how routing and pages are handled:

| Feature / Aspect | Next.js (`insta-feed`) | Create React App (CRA) |
| :--- | :--- | :--- |
| **1. File-System Based Routing** | Next.js uses automatic file-based routing. Any file added inside `pages/` (e.g., `pages/explore.js`) automatically becomes a public URL route (`/explore`) with zero extra configuration. | CRA does **not** have built-in routing. You must manually install an external package like `react-router-dom` and declare route definitions inside code. |
| **2. Pages vs Components Structure** | Next.js provides a dedicated `pages/` directory representing views/routes, cleanly separating route pages from standard reusable UI components. | CRA keeps all source files together under `src/`. There is no default `pages` directory or convention enforced by the framework. |
| **3. Special Framework Files & APIs** | Next.js includes special files like `_app.js` (global layout/styles), `_document.js` (custom HTML structure), and `pages/api/` (serverless API endpoints). | CRA only provides a single static `public/index.html` and entry `src/App.js` or `src/index.js`, without built-in API routing or document-level controls. |

---

## 5. How SSR Improves SEO for Food Delivery Apps (e.g., Zomato) (Task 5)

> **Explanation:**
> In Client-Side Rendering (CSR), the server returns an almost blank HTML file (`<div id="root"></div>`), forcing search engine crawlers (like Googlebot) to execute JavaScript before seeing any restaurants or menus. If crawlers do not wait or timeout, the page fails to be indexed properly.
> 
> With **Server-Side Rendering (SSR)** in Next.js, the server renders the full HTML markup including restaurant names, locations, cuisines, and dish ratings directly before responding. Because the complete content is present in the initial response, search engines can immediately read and index all food items and restaurant pages, boosting search rankings and drastically lowering page load times for hungry users.
