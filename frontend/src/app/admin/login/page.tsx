"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.access_token);
      router.push("/admin/dashboard");

    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid login details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={wrapper}>
        {/* Logo Section */}
        <div style={logoSection}>
          <h1 style={logo}>✨</h1>
          <h2 style={brandName}>Cherity Perfumes</h2>
          <p style={subtitle}>Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={card}>
          <h3 style={formTitle}>Welcome Back</h3>
          <p style={formSubtitle}>Sign in to manage your products</p>

          {error && <div style={errorBox}>{error}</div>}

          <div style={inputGroup}>
            <label style={label}>Username</label>
            <input
              style={input}
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Password</label>
            <input
              style={input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button style={{...btn, opacity: loading ? 0.7 : 1}} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: "center" as const }}>
          <button style={backBtn} onClick={() => router.push("/")}>Return to Home</button>
        </div>

        <p style={footer}>© 2026 Cherity Perfumes. All rights reserved.</p>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "20px"
};

const wrapper = {
  width: "100%",
  maxWidth: "420px"
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "40px",
  color: "white"
};

const logo = {
  fontSize: "48px",
  marginBottom: "10px"
};

const brandName = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "5px"
};

const subtitle = {
  fontSize: "14px",
  opacity: 0.9
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
};

const formTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1f1c36",
  marginBottom: "5px"
};

const formSubtitle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "30px"
};

const errorBox = {
  background: "#fee",
  border: "1px solid #fcc",
  color: "#c33",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "20px",
  fontSize: "14px"
};

const inputGroup = {
  marginBottom: "20px"
};

const label = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1f1c36",
  marginBottom: "8px"
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  boxSizing: "border-box" as const,
  transition: "border-color 0.3s",
  outline: "none"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  transition: "transform 0.2s",
};

const backBtn = {
  padding: "10px 18px",
  background: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "20px",
  fontSize: "12px",
  color: "rgba(255, 255, 255, 0.7)"
};