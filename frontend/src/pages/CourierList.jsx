import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CourierList() {
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courier/getAll")
      .then((res) => setCouriers(res.data));
  }, []);

  const deleteCourier = async (id) => {
    await axios.delete(`http://localhost:5000/api/courier/delete/${id}`);
    alert("Courier Deleted ❌");

    setCouriers(couriers.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h2>All Couriers</h2>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {couriers.map((c) => (
            <tr key={c._id}>
              <td>{c.senderName}</td>
              <td>{c.receiverName}</td>
              <td>{c.address}</td>
              <td>{c.status}</td>

              <td>
                <Link to={`/courier/edit/${c._id}`}>✏ Edit</Link>
                <button onClick={() => deleteCourier(c._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
