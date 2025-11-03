import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourier() {
  const { id } = useParams();       // Get ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trackingId: "",
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
    courierType: "",
    weight: "",
    status: "Pending",
  });

  // Fetch courier by ID
  const getCourier = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courier/${id}`);
      setFormData(res.data);   // ✅ Directly set returned data
    } catch (error) {
      console.error("Error fetching courier:", error);
    }
  };

  useEffect(() => {
    getCourier();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated courier
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/courier/${id}`, formData);
      alert("✅ Courier Updated Successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error updating courier:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Courier</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Tracking ID</label>
        <input name="trackingId" value={formData.trackingId} readOnly />

        <label>Sender Name</label>
        <input name="senderName" value={formData.senderName} onChange={handleChange} />

        <label>Sender Address</label>
        <textarea
          name="senderAddress"
          value={formData.senderAddress}
          onChange={handleChange}
        />

        <label>Receiver Name</label>
        <input name="receiverName" value={formData.receiverName} onChange={handleChange} />

        <label>Receiver Address</label>
        <textarea
          name="receiverAddress"
          value={formData.receiverAddress}
          onChange={handleChange}
        />

        <label>Courier Type</label>
        <select name="courierType" value={formData.courierType} onChange={handleChange}>
          <option value="Normal">Normal</option>
          <option value="Express">Express</option>
        </select>

        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button type="submit" style={styles.button}>Update Courier</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f7f9fc",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.15)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
