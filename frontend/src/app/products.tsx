import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  const filteredProducts = filter === "All"
    ? products
    : products.filter((p:any) => p.category === filter);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/products/");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div style={container}>
        <h1 style={title}>Our Collection</h1>

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          {["All", "Perfume", "Clothes", "Nails"].map(item => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                margin: "5px",
                padding: "10px 20px",
                background: filter === item ? "#1f1c36" : "#f4b6b6",
                color: filter === item ? "#fff" : "#1f1c36",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: filter === item ? "bold" : "normal"
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={grid}>
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

const container = {
  padding: "50px"
};

const title = {
  textAlign: "center" as const,
  marginBottom: "40px",
  color: "#1f1c36"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "30px"
};