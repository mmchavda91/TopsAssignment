import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Insta Feed – Home</title>
        <meta name="description" content="Welcome to Insta Feed – your personal social media experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Insta Feed! 📸</h1>

        <p className={styles.description}>
          Made by <strong style={{ color: "#38bdf8" }}>Mamta Chavda</strong>
        </p>

        <div className={styles.grid}>
          <Link href="/explore" className={styles.card}>
            <h2>Explore Trending &rarr;</h2>
            <p>Discover trending reels and learn why SSR makes feeds fast.</p>
          </Link>

          <div className={styles.card}>
            <h2>My Feed &rarr;</h2>
            <p>See posts from creators and friends updated in real-time.</p>
          </div>

          <div className={styles.card}>
            <h2>Stories &rarr;</h2>
            <p>Watch 24-hour video stories shared by your network.</p>
          </div>

          <div className={styles.card}>
            <h2>Profile &rarr;</h2>
            <p>Manage your account, photos, reels, and saved collections.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Insta Feed &copy; 2025 | Built with Next.js by Mamta Chavda</p>
      </footer>
    </div>
  );
}
