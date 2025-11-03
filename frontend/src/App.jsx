import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserCouriers from "./pages/UserCouriers";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import Tracking from "./pages/Tracking";
import AddCourier from "./pages/AddCourier";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCouriers from "./pages/admin/AdminCouriers";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfile from "./pages/admin/AdminProfile";
import EditCourier from "./pages/admin/EditCourier";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* ✅ Protected Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/track"
        element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        }
      />

      <Route path="/user/couriers" element={<ProtectedRoute><UserCouriers /></ProtectedRoute>} />
      <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

      <Route path="/add-courier" element={<AddCourier />} />
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/couriers" element={<AdminCouriers />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/edit/:id" element={<EditCourier />} />
    </Routes>
  );
}
