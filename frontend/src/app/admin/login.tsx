import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.access_token);
      router.push("/admin/dashboard");

    } catch {
      alert("Invalid login details");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={card}>
        <h2>Admin Login</h2>

        <input
          style={input}
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button style={btn}>Login</button>
      </form>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f4b6b6"
};

const card = {
  background: "white",
  padding: "40px",
  width: "320px",
  borderRadius: "10px"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#1f1c36",
  color: "white",
  border: "none"
};
