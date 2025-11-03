import React, { useState } from "react";
import API from "../api/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/admin/login", {
        email,
        password,
      });

      console.log("✅ Admin Login Success:", response.data);

      saveAuth(response.data.token, response.data.role);

      alert("Admin Login Successful ✅");

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Invalid Admin Credentials!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Admin Login</h2>
        <p style={styles.subtitle}>Secure access for administrators only</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Admin Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  },
  card: {
    width: "420px",
    background: "rgba(255, 255, 255, 0.15)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(25px)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    animation: "fadeIn 0.8s ease-in-out",
  },
  title: {
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#c7d2fe",
    fontSize: "16px",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  input: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "14px",
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
};

// Animation
const animation = document.createElement("style");
animation.innerHTML = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(25px); }
  100% { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(animation);
