import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:8000/products/");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProtectedRoute>
      <div style={{ padding: 40 }}>
        <h2>Admin Dashboard</h2>

        {products.map((p: any) => (
          <div key={p.id} style={card}>
            <h3>{p.name}</h3>
            <p>R{p.price}</p>
            <p>{p.category}</p>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}

const card = {
  border: "1px solid #ddd",
  padding: 20,
  margin: "15px 0",
  borderRadius: "10px"
};
