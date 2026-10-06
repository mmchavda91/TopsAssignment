import Head from "next/head";
import Navbar from "../components/Navbar";

// ==============================================================
// QUESTION 2: my-orders.js
// Uses getServerSideProps (SSR) to fetch & display user food orders
// Simulates Zomato/Swiggy order history on EVERY request
// ==============================================================

export default function MyOrders({ orders, requestedAt, totalOrders }) {
  return (
    <div style={containerStyle}>
      <Head>
        <title>My Food Orders - SSR (getServerSideProps)</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        <div style={badgeStyle}>🔄 Server-Side Rendering (getServerSideProps)</div>
        <h1 style={titleStyle}>🍕 My Recent Food Orders</h1>
        <p style={subtitleStyle}>
          Freshly rendered on server at <strong>{requestedAt}</strong> on every page reload (Live Zomato/Swiggy Simulation).
        </p>

        <div style={summaryBarStyle}>
          <span>Total Orders: <strong>{totalOrders}</strong></span>
          <span>Active Status: <strong style={{ color: "#22c55e" }}>Live Server Active</strong></span>
        </div>

        <div style={ordersListStyle}>
          {orders.map((order) => (
            <div key={order.orderId} style={orderCardStyle}>
              {/* Order Header */}
              <div style={orderHeaderStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "32px" }}>{order.icon}</span>
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "1.2rem", color: "#f8fafc" }}>
                      {order.restaurant}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
                      {order.location} • Order #{order.orderId}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={statusBadgeStyle(order.statusColor)}>
                    {order.status}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "4px" }}>
                    {order.orderedAt}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div style={itemsListStyle}>
                <div style={{ fontSize: "0.95rem", color: "#e2e8f0" }}>
                  <strong>Items:</strong> {order.items.join(", ")}
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#38bdf8", marginTop: "8px" }}>
                  Total: {order.totalAmount}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={actionsRowStyle}>
                <button style={reorderBtnStyle}>🔄 Reorder</button>
                <button style={helpBtnStyle}>💬 Get Help</button>
                <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#94a3b8" }}>
                  Delivery Partner: <strong>{order.deliveryPartner}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// QUESTION 2: getServerSideProps (SSR)
// Runs on every single request to fetch the latest food orders
// -------------------------------------------------------------
export async function getServerSideProps() {
  // Simulating random order generator like Zomato / Swiggy
  const restaurants = [
    { name: "Domino's Pizza", loc: "Vastrapur, Ahmedabad", icon: "🍕", partner: "Ramesh Patel" },
    { name: "La Pino'z Pizza", loc: "Navrangpura, Ahmedabad", icon: "🧀", partner: "Suresh Shah" },
    { name: "McDonald's", loc: "S.G. Highway, Ahmedabad", icon: "🍔", partner: "Amit Verma" },
    { name: "Honest Restaurant", loc: "Prahlad Nagar, Ahmedabad", icon: "🍛", partner: "Vikram Sinh" },
    { name: "Subway Fresh Sandwiches", loc: "Maninagar, Ahmedabad", icon: "🥪", partner: "Mahesh K." },
  ];

  const statuses = [
    { label: "Delivered ✔", color: "#22c55e" },
    { label: "On the way 🛵", color: "#38bdf8" },
    { label: "Food being prepared 👨‍🍳", color: "#f59e0b" },
  ];

  const itemsPool = [
    "Cheese Burst Farmhouse Pizza",
    "Peri Peri French Fries",
    "Choco Lava Cake",
    "Butter Pav Bhaji",
    "Paneer Tikka Sub",
    "Cold Coffee with Ice Cream",
    "Veg Maharaja Burger",
  ];

  // Generate 4 recent orders
  const orders = Array.from({ length: 4 }).map((_, index) => {
    const restaurant = restaurants[index % restaurants.length];
    const status = statuses[index === 0 ? 1 : 0]; // First order active
    const randomItems = [
      itemsPool[(index * 2) % itemsPool.length],
      itemsPool[(index * 2 + 1) % itemsPool.length],
    ];

    return {
      orderId: `ZOM-${1000 + index + Math.floor(Math.random() * 900)}`,
      restaurant: restaurant.name,
      location: restaurant.loc,
      icon: restaurant.icon,
      deliveryPartner: restaurant.partner,
      status: status.label,
      statusColor: status.color,
      items: randomItems,
      totalAmount: `₹${349 + index * 120}`,
      orderedAt: `${index * 20 + 5} mins ago`,
    };
  });

  return {
    props: {
      orders,
      requestedAt: new Date().toLocaleTimeString(),
      totalOrders: orders.length,
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
  maxWidth: "900px",
  width: "100%",
  margin: "0 auto",
  padding: "40px 20px",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "rgba(239, 68, 68, 0.2)",
  border: "1px solid #ef4444",
  color: "#f87171",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "2.4rem",
  margin: "0 0 10px 0",
  background: "linear-gradient(135deg, #ef4444, #f97316)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle = {
  fontSize: "1rem",
  color: "#94a3b8",
  marginBottom: "24px",
};

const summaryBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 18px",
  backgroundColor: "#1e293b",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "24px",
  fontSize: "14px",
};

const ordersListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const orderCardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "14px",
  padding: "24px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
};

const orderHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  paddingBottom: "16px",
};

const statusBadgeStyle = (color) => ({
  display: "inline-block",
  padding: "4px 10px",
  backgroundColor: `${color}20`,
  border: `1px solid ${color}`,
  color: color,
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "bold",
});

const itemsListStyle = {
  padding: "16px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const actionsRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingTop: "16px",
  flexWrap: "wrap",
};

const reorderBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
};

const helpBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#334155",
  color: "#f8fafc",
  border: "none",
  borderRadius: "6px",
  fontSize: "13px",
  cursor: "pointer",
};
