import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/home", icon: "🏠" },
    { name: "Explore", href: "/explore", icon: "🚀" },
    { name: "Contact", href: "/contact", icon: "📞" },
    { name: "Playlists (SSG 101)", href: "/playlists/101", icon: "🎵" },
    { name: "Flipkart Demo", href: "/products/FK-MOB-101", icon: "🛍️" },
  ];

  return (
    <header style={headerStyle}>
      <div style={navContainerStyle}>
        <div style={brandStyle}>
          <Link href="/home" style={brandLinkStyle}>
            NextApp <span style={{ color: "#38bdf8" }}>Routing</span>
          </Link>
        </div>

        <nav style={navListStyle}>
          {navLinks.map((link) => {
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
  width: "100%",
  backgroundColor: "#1e293b",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const navContainerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
};

const brandStyle = {
  fontSize: "1.25rem",
  fontWeight: "800",
};

const brandLinkStyle = {
  color: "#f8fafc",
  textDecoration: "none",
  letterSpacing: "0.5px",
};

const navListStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 14px",
  borderRadius: "8px",
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: "500",
  transition: "all 0.2s ease-in-out",
};

const activeLinkStyle = {
  ...linkStyle,
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  fontWeight: "600",
  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.4)",
};
