import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user-login" replace />; // redirect to login if no token
  }

  return children; // allow access if token exists
}
