import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

// ==============================================================
// QUESTION 5: AI-Generated Flipkart Product Dynamic Route Page
// Generates product details based on URL productId parameter
// ==============================================================

export default function FlipkartProductDetail() {
  const router = useRouter();
  const { productId } = router.query;

  // Mock catalog of Flipkart products
  const flipkartCatalog = {
    "FK-MOB-101": {
      title: "Apple iPhone 15 (Blue, 128 GB)",
      price: "₹65,999",
      originalPrice: "₹79,900",
      discount: "17% off",
      rating: "4.6 ★ (25,430 ratings)",
      image: "📱",
      delivery: "FREE Delivery by Tomorrow",
      specs: ["128 GB ROM", "15.49 cm (6.1 inch) Super Retina XDR Display", "48MP + 12MP Camera", "A16 Bionic Chip"],
    },
    "FK-LAP-202": {
      title: "MacBook Air M2 (8GB RAM / 256GB SSD - Starlight)",
      price: "₹89,990",
      originalPrice: "₹99,900",
      discount: "9% off",
      rating: "4.8 ★ (12,890 ratings)",
      image: "💻",
      delivery: "FREE Delivery in 2 Days",
      specs: ["Apple M2 Chip", "8 GB Unified Memory", "256 GB SSD", "Liquid Retina Display"],
    },
    "FK-WATCH-303": {
      title: "Noise ColorFit Pulse 3 Smartwatch (Jet Black)",
      price: "₹1,499",
      originalPrice: "₹4,999",
      discount: "70% off",
      rating: "4.2 ★ (88,210 ratings)",
      image: "⌚",
      delivery: "FREE Delivery by Today 9 PM",
      specs: ["1.96-inch TFT Display", "Bluetooth Calling", "7-Day Battery Life", "100+ Sports Modes"],
    },
  };

  const product = productId && flipkartCatalog[productId]
    ? flipkartCatalog[productId]
    : {
        title: `Generic Flipkart Product (${productId})`,
        price: "₹2,499",
        originalPrice: "₹4,999",
        discount: "50% off",
        rating: "4.3 ★ (4,120 ratings)",
        image: "📦",
        delivery: "Standard Delivery in 3-4 days",
        specs: ["Verified Seller Quality", "7 Days Replacement Policy", "Cash on Delivery Available"],
      };

  return (
    <div style={containerStyle}>
      <Head>
        <title>{product.title} - Flipkart</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        {/* Custom Message Banner with productId as requested */}
        <div style={customBannerStyle}>
          🎉 <strong>Special Offer Applied!</strong> You are currently viewing product ID:{" "}
          <span style={productIdBadgeStyle}>{productId || "Loading..."}</span> on Flipkart!
        </div>

        <div style={productCardStyle}>
          {/* Left Column: Product Image Simulation */}
          <div style={imageColStyle}>
            <div style={imageBoxStyle}>{product.image}</div>
            <div style={btnRowStyle}>
              <button style={cartBtnStyle}>🛒 ADD TO CART</button>
              <button style={buyBtnStyle}>⚡ BUY NOW</button>
            </div>
          </div>

          {/* Right Column: Product Info & Pricing */}
          <div style={infoColStyle}>
            <span style={fkAssuredBadgeStyle}>Flipkart Assured ✔</span>
            <h1 style={productTitleStyle}>{product.title}</h1>

            <div style={ratingBadgeStyle}>{product.rating}</div>

            <div style={priceContainerStyle}>
              <span style={finalPriceStyle}>{product.price}</span>
              <span style={originalPriceStyle}>{product.originalPrice}</span>
              <span style={discountStyle}>{product.discount}</span>
            </div>

            <p style={deliveryTextStyle}>🚚 {product.delivery}</p>

            <div style={specsBoxStyle}>
              <h3 style={{ fontSize: "16px", marginBottom: "8px", color: "#38bdf8" }}>Key Specifications:</h3>
              <ul style={{ paddingLeft: "20px", color: "#cbd5e1", lineHeight: "1.7" }}>
                {product.specs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Test Other Product IDs */}
            <div style={quickIdsStyle}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>Test other Flipkart IDs: </span>
              <Link href="/products/FK-MOB-101" style={pillStyle}>/products/FK-MOB-101</Link>
              <Link href="/products/FK-LAP-202" style={pillStyle}>/products/FK-LAP-202</Link>
              <Link href="/products/FK-WATCH-303" style={pillStyle}>/products/FK-WATCH-303</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Styling
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  display: "flex",
  flexDirection: "column",
};

const mainStyle = {
  flex: 1,
  padding: "30px 20px",
  maxWidth: "1000px",
  width: "100%",
  margin: "0 auto",
};

const customBannerStyle = {
  backgroundColor: "rgba(40, 116, 240, 0.2)",
  border: "1px solid #2874f0",
  color: "#60a5fa",
  padding: "12px 20px",
  borderRadius: "10px",
  marginBottom: "24px",
  fontSize: "15px",
  textAlign: "center",
};

const productIdBadgeStyle = {
  backgroundColor: "#2874f0",
  color: "#ffffff",
  padding: "2px 8px",
  borderRadius: "6px",
  fontWeight: "bold",
};

const productCardStyle = {
  display: "flex",
  gap: "35px",
  background: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  flexWrap: "wrap",
};

const imageColStyle = {
  flex: "1 1 280px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageBoxStyle = {
  width: "100%",
  height: "260px",
  background: "#0f172a",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "90px",
  border: "1px solid rgba(255,255,255,0.06)",
};

const btnRowStyle = {
  display: "flex",
  gap: "12px",
  width: "100%",
  marginTop: "16px",
};

const cartBtnStyle = {
  flex: 1,
  padding: "12px 10px",
  backgroundColor: "#ff9f00",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "13px",
};

const buyBtnStyle = {
  flex: 1,
  padding: "12px 10px",
  backgroundColor: "#fb641b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "13px",
};

const infoColStyle = {
  flex: "2 1 400px",
};

const fkAssuredBadgeStyle = {
  display: "inline-block",
  padding: "2px 8px",
  backgroundColor: "rgba(40, 116, 240, 0.3)",
  color: "#38bdf8",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const productTitleStyle = {
  fontSize: "1.6rem",
  fontWeight: "700",
  margin: "0 0 10px 0",
  color: "#f8fafc",
};

const ratingBadgeStyle = {
  display: "inline-block",
  backgroundColor: "#388e3c",
  color: "#fff",
  padding: "3px 8px",
  borderRadius: "4px",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "14px",
};

const priceContainerStyle = {
  display: "flex",
  alignItems: "baseline",
  gap: "12px",
  margin: "10px 0",
};

const finalPriceStyle = {
  fontSize: "2rem",
  fontWeight: "800",
  color: "#f8fafc",
};

const originalPriceStyle = {
  fontSize: "1.1rem",
  color: "#64748b",
  textDecoration: "line-through",
};

const discountStyle = {
  fontSize: "1.1rem",
  color: "#388e3c",
  fontWeight: "bold",
};

const deliveryTextStyle = {
  fontSize: "14px",
  color: "#10b981",
  fontWeight: "500",
  margin: "10px 0 16px 0",
};

const specsBoxStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.06)",
  marginBottom: "20px",
};

const quickIdsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const pillStyle = {
  padding: "4px 10px",
  backgroundColor: "#334155",
  color: "#38bdf8",
  borderRadius: "6px",
  fontSize: "12px",
  textDecoration: "none",
};
