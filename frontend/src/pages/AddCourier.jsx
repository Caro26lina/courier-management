// src/pages/AddCourier.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function AddCourier() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
    courierType: "",
    weight: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        weight: Number(form.weight),
      };

      const token = localStorage.getItem("token");

      await API.post("/courier/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Courier Added Successfully!");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("❌ Courier Add Error:", err.response?.data || err);
      alert(err.response?.data?.message || "❌ Error while adding courier.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Floating background UI */}
      <div style={styles.backgroundElements}>
        <div style={{ ...styles.circle, ...styles.circle1 }}></div>
        <div style={{ ...styles.circle, ...styles.circle2 }}></div>
        <div style={{ ...styles.circle, ...styles.circle3 }}></div>
      </div>

      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>📦 Add Courier</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input required name="senderName" placeholder="Sender Name" value={form.senderName} onChange={handleChange} />
          <input required name="senderAddress" placeholder="Sender Address" value={form.senderAddress} onChange={handleChange} />
          <input required name="receiverName" placeholder="Receiver Name" value={form.receiverName} onChange={handleChange} />
          <input required name="receiverAddress" placeholder="Receiver Address" value={form.receiverAddress} onChange={handleChange} />
          <input required name="courierType" placeholder="Courier Type (Normal / Express)" value={form.courierType} onChange={handleChange} />
          <input required name="weight" type="number" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} />

          <button type="submit" style={styles.button}>Add Courier</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    fontFamily: "Arial, sans-serif",
  },

  backgroundElements: {
    position: "absolute",
    inset: 0,
  },

  circle: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: "0.7",
  },

  circle1: {
    width: "300px",
    height: "300px",
    background: "#6366f1",
    top: "-80px",
    left: "-70px",
    animation: "floating 7s infinite alternate",
  },

  circle2: {
    width: "260px",
    height: "260px",
    background: "#9333ea",
    bottom: "-70px",
    right: "-60px",
    animation: "floating 8s infinite alternate",
  },

  circle3: {
    width: "240px",
    height: "240px",
    background: "#3b82f6",
    top: "60%",
    left: "35%",
    animation: "floating 6s infinite alternate",
  },

  formWrapper: {
    width: "400px",
    background: "rgba(255, 255, 255, 0.15)",
    padding: "35px",
    borderRadius: "18px",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    zIndex: 2,
  },

  heading: {
    color: "white",
    fontSize: "28px",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  button: {
    padding: "12px",
    background: "#3b82f6",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    fontSize: "16px",
  },
};
