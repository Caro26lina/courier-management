// src/pages/UserLogin.jsx
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/user/login", { email, password });

      const { token, user } = res.data;

      if (!token || !user) {
        alert("❌ Login Failed — unexpected server response.");
        return;
      }

      if (user.role !== "user") {
        alert("Not a User Account!");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user._id);

      alert("✅ User Login Successful");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "❌ Login Failed, check credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={{ ...styles.circle, ...styles.circle1 }}></div>
        <div style={{ ...styles.circle, ...styles.circle2 }}></div>
        <div style={{ ...styles.circle, ...styles.circle3 }}></div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>User Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
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

        <p style={styles.text}>
          Don't have an account?{" "}
          <a href="/user/register" style={styles.link}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw", // ✅ full width background
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  circle: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: "0.7",
  },

  circle1: {
    width: "350px",
    height: "350px",
    background: "#4f46e5",
    top: "-80px",
    left: "-60px",
    animation: "floating 6s infinite linear alternate",
  },

  circle2: {
    width: "300px",
    height: "300px",
    background: "#9333ea",
    bottom: "-80px",
    right: "-70px",
    animation: "floating 8s infinite linear alternate",
  },

  circle3: {
    width: "250px",
    height: "250px",
    background: "#3b82f6",
    top: "60%",
    left: "30%",
    animation: "floating 7s infinite linear alternate",
  },

  card: {
    width: "380px",
    background: "rgba(255, 255, 255, 0.12)",
    padding: "30px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    zIndex: 2,
    textAlign: "center",
  },

  title: {
    color: "white",
    fontSize: "26px",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    outline: "none",
    border: "none",
    fontSize: "16px",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#6366f1",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  text: {
    marginTop: "12px",
    fontSize: "14px",
    color: "white",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
