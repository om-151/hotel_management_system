import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    // 🔹 Validation Function
    const validate = () => {
        let newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const res = await API.post("/user/auth/login", {
                email,
                password,
            });

            login(res.data.token);

            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
                confirmButtonColor: "#111827",
            });

            navigate("/");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error?.response?.data?.message || "Something went wrong",
                confirmButtonColor: "#111827",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            {/* LEFT IMAGE SECTION */}
            <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    alt="hotel"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#4B9DA9]/20"></div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#7bd6e43b] via-white to-[#7bd6e42e] px-6 py-12">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 mb-8">
                        Sign in to continue
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={`mt-2 w-full px-4 py-3 rounded-xl border 
              ${errors.email ? "border-red-500" : "border-gray-300"}
              focus:ring-2 focus:ring-[#4B9DA9]/30 focus:border-[#4B9DA9] 
              outline-none transition`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative mt-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-3 rounded-xl border pr-12
                ${errors.password ? "border-red-500" : "border-gray-300"}
                focus:ring-2 focus:ring-[#4B9DA9]/30 focus:border-[#4B9DA9] 
                outline-none transition`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#3c8792] transition cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl text-white font-medium 
                       bg-[#4B9DA9] hover:bg-[#3c8792] 
                       active:scale-[0.98] transition-all duration-200 
                       disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#3c8792] font-medium hover:underline transition"
                        >
                            Create account
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;