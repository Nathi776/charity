import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={navBar}>
      <div style={logoContainer}>
        <span style={logo}>✨</span>
        <Link href="/" style={brandName}>Cherity Perfumes</Link>
      </div>

      <div style={navLinks}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/products" style={linkStyle}>Catalog</Link>
        <Link href="/admin/login" style={adminLink}>Admin</Link>
      </div>
    </nav>
  );
}

const navBar = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "16px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  position: "sticky" as const,
  top: 0,
  zIndex: 100
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const logo = {
  fontSize: "24px"
};

const brandName = {
  fontSize: "18px",
  fontWeight: "700",
  color: "white",
  textDecoration: "none",
  transition: "opacity 0.3s"
};

const navLinks = {
  display: "flex",
  gap: "30px",
  alignItems: "center"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
  transition: "opacity 0.3s"
};

const adminLink = {
  ...linkStyle,
  background: "rgba(255, 255, 255, 0.2)",
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid rgba(255, 255, 255, 0.3)"
}
