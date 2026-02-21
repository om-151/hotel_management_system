import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import loginBG from "../assets/login-bg.jpg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AdminLogin = () => {
  const { loginAdmin } = useAdminAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ===== VALIDATION =====
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await loginAdmin(formData);
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          `url(${loginBG})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

          {/* Logo / Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              Admin Login
            </h1>
            <p className="text-sm text-gray-200 mt-2">
              Secure access to hotel management dashboard
            </p>
          </div>

          {errors.general && (
            <div className="my-4 text-2xl text-red-500 font-semibold text-center">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border 
                ${errors.email ? "border-red-400" : "border-white/30"} 
                focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition`}
                placeholder="Enter admin email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm mb-2 text-gray-200">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border
    ${errors.password ? "border-red-400" : "border-white/30"}
    focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition`}
                placeholder="Enter password"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-gray-300 hover:text-amber-600 transition cursor-pointer"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>

              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 py-3 rounded-xl font-semibold shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-gray-300 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/admin/signup"
              className="text-amber-600 font-medium hover:underline"
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