import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import signupBG from "../assets/signup-bg.jpg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AdminSignup = () => {
    const { signupAdmin } = useAdminAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    // ===== VALIDATION =====
    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

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
            await signupAdmin(formData);
        } catch (err) {
            setErrors({
                general: err.response?.data?.message || "Signup failed",
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
                    `url(${signupBG})`, // use your local image here
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">
                            Create Admin Account
                        </h1>
                        <p className="text-sm text-gray-200 mt-2">
                            Register a new administrator
                        </p>
                    </div>

                    {errors.general && (
                        <div className="mb-4 text-sm text-red-400 text-center">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm mb-2 text-gray-200">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl bg-white/10 border
                ${errors.name ? "border-red-400" : "border-white/30"}
                focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition`}
                                placeholder="Enter admin name"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

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
                                placeholder="Create password"
                            />

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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 py-3 rounded-xl font-semibold shadow-lg disabled:opacity-70 cursor-pointer"
                        >
                            {loading ? "Creating Account..." : "Create Admin"}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-300 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/admin/login"
                            className="text-amber-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;