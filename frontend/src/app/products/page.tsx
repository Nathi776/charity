"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const filteredProducts = filter === "All"
    ? products
    : products.filter((p: any) => p.category === filter);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://charity-backend-epoo.onrender.com/products/");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div style={container}>
        <div style={header}>
          <h1 style={title}>Our Collection</h1>
          <p style={subtitle}>Discover our premium selection of perfumes, fashion, and beauty products</p>
        </div>

        <div style={filterSection}>
          {["All", "Perfume", "Clothes", "Nails"].map(item => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                ...filterBtn,
                ...(filter === item ? filterBtnActive : filterBtnInactive)
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={loadingContainer}>
            <p style={loadingText}>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No products found in this category.</p>
          </div>
        ) : (
          <div style={grid}>
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const container = {
  minHeight: "100vh",
  background: "#f8f9fa",
  padding: "60px 40px"
};

const header = {
  textAlign: "center" as const,
  marginBottom: "50px"
};

const title = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#1f1c36",
  marginBottom: "10px"
};

const subtitle = {
  fontSize: "16px",
  color: "#666",
  maxWidth: "600px",
  margin: "0 auto"
};

const filterSection = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "40px",
  flexWrap: "wrap" as const
};

const filterBtn = {
  padding: "10px 24px",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: "all 0.3s"
};

const filterBtnActive = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white"
};

const filterBtnInactive = {
  background: "white",
  color: "#1f1c36",
  border: "1px solid #ddd"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "24px"
};

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px"
};

const loadingText = {
  fontSize: "16px",
  color: "#666"
};

const emptyState = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
  background: "white",
  borderRadius: "12px"
};

const emptyText = {
  fontSize: "16px",
  color: "#999"
};