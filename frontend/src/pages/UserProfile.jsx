import { useState, useEffect } from "react";
import API from "../api/api";
import UserSidebar from "../components/UserSidebar";

export default function UserProfile() {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username"),
      email: localStorage.getItem("userEmail"),
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    await API.put("/auth/update", user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("✅ Profile Updated Successfully!");
  };

  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />

      <div style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
        <h1>👤 Update Profile</h1>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter Name"
            required
          />
          <input type="email" value={user.email} disabled />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
