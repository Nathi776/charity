type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image_url: string;
    description: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const phone = "0657272301";
    const message = `Hi, I'm interested in the ${product.name}`;

    return (
        <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
        >
            <div style={card}>
                <div style={imageContainer}>
                    {product.image_url ? (
                        <img
                            src={product.image_url.startsWith("http") ? product.image_url : `https://charity-backend-epoo.onrender.com${product.image_url}`}
                            alt={product.name}
                            style={image}
                        />
                    ) : (
                        <div style={placeholder} aria-hidden>
                            {product.name ? product.name.charAt(0).toUpperCase() : "?"}
                        </div>
                    )}
                </div>

                <div style={content}>
                    <h3 style={name}>{product.name}</h3>
                    <p style={price}>R{parseFloat(String(product.price)).toFixed(2)}</p>
                    <span style={categoryBadge}>{product.category}</span>
                    <p style={description}>{product.description}</p>
                    <button style={btn}>📱 Chat on WhatsApp</button>
                </div>
            </div>
        </a>
    );
}

const card = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const
};

const imageContainer = {
    width: "100%",
    height: "220px",
    overflow: "hidden",
    background: "#f0f0f0"
};

const placeholder = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0e6ff, #f7f2ff)",
    color: "#667eea",
    fontSize: "32px",
    fontWeight: "700"
};

const image = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "transform 0.3s"
};

const content = {
    padding: "16px",
    display: "flex",
    flexDirection: "column" as const,
    flex: 1
};

const name = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1f1c36",
    margin: "0 0 8px 0"
};

const price = {
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
    marginBottom: "8px",
    width: "fit-content"
};

const description = {
    fontSize: "13px",
    color: "#666",
    margin: "0 0 12px 0",
    lineHeight: "1.4",
    flex: 1
};

const btn = {
    padding: "10px 16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "transform 0.2s"
};