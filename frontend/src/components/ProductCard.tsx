type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image_url: string;
    description: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const phone = "0768475771";
    const message = `Hi, I'm interested in the ${product.name}`;

    return (
        <div style={card}>
            <img src={product.image_url} alt={product.name} style={image} />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><b>{product.category}</b></p>

            <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                target="_blank"
            >
                <button style={btn}>Buy / Book on WhatsApp</button>
            </a>
        </div>
    );
}

const card = {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center" as const,
};

const image = {
    width: "100%",
    height: "250px",
    objectFit: "cover" as const,
    borderRadius: "10px",
    //marginBottom: "15px",
};

const btn = {
    marginTop: "10px",
    padding: "10px",
    background: "#1f1c36",
    color: "white",
    border: "none",
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer"
};