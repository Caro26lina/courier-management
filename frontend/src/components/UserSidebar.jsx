import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/user/login");
  };

  return (
    <div className="sidebar">
      <h2>🚚 Courier System</h2>

      <ul>
        <li><Link to="/user/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/user/couriers">📦 My Couriers</Link></li>
        <li><Link to="/track">🚛 Track Courier</Link></li>
        <li><Link to="/user/profile">👤 Profile</Link></li>
      </ul>

      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}
