"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getProducts = async () => {
    const res = await axios.get("http://localhost:8000/products/");
    setProducts(res.data);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/products/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      setProducts(prev => prev.filter(p => p.id !== id));
      setToast({ message: "Product deleted successfully!", type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ message: "Failed to delete product", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("description", form.description);

      if (form.image) {
        data.append("image", form.image);
      }

      await axios.post("http://localhost:8000/products/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      getProducts();

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null
      });
      setPreview(null);
      setSuccessMsg("Product added successfully!");
      
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProtectedRoute>
      <div style={container}>
        {/* Header */}
        <div style={header}>
          <div>
            <h1 style={title}>✨ Admin Dashboard</h1>
            <p style={subtitle}>Manage your Cherity Perfumes inventory</p>
          </div>
          <button style={logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {successMsg && <div style={successBox}>{successMsg}</div>}

        {toast && (
          <div style={toast.type === "success" ? toastSuccess : toastError}>
            {toast.type === "success" ? "✓" : "✕"} {toast.message}
          </div>
        )}

        {/* Main Content */}
        <div style={mainContent}>
          {/* Add Product Form */}
          <section style={formSection}>
            <div style={sectionHeader}>
              <h2 style={sectionTitle}>Add New Product</h2>
              <p style={sectionSubtitle}>Fill in the form below to add a new product</p>
            </div>

            <form onSubmit={addProduct} style={formCard}>
              <div style={formRow}>
                <div style={formCol}>
                  <label style={label}>Product Name *</label>
                  <input
                    style={input}
                    type="text"
                    name="name"
                    placeholder="e.g. Rose Perfume"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div style={formCol}>
                  <label style={label}>Price (R) *</label>
                  <input
                    style={input}
                    type="number"
                    name="price"
                    placeholder="e.g. 299.99"
                    value={form.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                    disabled={loading}
                  />
                </div>

                <div style={formCol}>
                  <label style={label}>Category *</label>
                  <select style={input} name="category" value={form.category} onChange={handleChange} required disabled={loading}>
                    <option value="">Select Category</option>
                    <option value="Perfume">Perfume</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Nails">Nails</option>
                  </select>
                </div>
              </div>

              <div style={formCol}>
                <label style={label}>Description *</label>
                <textarea
                  style={textArea}
                  name="description"
                  placeholder="Enter product description..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div style={formCol}>
                <label style={label}>Product Image</label>
                <div style={fileUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    style={{display: "none"}} id="fileInput"
                  />
                  <label htmlFor="fileInput" style={fileLabel}>
                    📷 Click to upload image
                  </label>
                </div>

                {preview && (
                  <div style={previewContainer}>
                    <img src={preview} alt="Preview" style={previewImage} />
                  </div>
                )}
              </div>

              <button style={{...submitBtn, opacity: loading ? 0.7 : 1}} disabled={loading}>
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </form>
          </section>

          {/* Products List */}
          <section style={productsSection}>
            <div style={sectionHeader}>
              <h2 style={sectionTitle}>Your Products</h2>
              <p style={sectionSubtitle}>{products.length} product{products.length !== 1 ? "s" : ""} in inventory</p>
            </div>

            {products.length === 0 ? (
              <div style={emptyState}>
                <p style={emptyStateText}>No products yet. Add your first product above!</p>
              </div>
            ) : (
              <div style={grid}>
                {products.map((p) => (
                  <div key={p.id} style={productCard}>
                    {p.image_url && (
                      <div style={imageContainer}>
                        <img
                          src={p.image_url.startsWith("http")
                            ? p.image_url
                            : `http://localhost:8000${p.image_url}`}
                          alt={p.name}
                          style={productImage}
                        />
                      </div>
                    )}

                    <div style={cardContent}>
                      <h4 style={productName}>{p.name}</h4>
                      <p style={productPrice}>R{parseFloat(p.price).toFixed(2)}</p>
                      <span style={categoryBadge}>{p.category}</span>
                      <p style={productDesc}>{p.description}</p>
                      <div style={actions}>
                        <button style={deleteBtn} onClick={() => deleteProduct(p.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  background: "#f8f9fa"
};

const header = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "30px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 5px 0"
};

const subtitle = {
  fontSize: "14px",
  opacity: 0.9,
  margin: 0
};

const logoutBtn = {
  background: "rgba(255, 255, 255, 0.2)",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.3s"
};

const successBox = {
  background: "#d4edda",
  border: "1px solid #c3e6cb",
  color: "#155724",
  padding: "12px 20px",
  borderRadius: "6px",
  margin: "20px 40px 0",
  fontSize: "14px"
};

const mainContent = {
  padding: "40px",
  maxWidth: "1400px",
  margin: "0 auto"
};

const formSection = {
  marginBottom: "50px"
};

const productsSection = {
  marginBottom: "50px"
};

const sectionHeader = {
  marginBottom: "30px"
};

const sectionTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1f1c36",
  margin: "0 0 8px 0"
};

const sectionSubtitle = {
  fontSize: "14px",
  color: "#666",
  margin: 0
};

const formCard = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
};

const formRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "20px"
};

const formCol = {
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
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  boxSizing: "border-box" as const,
  outline: "none",
  transition: "border-color 0.3s",
  fontFamily: "inherit"
};

const textArea = {
  ...input,
  height: "120px",
  resize: "vertical" as const
};

const fileUpload = {
  position: "relative" as const,
  marginBottom: "15px"
};

const fileLabel = {
  display: "block",
  padding: "30px",
  textAlign: "center" as const,
  border: "2px dashed #ddd",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s",
  fontSize: "14px",
  color: "#666"
};

const previewContainer = {
  marginTop: "15px",
  textAlign: "center" as const
};

const previewImage = {
  maxWidth: "200px",
  maxHeight: "200px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  transition: "transform 0.2s"
};

const emptyState = {
  background: "white",
  padding: "60px 30px",
  borderRadius: "12px",
  textAlign: "center" as const,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
};

const emptyStateText = {
  fontSize: "16px",
  color: "#999",
  margin: 0
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px"
};

const productCard = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s, box-shadow 0.3s"
};

const imageContainer = {
  width: "100%",
  height: "200px",
  overflow: "hidden",
  background: "#f0f0f0"
};

const productImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const
};

const cardContent = {
  padding: "16px"
};

const productName = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#1f1c36",
  margin: "0 0 8px 0"
};

const productPrice = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#667eea",
  margin: "0 0 8px 0"
};

const categoryBadge = {
  display: "inline-block",
  background: "#f0e6ff",
  color: "#667eea",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "8px"
};

const productDesc = {
  fontSize: "13px",
  color: "#666",
  margin: "8px 0 0 0",
  lineHeight: "1.4"
};

const actions = {
  marginTop: "12px",
  display: "flex",
  gap: "8px"
};

const deleteBtn = {
  padding: "8px 12px",
  background: "#ff6b6b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const toastSuccess = {
  position: "fixed" as const,
  bottom: "20px",
  right: "20px",
  background: "#d4edda",
  border: "1px solid #c3e6cb",
  color: "#155724",
  padding: "16px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex: 1000,
  animation: "slideIn 0.3s ease-out"
};

const toastError = {
  position: "fixed" as const,
  bottom: "20px",
  right: "20px",
  background: "#f8d7da",
  border: "1px solid #f5c6cb",
  color: "#721c24",
  padding: "16px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex: 1000,
  animation: "slideIn 0.3s ease-out"
};
