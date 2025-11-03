import React, { useEffect, useState } from "react";
import API from "../../api/api";

export default function AdminDashboard() {
  const [couriers, setCouriers] = useState([]);

  const fetchCouriers = async () => {
    try {
      const res = await API.get("/courier/admin/all");
      console.log("📦 Admin Couriers Data:", res.data);
      setCouriers(res.data.couriers);
    } catch (err) {
      console.error("❌ Error fetching couriers:", err);
      alert("Unauthorized: Login as Admin!");
    }
  };

  const editCourier = async (id) => {
    const updatedReceiver = prompt("Enter updated receiver name:");
    if (!updatedReceiver) return;

    try {
      await API.put(`/courier/update/${id}`, { receiverName: updatedReceiver });
      alert("✅ Courier updated successfully!");
      fetchCouriers();
    } catch (err) {
      console.error("❌ Error updating courier:", err);
    }
  };

  const deleteCourier = async (id) => {
    try {
      await API.delete(`/courier/delete/${id}`);
      alert("🗑 Deleted successfully!");
      fetchCouriers();
    } catch (err) {
      console.error("❌ Error deleting courier:", err);
    }
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📦 Admin Courier Dashboard</h2>
        <p style={styles.subtitle}>Manage courier records efficiently</p>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {couriers.length > 0 ? (
              couriers.map((c) => (
                <tr key={c._id}>
                  <td>{c.trackingId}</td>
                  <td>{c.senderName}</td>
                  <td>{c.receiverName}</td>
                  <td>{c.courierType}</td>
                  <td>{c.weight} kg</td>
                  <td>
                    <button style={styles.editBtn} onClick={() => editCourier(c._id)}>✏ Edit</button>
                    <button style={styles.deleteBtn} onClick={() => deleteCourier(c._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>No couriers found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ✅ UI Styles
const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #0f172a, #312e81, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  card: {
    width: "90%",
    maxWidth: "1200px",
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.4)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#c7d2fe",
    marginBottom: "25px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "rgba(255, 255, 255, 0.18)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  editBtn: {
    background: "#2563eb",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc2626",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// Style animation for table rows
const animation = document.createElement("style");
animation.innerHTML = `
table thead tr {
  background: rgba(0,0,0,0.4);
  color: white;
}
tbody tr:hover {
  background: rgba(255,255,255,0.2);
  transition: 0.3s;
}
tbody td {
  text-align: center;
  padding: 10px;
  color: white;
}
thead th {
  padding: 12px;
}
`;
document.head.appendChild(animation);
