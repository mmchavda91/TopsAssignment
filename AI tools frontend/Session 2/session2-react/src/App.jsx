import { useState } from "react";
import PlaylistCard from "./components/PlaylistCard";
import ProductCard from "./components/ProductCard";
import "./components/ProductCard.css";
import ZomatoRestaurantListing from "./components/ZomatoRestaurantListing";
import "./components/ZomatoRestaurantListing.css";
import YouTubeVideoList from "./components/YouTubeVideoList";
import "./components/YouTubeVideoList.css";
import OptimizedImageDemo from "./components/OptimizedImageDemo";
import "./App.css";

// Sample data for PlaylistCard (Q1)
const SAMPLE_PLAYLISTS = [
  { name: "Chill Vibes 🎧", creator: "SpotifyIndia", songCount: 52, coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { name: "Bollywood Hits", creator: "GaanaOfficial", songCount: 100, coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop" },
  { name: "Workout Beast 💪", creator: "FitBeats", songCount: 34, coverImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop" },
  { name: "Late Night Lofi", creator: "LofiGirl", songCount: 78, coverImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop" },
];

// Sample data for ProductCard (Q2)
const SAMPLE_PRODUCTS = [
  { id: 1, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", title: "Smartphone Pro Max 256GB — Midnight Black", brand: "TechVibe", price: 49999, originalPrice: 69999, discount: 28, rating: 4.5, ratingCount: "1,24,567", freeDelivery: true },
  { id: 2, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", title: "Wireless ANC Headphones — 40hr Battery", brand: "SoundWave", price: 2499, originalPrice: 5999, discount: 58, rating: 4.3, ratingCount: "45,891", freeDelivery: true },
  { id: 3, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", title: "Premium Casual Sneakers — Lightweight Mesh", brand: "UrbanStride", price: 1899, originalPrice: 3999, discount: 52, rating: 4.1, ratingCount: "12,340", freeDelivery: false },
  { id: 4, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", title: "SmartWatch Ultra — GPS, AMOLED Display", brand: "ChronoFit", price: 7999, originalPrice: 14999, discount: 46, rating: 4.4, ratingCount: "3,211", freeDelivery: true },
];

const TABS = [
  { id: "q1", label: "Q1 — PlaylistCard", emoji: "🎵" },
  { id: "q2", label: "Q2 — ProductCard", emoji: "🛒" },
  { id: "q3", label: "Q3 — Zomato", emoji: "🍽️" },
  { id: "q4", label: "Q4 — YouTube", emoji: "▶️" },
  { id: "q5", label: "Q5 — Review", emoji: "📝" },
  { id: "s4q3", label: "Session 4 Q3 — WebP Opt", emoji: "⚡" },
];

function App() {
  const [activeTab, setActiveTab] = useState("q1");

  return (
    <div className="app">
      {/* Navigation Tabs */}
      <nav className="tab-nav">
        <div className="tab-nav-inner">
          <span className="tab-brand">Session 2</span>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-emoji">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <main className="tab-content">
        {/* Q1: PlaylistCard */}
        {activeTab === "q1" && (
          <section className="section-q1">
            <div className="section-header">
              <h2>Q1 — PlaylistCard Component</h2>
              <p>A React functional component displaying a music playlist's name, creator, and song count.</p>
            </div>
            <div className="playlist-grid">
              {SAMPLE_PLAYLISTS.map((playlist, index) => (
                <PlaylistCard key={index} {...playlist} />
              ))}
            </div>
          </section>
        )}

        {/* Q2: Flipkart ProductCard */}
        {activeTab === "q2" && (
          <section className="section-q2">
            <div className="section-header">
              <h2>Q2 — Flipkart ProductCard</h2>
              <p>Product card with image, title, price. Error analysis documented in component comments.</p>
            </div>
            <div className="product-grid">
              {SAMPLE_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Q3: Zomato Restaurant Listing */}
        {activeTab === "q3" && (
          <section className="section-q3">
            <div className="section-header">
              <h2>Q3 — Zomato Restaurant Listing</h2>
              <p>Refactored with custom <code>useRestaurants</code> hook for data fetching.</p>
            </div>
            <ZomatoRestaurantListing />
          </section>
        )}

        {/* Q4: YouTube Video List */}
        {activeTab === "q4" && (
          <section className="section-q4">
            <div className="section-header section-header-dark">
              <h2>Q4 — YouTube Video List</h2>
              <p>Data fetching refactored into a separate <code>useVideos</code> hook.</p>
            </div>
            <YouTubeVideoList />
          </section>
        )}

        {/* Q5: Code Review */}
        {activeTab === "q5" && (
          <section className="section-q5">
            <div className="section-header">
              <h2>Q5 — Code Review & Improvements</h2>
              <p>2 improvements per component before production use</p>
            </div>
            <div className="review-grid">
              {/* PlaylistCard Review */}
              <div className="review-card">
                <h3>🎵 PlaylistCard</h3>
                <div className="review-item">
                  <span className="review-badge">Improvement 1</span>
                  <h4>Replace deprecated defaultProps</h4>
                  <p><code>React.defaultProps</code> is deprecated in React 18.3+. Use JavaScript default parameters in the function signature instead.</p>
                  <pre><code>{`// Before (AI generated)\nPlaylistCard.defaultProps = { coverImage: "" };\n\n// After (corrected)\nconst PlaylistCard = ({ coverImage = "" }) => { }`}</code></pre>
                </div>
                <div className="review-item">
                  <span className="review-badge fix">Improvement 2</span>
                  <h4>Add image error fallback</h4>
                  <p>If <code>coverImage</code> URL fails, the card looks broken. Add an <code>onError</code> handler to fallback gracefully.</p>
                </div>
              </div>

              {/* ProductCard Review */}
              <div className="review-card">
                <h3>🛒 ProductCard</h3>
                <div className="review-item">
                  <span className="review-badge">Improvement 1</span>
                  <h4>Add PropTypes validation</h4>
                  <p>Missing <code>PropTypes.shape()</code> for the product prop causes silent failures when wrong data types are passed.</p>
                </div>
                <div className="review-item">
                  <span className="review-badge fix">Improvement 2</span>
                  <h4>Guard against undefined pricing</h4>
                  <p><code>price.toLocaleString()</code> crashes if price is null. Use <code>(price ?? 0).toLocaleString()</code> instead.</p>
                </div>
              </div>

              {/* Zomato Review */}
              <div className="review-card">
                <h3>🍽️ ZomatoListing</h3>
                <div className="review-item">
                  <span className="review-badge">Improvement 1</span>
                  <h4>Add AbortController cleanup</h4>
                  <p>The <code>useRestaurants</code> hook doesn't cancel in-flight requests on unmount, causing potential memory leaks.</p>
                </div>
                <div className="review-item">
                  <span className="review-badge fix">Improvement 2</span>
                  <h4>Dynamic discount tags</h4>
                  <p>The "60% OFF" tag is hardcoded in every card — it should come from the restaurant data object.</p>
                </div>
              </div>

              {/* YouTube Review */}
              <div className="review-card">
                <h3>▶️ YouTubeVideoList</h3>
                <div className="review-item">
                  <span className="review-badge">Improvement 1</span>
                  <h4>Add search debouncing</h4>
                  <p>Search triggers re-fetch on every keystroke. Add 300ms debounce to reduce unnecessary API calls.</p>
                </div>
                <div className="review-item">
                  <span className="review-badge fix">Improvement 2</span>
                  <h4>Missing ARIA attributes</h4>
                  <p>Video cards lack <code>role="article"</code> and <code>aria-label</code> — screen readers can't navigate the list properly.</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Session 4 Q3: WebP Optimization Demo */}
        {activeTab === "s4q3" && (
          <OptimizedImageDemo />
        )}
      </main>
    </div>
  );
}

export default App;
