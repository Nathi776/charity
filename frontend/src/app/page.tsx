"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={container}>
      {/* Dark Overlay */}
      <div style={overlay}></div>
      
      {/* Background Logo */}
      <div style={bgLogo}>
        <Image
          src="/logo.jpg"
          alt="Cherity Perfumes Logo"
          fill
          style={{ objectFit: "cover", opacity: 0.25 }}
        />
      </div>

      {/* Content */}
      <div style={content}>
        <div style={logoEmoji}>✨</div>
        <h1 style={title}>Cherity Perfumes</h1>
        <p style={tagline}>Perfumes • Fashion • Beauty</p>
        <p style={description}>Discover our premium collection of luxury perfumes and fashion items</p>

        <div style={buttonGroup}>
          <button style={primaryBtn} onClick={() => router.push("/products")}>
            Explore Catalog
          </button>
          <button style={secondaryBtn} onClick={() => router.push("/admin/login")}>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative" as const,
  overflow: "hidden",
  padding: "20px"
};

const bgLogo = {
  position: "absolute" as const,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  opacity: 1
};

const overlay = {
  position: "absolute" as const,
  inset: 0,
  background: "rgba(102, 126, 234, 0.4)",
  zIndex: 2,
  mixBlendMode: "multiply" as const
};

const content = {
  zIndex: 3,
  textAlign: "center" as const,
  color: "white",
  maxWidth: "600px",
  position: "relative" as const
};

const logoEmoji = {
  fontSize: "64px",
  marginBottom: "20px"
};

const title = {
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "10px",
  lineHeight: "1.2"
};

const tagline = {
  fontSize: "20px",
  marginBottom: "15px",
  opacity: 0.95,
  fontWeight: "500"
};

const description = {
  fontSize: "16px",
  marginBottom: "40px",
  opacity: 0.9,
  lineHeight: "1.6"
};

const buttonGroup = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  flexWrap: "wrap" as const
};

const primaryBtn = {
  padding: "14px 40px",
  fontSize: "16px",
  background: "white",
  color: "#667eea",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
};

const secondaryBtn = {
  padding: "14px 40px",
  fontSize: "16px",
  background: "rgba(255, 255, 255, 0.2)",
  color: "white",
  border: "2px solid white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.2s"
};
