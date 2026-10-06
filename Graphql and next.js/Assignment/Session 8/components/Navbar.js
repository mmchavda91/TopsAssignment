import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const links = [
    { name: "Trending Movies (SSG)", href: "/trending-movies", icon: "🎬" },
    { name: "My Orders (SSR)", href: "/my-orders", icon: "🍕" },
    { name: "Products SSG", href: "/products/1", icon: "🛍️" },
    { name: "Latest Albums (GraphQL)", href: "/latest-albums", icon: "🎵" },
    { name: "SSR vs SSG Diagram", href: "/rendering-comparison", icon: "📊" },
  ];

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link href="/" style={brandStyle}>
          Session 8 <span style={{ color: "#38bdf8" }}>Data Fetching</span>
        </Link>

        <nav style={navStyle}>
          {links.map((link) => {
            const isActive = router.asPath === link.href || router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={isActive ? activeLinkStyle : linkStyle}
              >
                <span>{link.icon}</span> {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

const headerStyle = {
  backgroundColor: "#1e293b",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  position: "sticky",
  top: 0,
  zIndex: 100,
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
};

const brandStyle = {
  color: "#f8fafc",
  fontSize: "1.2rem",
  fontWeight: "800",
  textDecoration: "none",
};

const navStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  borderRadius: "8px",
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: "500",
  transition: "all 0.2s",
};

const activeLinkStyle = {
  ...linkStyle,
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  fontWeight: "600",
};
