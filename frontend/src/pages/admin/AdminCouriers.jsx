import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCouriers() {
  const [couriers, setCouriers] = useState([]);
  const [formData, setFormData] = useState({
    trackingId: "",
    senderName: "",
    receiverName: "",
    address: "",
    courierType: "",
    weight: "",
    status: "Pending",
  });

  // ✅ Fetch Couriers
  const fetchCouriers = async () => {
    try {
      const res = await axios.get("https://courier-management-backend-j4h2.onrender.com/api/couriers");
      setCouriers(res.data);
    } catch (error) {
      console.log("Error fetching couriers", error);
    }
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  // ✅ Add Courier
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://courier-management-backend-j4h2.onrender.com/api/couriers", formData);
      alert("Courier added!");
      fetchCouriers();
    } catch (error) {
      console.log("Error adding courier", error);
    }
  };

  return (
    <div>
      <h2>Courier Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tracking ID"
          onChange={(e) => setFormData({ ...formData, trackingId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Sender Name"
          onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Receiver Name"
          onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        <select onChange={(e) => setFormData({ ...formData, courierType: e.target.value })}>
          <option value="">Select Type</option>
          <option value="Express">Express</option>
          <option value="Standard">Standard</option>
        </select>

        <input
          type="number"
          placeholder="Weight"
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />

        <button type="submit">Add Courier</button>
      </form>

      <h3>All Couriers</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Address</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {couriers.length === 0 ? (
            <tr>
              <td colSpan="7">No couriers found</td>
            </tr>
          ) : (
            couriers.map((c) => (
              <tr key={c._id}>
                <td>{c.trackingId}</td>
                <td>{c.senderName}</td>
                <td>{c.receiverName}</td>
                <td>{c.address}</td>
                <td>{c.courierType}</td>
                <td>{c.weight} kg</td>
                <td>{c.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
