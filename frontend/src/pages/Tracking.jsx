import { useState } from "react";
import API from "../api/api";

export default function TrackCourier() {
  const [trackingId, setTrackingId] = useState("");
  const [courier, setCourier] = useState(null);

  const trackCourier = async () => {
    try {
      const res = await API.get(`/courier/track/${trackingId}`);
      setCourier(res.data);
    } catch (err) {
      alert("Invalid Tracking ID");
      setCourier(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>🚚 Track Courier</h1>
      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button onClick={trackCourier}>Track</button>

      {courier && (
        <div>
          <h2>Courier Details</h2>
          <p><b>Tracking ID:</b> {courier.trackingId}</p>
          <p><b>Status:</b> {courier.status}</p>
          <p><b>Sender:</b> {courier.senderName}</p>
          <p><b>Receiver:</b> {courier.receiverName}</p>
        </div>
      )}
    </div>
  );
}
