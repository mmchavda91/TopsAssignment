import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

// ==============================================================
// QUESTION 3: pages/products/[id].js
// Pre-generates paths for 5 fake Flipkart product IDs (1, 2, 3, 4, 5)
// Uses getStaticPaths + getStaticProps with local hardcoded array
// ==============================================================

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div style={containerStyle}>
        <Navbar />
        <main style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
          <h2>Product Not Found</h2>
          <Link href="/products/1" style={{ color: "#38bdf8" }}>View Product 1</Link>
        </main>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Head>
        <title>{product.name} - Flipkart Product #{product.id}</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        {/* Breadcrumb & Navigation */}
        <div style={breadcrumbStyle}>
          <Link href="/products/1" style={{ color: "#38bdf8", textDecoration: "none" }}>Products</Link>
          {" > "}{product.category}{" > "}<span>{product.name}</span>
        </div>

        <div style={cardStyle}>
          {/* Product Image Column */}
          <div style={imageColStyle}>
            <div style={imageBoxStyle}>{product.image}</div>
            <div style={btnRowStyle}>
              <button style={cartBtnStyle}>🛒 ADD TO CART</button>
              <button style={buyBtnStyle}>⚡ BUY NOW</button>
            </div>
          </div>

          {/* Product Details Column */}
          <div style={infoColStyle}>
            <span style={assuredBadgeStyle}>Flipkart Assured ✔</span>
            <h1 style={nameStyle}>{product.name}</h1>
            <div style={ratingBadgeStyle}>{product.rating}</div>

            <div style={priceRowStyle}>
              <span style={priceStyle}>{product.price}</span>
              <span style={originalPriceStyle}>{product.originalPrice}</span>
              <span style={discountStyle}>{product.discount}</span>
            </div>

            <p style={deliveryStyle}>🚚 {product.delivery}</p>

            <div style={specsBoxStyle}>
              <h3 style={{ fontSize: "15px", color: "#38bdf8", marginBottom: "8px" }}>Highlights:</h3>
              <ul style={{ paddingLeft: "20px", color: "#cbd5e1", lineHeight: "1.7" }}>
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Quick switcher between the 5 pre-generated products */}
            <div style={switcherStyle}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                Pre-rendered SSG Products (getStaticPaths):
              </span>
              {[1, 2, 3, 4, 5].map((id) => (
                <Link
                  key={id}
                  href={`/products/${id}`}
                  style={product.id === String(id) ? activePillStyle : pillStyle}
                >
                  Product #{id}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// Hardcoded Local Array of 5 Fake Flipkart Products
// -------------------------------------------------------------
const flipkartProducts = [
  {
    id: "1",
    name: "Apple iPhone 15 Pro (Natural Titanium, 128 GB)",
    category: "Mobiles",
    price: "₹1,24,900",
    originalPrice: "₹1,34,900",
    discount: "7% off",
    rating: "4.7 ★ (18,400 ratings)",
    image: "📱",
    delivery: "FREE Delivery by Tomorrow",
    highlights: ["A17 Pro Chip with 6-core GPU", "Titanium design with textured matte glass back", "48MP Main Camera", "Action Button"],
  },
  {
    id: "2",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Audio",
    price: "₹26,990",
    originalPrice: "₹34,990",
    discount: "22% off",
    rating: "4.6 ★ (34,120 ratings)",
    image: "🎧",
    delivery: "FREE Delivery by Friday",
    highlights: ["Industry Leading Active Noise Cancellation", "30-Hour Battery Life", "Crystal Clear Hands-Free Calling", "Multipoint connection"],
  },
  {
    id: "3",
    name: "Samsung Galaxy Watch6 Classic (Bluetooth, 47mm)",
    category: "Smartwatches",
    price: "₹36,999",
    originalPrice: "₹42,999",
    discount: "13% off",
    rating: "4.5 ★ (9,430 ratings)",
    image: "⌚",
    delivery: "FREE Delivery in 2 Days",
    highlights: ["Rotating Physical Bezel", "Advanced Sleep Coaching", "Body Composition Analysis", "Sapphire Crystal Glass"],
  },
  {
    id: "4",
    name: "ASUS ROG Zephyrus G16 Gaming Laptop (16GB/1TB SSD/RTX 4070)",
    category: "Laptops",
    price: "₹1,64,990",
    originalPrice: "₹1,89,990",
    discount: "13% off",
    rating: "4.8 ★ (4,120 ratings)",
    image: "💻",
    delivery: "FREE Scheduled Delivery",
    highlights: ["Intel Core Ultra 9 Processor", "NVIDIA GeForce RTX 4070", "OLED 240Hz Display", "Ultra-slim CNC Aluminum Chassis"],
  },
  {
    id: "5",
    name: "Canon EOS R50 Mirrorless Camera with 18-45mm Lens",
    category: "Cameras",
    price: "₹57,990",
    originalPrice: "₹65,995",
    discount: "12% off",
    rating: "4.6 ★ (6,780 ratings)",
    image: "📷",
    delivery: "FREE Delivery by Tomorrow 11 AM",
    highlights: ["24.2 MP APS-C CMOS Sensor", "Dual Pixel CMOS AF II", "6K Oversampled 4K 30p Video", "Compact and Lightweight Body"],
  },
];

// -------------------------------------------------------------
// QUESTION 3: getStaticPaths
// Pre-generate paths for exactly 5 fake Flipkart product IDs
// -------------------------------------------------------------
export async function getStaticPaths() {
  const paths = flipkartProducts.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    // fallback: false ensures any other ID returns 404
    fallback: false,
  };
}

// -------------------------------------------------------------
// QUESTION 3: getStaticProps
// Fetch product details for the specified ID from the local array
// -------------------------------------------------------------
export async function getStaticProps({ params }) {
  const { id } = params;
  const product = flipkartProducts.find((p) => p.id === id) || null;

  return {
    props: {
      product,
    },
  };
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
  maxWidth: "1050px",
  width: "100%",
  margin: "0 auto",
  padding: "30px 20px",
};

const breadcrumbStyle = {
  fontSize: "13px",
  color: "#94a3b8",
  marginBottom: "16px",
};

const cardStyle = {
  display: "flex",
  gap: "35px",
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  flexWrap: "wrap",
};

const imageColStyle = {
  flex: "1 1 300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageBoxStyle = {
  width: "100%",
  height: "280px",
  backgroundColor: "#0f172a",
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
  padding: "12px",
  backgroundColor: "#ff9f00",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
};

const buyBtnStyle = {
  flex: 1,
  padding: "12px",
  backgroundColor: "#fb641b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
};

const infoColStyle = {
  flex: "2 1 450px",
};

const assuredBadgeStyle = {
  display: "inline-block",
  padding: "2px 8px",
  backgroundColor: "rgba(40, 116, 240, 0.3)",
  color: "#38bdf8",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const nameStyle = {
  fontSize: "1.6rem",
  fontWeight: "700",
  margin: "0 0 10px 0",
};

const ratingBadgeStyle = {
  display: "inline-block",
  backgroundColor: "#388e3c",
  color: "#fff",
  padding: "3px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "14px",
};

const priceRowStyle = {
  display: "flex",
  alignItems: "baseline",
  gap: "12px",
  margin: "10px 0",
};

const priceStyle = {
  fontSize: "2rem",
  fontWeight: "800",
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

const deliveryStyle = {
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

const switcherStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  paddingTop: "14px",
  borderTop: "1px solid rgba(255,255,255,0.08)",
};

const pillStyle = {
  padding: "5px 12px",
  backgroundColor: "#334155",
  color: "#cbd5e1",
  borderRadius: "6px",
  fontSize: "12px",
  textDecoration: "none",
};

const activePillStyle = {
  ...pillStyle,
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  fontWeight: "bold",
};
