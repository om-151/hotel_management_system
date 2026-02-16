import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await API.post("/user/auth/login", {
                email,
                password,
            });

            login(res.data.token); // 🔥 THIS triggers Navbar instantly
            alert("Login successful ✅");
            navigate("/");

        } catch (error) {
            alert(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT BRAND SECTION */}
            <div className="hidden lg:flex flex-col justify-center px-16 bg-amber-600 text-white">
                <h1 className="text-4xl font-bold mb-4">
                    Hotel Management System
                </h1>
                <p className="text-lg opacity-90 max-w-md">
                    Manage bookings, rooms, and guests efficiently with a modern dashboard.
                </p>

                <div className="mt-12 border-l-4 border-white pl-6 text-sm opacity-90">
                    Secure • Reliable • Professional
                </div>
            </div>

            {/* RIGHT LOGIN SECTION */}
            <div className="flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-md">

                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                        Sign in
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Enter your credentials to continue
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-7">

                        {/* Email Field */}
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 focus:border-amber-600 outline-none"
                            />
                            <label className="absolute left-0 top-3 text-gray-500 transition-all
                                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-amber-600
                                peer-valid:-top-3 peer-valid:text-sm">
                                Email address
                            </label>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 focus:border-amber-600 outline-none"
                            />
                            <label className="absolute left-0 top-3 text-gray-500 transition-all
                                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-amber-600
                                peer-valid:-top-3 peer-valid:text-sm">
                                Password
                            </label>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span className="cursor-pointer hover:text-amber-600">
                                Forgot password?
                            </span>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 rounded-md bg-amber-600 py-3 text-white font-medium hover:bg-amber-700 transition disabled:opacity-70"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <span className="text-amber-600 cursor-pointer hover:underline">
                            Create account
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
