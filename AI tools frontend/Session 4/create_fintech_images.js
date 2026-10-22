const sharp = require('sharp');
const path = require('path');

const outputDir = path.join(__dirname, 'images');

// 1. Midjourney Aesthetic: Deep Obsidian, Iridescent Glass Card, Cyan/Gold Glow, Raytraced volumetric feel
const midjourneySvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0d1b2a"/>
      <stop offset="60%" stop-color="#050811"/>
      <stop offset="100%" stop-color="#020307"/>
    </radialGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(0, 240, 255, 0.45)"/>
      <stop offset="40%" stop-color="rgba(168, 85, 247, 0.3)"/>
      <stop offset="100%" stop-color="rgba(234, 179, 8, 0.4)"/>
    </linearGradient>
    <linearGradient id="goldBeam" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="40" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Dark Atmospheric Background -->
  <rect width="1280" height="720" fill="url(#bgGlow)"/>

  <!-- Raytraced Ambient Lights -->
  <circle cx="640" cy="320" r="260" fill="#38bdf8" opacity="0.12" filter="url(#softGlow)"/>
  <circle cx="850" cy="400" r="220" fill="#a855f7" opacity="0.15" filter="url(#softGlow)"/>
  <circle cx="450" cy="250" r="180" fill="#fbbf24" opacity="0.1" filter="url(#softGlow)"/>

  <!-- Futuristic Holographic Grid Lines -->
  <g stroke="rgba(56, 189, 248, 0.15)" stroke-width="1">
    <line x1="0" y1="520" x2="1280" y2="520"/>
    <line x1="0" y1="580" x2="1280" y2="580"/>
    <line x1="0" y1="640" x2="1280" y2="640"/>
    <line x1="200" y1="720" x2="480" y2="480"/>
    <line x1="400" y1="720" x2="560" y2="480"/>
    <line x1="640" y1="720" x2="640" y2="480"/>
    <line x1="880" y1="720" x2="720" y2="480"/>
    <line x1="1080" y1="720" x2="800" y2="480"/>
  </g>

  <!-- Candlestick / Holographic Growth Chart in background -->
  <path d="M 180 460 Q 320 380 460 410 T 740 320 T 1020 220 L 1020 480 L 180 480 Z" fill="url(#chartGrad)"/>
  <path d="M 180 460 Q 320 380 460 410 T 740 320 T 1020 220" stroke="#10b981" stroke-width="3" fill="none" filter="url(#glow)"/>

  <!-- Floating Holographic Glass Card (Midjourney trademark glassmorphism & reflections) -->
  <g transform="translate(430, 180) rotate(-7)">
    <!-- Glass Shadow / Glow -->
    <rect x="-10" y="-10" width="460" height="290" rx="26" fill="rgba(56,189,248,0.2)" filter="url(#softGlow)"/>
    <!-- Glass Surface -->
    <rect x="0" y="0" width="440" height="270" rx="22" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <!-- Card Chip -->
    <rect x="40" y="45" width="55" height="42" rx="8" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
    <path d="M 52 45 L 52 87 M 78 45 L 78 87 M 40 66 L 95 66" stroke="#92400e" stroke-width="1.2"/>
    <!-- Wireless Pay Icon -->
    <path d="M 120 62 A 12 12 0 0 1 120 78 M 126 56 A 20 20 0 0 1 126 84 M 132 50 A 28 28 0 0 1 132 90" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
    <!-- Holographic Numbers -->
    <text x="40" y="175" fill="white" font-family="'Courier New', monospace" font-size="22" letter-spacing="4" font-weight="bold" filter="url(#glow)">4829  9100  3481  7720</text>
    <text x="40" y="225" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-size="11" letter-spacing="1">CARDHOLDER</text>
    <text x="40" y="245" fill="white" font-family="sans-serif" font-size="14" font-weight="600" letter-spacing="2">ALEXANDER VANCE</text>
    <text x="320" y="225" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-size="11" letter-spacing="1">EXPIRES</text>
    <text x="320" y="245" fill="white" font-family="sans-serif" font-size="14" font-weight="600">08/30</text>
    <!-- Card Brand holographic orb -->
    <circle cx="365" cy="65" r="22" fill="#ef4444" opacity="0.85"/>
    <circle cx="385" cy="65" r="22" fill="#f59e0b" opacity="0.85"/>
  </g>

  <!-- Cinematic Floating Sparkles / Particles -->
  <circle cx="320" cy="200" r="3" fill="#38bdf8" filter="url(#glow)"/>
  <circle cx="940" cy="180" r="4" fill="#fbbf24" filter="url(#glow)"/>
  <circle cx="280" cy="420" r="2" fill="#a855f7"/>
  <circle cx="1010" cy="380" r="3" fill="#34d399" filter="url(#glow)"/>
  <circle cx="580" cy="130" r="3.5" fill="#ffffff" filter="url(#glow)"/>

  <!-- Badge Tag -->
  <rect x="40" y="40" width="300" height="48" rx="24" fill="rgba(15, 23, 42, 0.7)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5"/>
  <text x="60" y="70" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="1.5">MIDJOURNEY v6 AESTHETIC</text>
  <text x="40" y="675" fill="#94a3b8" font-family="sans-serif" font-size="15">Mood: Dark Cyber-Luxury | Lighting: Raytraced Volumetric Cyan/Gold | High Cinematic Flair</text>
</svg>
`;

// 2. Adobe Firefly Aesthetic: Clean Commercial Stock, Bright Approachable Studio Light, Friendly Vector 3D Icons
const fireflySvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fireflyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="rgba(15, 23, 42, 0.15)"/>
    </filter>
  </defs>

  <!-- Clean Corporate Background -->
  <rect width="1280" height="720" fill="url(#fireflyBg)"/>

  <!-- Soft Studio Ambient Spheres -->
  <circle cx="980" cy="220" r="280" fill="#dbeafe" opacity="0.6"/>
  <circle cx="280" cy="500" r="320" fill="#ede9fe" opacity="0.5"/>

  <!-- Realistic Smartphone Holding App Showcase -->
  <g transform="translate(480, 100)" filter="url(#softShadow)">
    <!-- Phone Bezel -->
    <rect x="0" y="0" width="320" height="540" rx="44" fill="url(#phoneGrad)" stroke="#cbd5e1" stroke-width="4"/>
    <!-- Phone Screen -->
    <rect x="12" y="12" width="296" height="516" rx="34" fill="#ffffff"/>
    
    <!-- App Screen Header -->
    <rect x="12" y="12" width="296" height="150" rx="34" fill="url(#screenGrad)"/>
    <text x="40" y="65" fill="rgba(255,255,255,0.8)" font-family="sans-serif" font-size="12" font-weight="600">Total Portfolio Value</text>
    <text x="40" y="105" fill="#ffffff" font-family="sans-serif" font-size="28" font-weight="800">$48,290.45</text>
    <rect x="40" y="120" width="70" height="22" rx="11" fill="rgba(255,255,255,0.2)"/>
    <text x="52" y="135" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="700">+14.8% ↑</text>

    <!-- Clean Vector Chart Inside Phone -->
    <path d="M 36 260 C 90 240, 140 280, 200 210 C 240 160, 270 190, 286 170" stroke="#2563eb" stroke-width="3" fill="none"/>
    <circle cx="286" cy="170" r="5" fill="#2563eb"/>

    <!-- Transaction Rows -->
    <g transform="translate(36, 310)">
      <rect x="0" y="0" width="248" height="50" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <circle cx="25" cy="25" r="14" fill="#dbeafe"/>
      <text x="50" y="24" fill="#0f172a" font-family="sans-serif" font-size="13" font-weight="600">Apple Inc. Dividend</text>
      <text x="50" y="38" fill="#64748b" font-family="sans-serif" font-size="11">Today, 2:30 PM</text>
      <text x="195" y="29" fill="#16a34a" font-family="sans-serif" font-size="13" font-weight="700">+$240.00</text>
    </g>

    <g transform="translate(36, 375)">
      <rect x="0" y="0" width="248" height="50" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <circle cx="25" cy="25" r="14" fill="#fee2e2"/>
      <text x="50" y="24" fill="#0f172a" font-family="sans-serif" font-size="13" font-weight="600">Global Tech ETF</text>
      <text x="50" y="38" fill="#64748b" font-family="sans-serif" font-size="11">Yesterday</text>
      <text x="200" y="29" fill="#dc2626" font-family="sans-serif" font-size="13" font-weight="700">-$85.50</text>
    </g>
  </g>

  <!-- Floating 3D Clean Isometric Vector Assets (Firefly/Adobe Stock hallmark) -->
  <!-- Floating Shield Icon -->
  <g transform="translate(240, 220)" filter="url(#softShadow)">
    <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <path d="M 50 25 L 70 34 C 70 56, 50 72, 50 72 C 50 72, 30 56, 30 34 Z" fill="#2563eb"/>
    <path d="M 44 48 L 48 52 L 58 42" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="50" y="115" fill="#475569" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">Bank-Grade Security</text>
  </g>

  <!-- Floating Investment Growth Badge -->
  <g transform="translate(860, 260)" filter="url(#softShadow)">
    <rect x="0" y="0" width="180" height="90" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <circle cx="36" cy="45" r="18" fill="#dcfce7"/>
    <text x="36" y="51" fill="#16a34a" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">↑</text>
    <text x="68" y="38" fill="#64748b" font-family="sans-serif" font-size="11">Annual Yield</text>
    <text x="68" y="60" fill="#0f172a" font-family="sans-serif" font-size="18" font-weight="800">8.4% APY</text>
  </g>

  <!-- Badge Tag -->
  <rect x="40" y="40" width="290" height="48" rx="24" fill="#ffffff" stroke="#2563eb" stroke-width="1.5" filter="url(#softShadow)"/>
  <text x="60" y="70" fill="#2563eb" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="1.5">ADOBE FIREFLY AESTHETIC</text>
  <text x="40" y="675" fill="#64748b" font-family="sans-serif" font-size="15">Mood: Bright Corporate SaaS | Lighting: Clean Studio Daylight | Commercial &amp; Stock-Ready</text>
</svg>
`;

async function generateFintech() {
  await sharp(Buffer.from(midjourneySvg))
    .png()
    .toFile(path.join(outputDir, 'fintech-midjourney-sample.png'));
  console.log('✓ Q5: fintech-midjourney-sample.png created');

  await sharp(Buffer.from(fireflySvg))
    .png()
    .toFile(path.join(outputDir, 'fintech-firefly-sample.png'));
  console.log('✓ Q5: fintech-firefly-sample.png created');
}

generateFintech().catch(console.error);
