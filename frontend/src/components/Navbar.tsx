import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#f4b6b6",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2 style={{ color: "#1f1c36" }}>Cherity Perfumes</h2>

      <div>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/products" style={linkStyle}>Catalog</Link>
        <Link href="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  marginLeft: "20px",
  color: "#1f1c36",
  textDecoration: "none",
  fontWeight: "bold"
}
