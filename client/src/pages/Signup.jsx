import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await API.post("/user/auth/signup", {
                name,
                email,
                password,
            });

            login(res.data.token);
            alert("Account created successfully ✅");

            navigate("/");

        } catch (error) {
            alert(
                error?.response?.data?.message ||
                "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT BRAND SECTION */}
            <div className="hidden lg:flex flex-col justify-center px-16 bg-amber-600 text-white">
                <h1 className="text-4xl font-bold mb-4">
                    Create Your Account
                </h1>
                <p className="text-lg opacity-90 max-w-md">
                    Join our hotel management platform and manage everything in one place.
                </p>

                <div className="mt-12 border-l-4 border-white pl-6 text-sm opacity-90">
                    Fast Setup • Secure Access • Professional Tools
                </div>
            </div>

            {/* RIGHT SIGNUP SECTION */}
            <div className="flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-md">

                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                        Sign up
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Create an account to get started
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-7">

                        {/* Name */}
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 focus:border-amber-600 outline-none"
                            />
                            <label className="absolute left-0 top-3 text-gray-500 transition-all
                                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-amber-600
                                peer-valid:-top-3 peer-valid:text-sm">
                                Full name
                            </label>
                        </div>

                        {/* Email */}
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

                        {/* Password */}
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

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 rounded-md bg-amber-600 py-3 text-white font-medium hover:bg-amber-700 transition disabled:opacity-70"
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <span className="text-amber-600 cursor-pointer hover:underline">
                            Sign in
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Signup;
