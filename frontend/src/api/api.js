import axios from "axios";

// ✅ Dynamic base URL — works for both local & deployed builds
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "https://courier-management-backend-j4h2.onrender.com/api",
});

// ✅ Automatically attach JWT token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
