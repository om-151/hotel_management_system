import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminLogin = () => {
  const { loginAdmin } = useAdminAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(formData);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-indigo-600 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Hotel Management
        </h1>
        <p className="text-lg opacity-90">
          Admin Control Panel
        </p>
        <p className="mt-6 text-sm opacity-80">
          Manage rooms, bookings, customers and revenue from one place.
        </p>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center bg-slate-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Sign in to your admin account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              className="w-full border px-4 py-2.5 rounded-lg
              focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border px-4 py-2.5 rounded-lg
              focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={handleChange}
              required
            />

            <button
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg
              hover:bg-indigo-700 transition font-medium"
            >
              Login
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an admin account?{" "}
            <Link
              to="/admin/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
