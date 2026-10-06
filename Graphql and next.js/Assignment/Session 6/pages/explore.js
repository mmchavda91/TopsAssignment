import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Explore() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore Trending Reels – Insta Feed</title>
        <meta
          name="description"
          content="Explore trending reels and discover why SSR makes social media apps faster."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Explore Trending Reels 🎬</h1>

        <div className={styles.contentBox}>
          <h2>Why Server-Side Rendering (SSR) Helps Social Media Apps Load Trending Content Faster</h2>
          <p>
            In a fast-paced social media application like Insta Feed, trending reels and viral clips update every few minutes.
            With <strong>Server-Side Rendering (SSR)</strong> in Next.js, the server renders the full HTML page with the latest data
            before sending it to the user's browser:
          </p>

          <ul>
            <li>
              <strong>⚡ Instant First Contentful Paint:</strong> Users see actual reels and posts right away instead of an empty loading spinner.
            </li>
            <li>
              <strong>🔍 SEO & Social Previews:</strong> Search bots and social sharing crawlers get fully populated metadata and content on first hit.
            </li>
            <li>
              <strong>🔄 Always Up-To-Date:</strong> Every request fetches real-time trending metrics (views, likes, shares) directly on the server.
            </li>
            <li>
              <strong>📱 Optimized for Mobile Networks:</strong> Clients do not need to execute heavy JavaScript bundles to fetch and display trending data.
            </li>
          </ul>
        </div>

        <div>
          <Link href="/" className={styles.btnPrimary}>
            &larr; Back to Home
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Insta Feed &copy; 2025 | Built with Next.js by Mamta Chavda</p>
      </footer>
    </div>
  );
}
