import React, { useState } from "react";
import "./OptimizedImageDemo.css";
import optimizedWebP from "../assets/zomato-hero-bg-optimized.webp";
import originalJpg from "../assets/zomato-hero-bg-original.jpg";

export default function OptimizedImageDemo() {
  const [selectedFormat, setSelectedFormat] = useState("webp");
  const [showPictureCode, setShowPictureCode] = useState(false);

  const metrics = {
    original: {
      format: "JPEG (Original)",
      size: "958.46 KB",
      bytes: 981460,
      resolution: "1920 × 1080",
      bandwidth: "High (~1.0 MB/user)",
      loadTime3G: "2.8s",
    },
    webp: {
      format: "WebP (Sharp Optimized)",
      size: "166.08 KB",
      bytes: 170068,
      resolution: "1600 × 900",
      bandwidth: "Ultra-low (82.7% savings)",
      loadTime3G: "0.48s",
    },
  };

  const savingsPct = (
    ((metrics.original.bytes - metrics.webp.bytes) / metrics.original.bytes) *
    100
  ).toFixed(1);

  return (
    <div className="opt-container">
      <div className="opt-header">
        <span className="opt-badge">Session 4 — Question 3</span>
        <h2>WebP Image Optimization & React Integration</h2>
        <p>
          Resized to under 200KB and converted to modern WebP using the{" "}
          <code>sharp</code> npm package, integrated via standard HTML5{" "}
          <code>&lt;picture&gt;</code> element with progressive fallback.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="opt-stats-grid">
        <div className="opt-stat-card orig">
          <span className="stat-label">Original Image</span>
          <span className="stat-val">958.5 KB</span>
          <span className="stat-sub">JPEG • 1920×1080</span>
        </div>
        <div className="opt-stat-arrow">➔</div>
        <div className="opt-stat-card opt">
          <span className="stat-label">Optimized WebP</span>
          <span className="stat-val">166.1 KB</span>
          <span className="stat-sub">Under 200KB Target Met! ✓</span>
        </div>
        <div className="opt-stat-card saving">
          <span className="stat-label">Total Data Saved</span>
          <span className="stat-val">{savingsPct}%</span>
          <span className="stat-sub">5.8× Faster Load on 3G</span>
        </div>
      </div>

      {/* Live Toggle Controls */}
      <div className="opt-controls">
        <div className="opt-btn-group">
          <button
            className={`opt-btn ${selectedFormat === "webp" ? "active" : ""}`}
            onClick={() => setSelectedFormat("webp")}
          >
            🚀 View Optimized WebP (166 KB)
          </button>
          <button
            className={`opt-btn ${selectedFormat === "original" ? "active" : ""}`}
            onClick={() => setSelectedFormat("original")}
          >
            🐢 View Original JPG (958 KB)
          </button>
          <button
            className={`opt-btn ${selectedFormat === "picture" ? "active" : ""}`}
            onClick={() => setSelectedFormat("picture")}
          >
            🛡️ Live &lt;picture&gt; Fallback Mode
          </button>
        </div>

        <button
          className="opt-code-toggle"
          onClick={() => setShowPictureCode(!showPictureCode)}
        >
          {showPictureCode ? "Hide Code Snippets" : "Show React & Sharp Code"}
        </button>
      </div>

      {/* Interactive Image Frame */}
      <div className="opt-preview-frame">
        <div className="opt-preview-bar">
          <span className="dot dot-r"></span>
          <span className="dot dot-y"></span>
          <span className="dot dot-g"></span>
          <span className="opt-preview-url">
            Active Format:{" "}
            <strong>
              {selectedFormat === "webp"
                ? "zomato-hero-bg-optimized.webp (166.08 KB)"
                : selectedFormat === "original"
                ? "zomato-hero-bg-original.jpg (958.46 KB)"
                : "<picture> Adaptive Tag (Serving WebP to modern browsers)"}
            </strong>
          </span>
          <span className="opt-pill">
            {selectedFormat === "webp"
              ? "⚡ 82.7% Smaller"
              : selectedFormat === "original"
              ? "⚠️ Unoptimized"
              : "⭐ Production Ready"}
          </span>
        </div>

        <div className="opt-image-wrapper">
          {selectedFormat === "picture" ? (
            <picture>
              <source srcSet={optimizedWebP} type="image/webp" />
              <source srcSet={originalJpg} type="image/jpeg" />
              <img
                src={originalJpg}
                alt="Zomato Hero Background with WebP fallback"
                className="opt-img"
              />
            </picture>
          ) : selectedFormat === "webp" ? (
            <img
              src={optimizedWebP}
              alt="Optimized WebP Food app hero"
              className="opt-img"
            />
          ) : (
            <img
              src={originalJpg}
              alt="Original JPG Food app hero"
              className="opt-img"
            />
          )}
        </div>
      </div>

      {/* Code Snippets Section */}
      {showPictureCode && (
        <div className="opt-code-section">
          <div className="code-block">
            <h4>1. Sharp Node.js Optimization Script (Session 4/optimize.js)</h4>
            <pre>
              <code>{`const sharp = require('sharp');

// Resize to width 1600 & encode to WebP under 200KB
sharp('images/zomato-hero-bg-original.jpg')
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 80, effort: 6 })
  .toFile('images/zomato-hero-bg-optimized.webp')
  .then(info => {
    console.log('Optimized File Size:', (info.size / 1024).toFixed(2), 'KB');
  });`}</code>
            </pre>
          </div>

          <div className="code-block">
            <h4>2. Production React Component Implementation</h4>
            <pre>
              <code>{`import optimizedWebp from './assets/zomato-hero-bg-optimized.webp';
import originalJpg from './assets/zomato-hero-bg-original.jpg';

export function HeroBanner() {
  return (
    <picture>
      {/* Modern browsers receive lightweight WebP */}
      <source srcSet={optimizedWebp} type="image/webp" />
      {/* Fallback for legacy browsers */}
      <source srcSet={originalJpg} type="image/jpeg" />
      <img
        src={originalJpg}
        alt="Zomato gourmet hero food"
        loading="lazy"
        width="1600"
        height="900"
      />
    </picture>
  );
}`}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
