// src/pages/UserDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div style={styles.container}>
      {/* ✅ Background floating effects */}
      <div style={styles.backgroundElements}>
        <div style={{ ...styles.circle, ...styles.circle1 }}></div>
        <div style={{ ...styles.circle, ...styles.circle2 }}></div>
        <div style={{ ...styles.circle, ...styles.circle3 }}></div>
      </div>

      <div style={styles.wrapper}>
        <h1 style={styles.heading}>🚚 User Dashboard</h1>
        <p style={styles.subtext}>
          Welcome back, <strong>{userEmail}</strong>
        </p>

        <div style={styles.grid}>
          <div style={styles.card} onClick={() => navigate("/add-courier")}>
            <h2>➕ Add Courier</h2>
            <p>Create a new courier request</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/user/couriers")}>
            <h2>📦 My Couriers</h2>
            <p>View your courier history</p>
          </div>
        </div>

        {/* ✅ Logout */}
        <button
          style={styles.logoutButton}
          onClick={() => {
            localStorage.clear();
            navigate("/user/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",                      // ✅ full width background
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    fontFamily: "Arial, sans-serif",
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
    background: "#6366f1",
    top: "-100px",
    left: "-70px",
    animation: "floating 6s infinite linear alternate",
  },

  circle2: {
    width: "300px",
    height: "300px",
    background: "#9333ea",
    bottom: "-90px",
    right: "-70px",
    animation: "floating 7s infinite linear alternate",
  },

  circle3: {
    width: "250px",
    height: "250px",
    background: "#3b82f6",
    top: "60%",
    left: "35%",
    animation: "floating 8s infinite linear alternate",
  },

  wrapper: {
    width: "80%",
    maxWidth: "900px",
    background: "rgba(255, 255, 255, 0.13)", // ✅ glass effect
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
    zIndex: 2,
  },

  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
  },

  subtext: {
    fontSize: "18px",
    marginBottom: "35px",
    color: "#dbeafe",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.2)",
    padding: "22px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    backdropFilter: "blur(6px)",
    boxShadow: "0px 4px 15px rgba(255,255,255,0.15)",
  },

  logoutButton: {
    marginTop: "40px",
    padding: "12px 25px",
    background: "#ef4444",
    border: "none",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
