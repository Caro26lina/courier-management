// src/pages/UserCouriers.jsx
import { useEffect, useState } from "react";
import API from "../api/api";

export default function UserCouriers() {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/courier/myCouriers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCouriers(res.data || []);
      } catch (err) {
        alert("Failed to fetch couriers.");
      }
    };

    fetchCouriers();
  }, []);

  const getStatusStep = (status) => {
    const steps = ["Pending", "Shipped", "In Transit", "Delivered"];
    return steps.indexOf(status);
  };

  return (
    <div style={styles.container}>
      {/* Animated Gradient Background Circles */}
      <div style={styles.backgroundElements}>
        <div style={{ ...styles.circle, ...styles.circle1 }} />
        <div style={{ ...styles.circle, ...styles.circle2 }} />
        <div style={{ ...styles.circle, ...styles.circle3 }} />
      </div>

      <div style={styles.card}>
        <h1 style={styles.heading}>📦 My Couriers</h1>

        {couriers.length === 0 ? (
          <p style={styles.noData}>No couriers found yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tracking ID</th>
                <th style={styles.th}>Sender</th>
                <th style={styles.th}>Receiver</th>
                <th style={styles.th}>Courier Type</th>
                <th style={styles.th}>Weight (kg)</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {couriers.map((c) => (
                <tr key={c._id}>
                  <td style={styles.td}>{c.trackingId}</td>
                  <td style={styles.td}>{c.senderName}</td>
                  <td style={styles.td}>{c.receiverName}</td>
                  <td style={styles.td}>{c.courierType}</td>
                  <td style={styles.td}>{c.weight}</td>
                  <td style={styles.td}>{c.status}</td>

                  <td style={styles.td}>
                    <button
                      style={styles.trackBtn}
                      onClick={() => setSelectedCourier(c)}
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* POPUP TIMELINE */}
        {selectedCourier && (
          <div style={styles.popupOverlay}>
            <div style={styles.popup}>
              <h2 style={{ color: "#fff" }}>🚚 Tracking Status</h2>
              <p style={{ color: "#fff" }}>
                <b>Tracking ID:</b> {selectedCourier.trackingId}
              </p>

              <div style={styles.timelineContainer}>
                {["Pending", "Shipped", "In Transit", "Delivered"].map(
                  (step, index) => (
                    <div key={index} style={styles.timelineStep}>
                      <div
                        style={{
                          ...styles.circleStep,
                          backgroundColor:
                            index <= getStatusStep(selectedCourier.status)
                              ? "#00b0ff"
                              : "#4f5b62",
                        }}
                      ></div>
                      <p style={styles.timelineText}>{step}</p>
                    </div>
                  )
                )}
              </div>

              <button
                style={styles.closeBtn}
                onClick={() => setSelectedCourier(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw", // ✅ full width applied
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  },

  backgroundElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
  },

  circle: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: "0.7",
  },

  circle1: { width: "350px", height: "350px", background: "#4f46e5", top: "-60px", left: "-80px" },
  circle2: { width: "300px", height: "300px", background: "#9333ea", bottom: "-70px", right: "-60px" },
  circle3: { width: "250px", height: "250px", background: "#3b82f6", top: "60%", left: "32%" },

  card: {
    width: "90%",
    maxWidth: "1100px",
    background: "rgba(255,255,255,0.12)",
    padding: "30px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    color: "white",
    zIndex: 2,
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },

  heading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    backgroundColor: "rgba(55, 75, 174, 0.57)",
    padding: "12px",
    color: "white",
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
  },

  trackBtn: {
    background: "#38bdf8",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  noData: {
    textAlign: "center",
    fontSize: "18px",
  },

  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    background: "rgba(0,0,0,0.9)",
    padding: "25px",
    borderRadius: "14px",
    textAlign: "center",
    width: "380px",
    color: "white",
  },

  timelineContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
  },

  timelineStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  circleStep: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
  },

  timelineText: {
    marginTop: "6px",
    fontSize: "14px",
  },

  closeBtn: {
    marginTop: "18px",
    padding: "8px 14px",
    background: "red",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
