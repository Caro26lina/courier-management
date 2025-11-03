// src/pages/UserRegister.jsx
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [username, setUsername] = useState(""); // ✅ updated
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password });

      alert("✅ Registration Successful, Now Login");
      navigate("/user/login");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Registration Failed, Try again");
      console.error("REGISTER ERROR:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundElements}>
        <div style={{ ...styles.circle, ...styles.circle1 }}></div>
        <div style={{ ...styles.circle, ...styles.circle2 }}></div>
        <div style={{ ...styles.circle, ...styles.circle3 }}></div>
      </div>

      {/* Register Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

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
            Register
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <a href="/user/login" style={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw", // ✅ ensures full width gradient background
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
    top: "-70px",
    left: "-60px",
    animation: "floating 6s infinite linear alternate",
  },

  circle2: {
    width: "300px",
    height: "300px",
    background: "#9333ea",
    bottom: "-80px",
    right: "-50px",
    animation: "floating 7s infinite linear alternate",
  },

  circle3: {
    width: "250px",
    height: "250px",
    background: "#3b82f6",
    top: "65%",
    left: "25%",
    animation: "floating 8s infinite linear alternate",
  },

  card: {
    width: "400px",
    background: "rgba(255, 255, 255, 0.15)",
    padding: "32px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    zIndex: 10,
    textAlign: "center",
  },

  title: {
    color: "white",
    fontSize: "28px",
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
