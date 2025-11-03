import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Courier Management System
        </h1>

        <button
          onClick={() => navigate("/admin-login")}
          className="w-full bg-red-500 text-white py-2 rounded-md mb-4 hover:bg-red-600 transition"
        >
          Admin Login
        </button>

        <button
          onClick={() => navigate("/user/login")}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          User Login
        </button>
      </div>
    </div>
  );
}
