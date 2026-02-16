import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminSignup = () => {
    const { signupAdmin } = useAdminAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupAdmin(formData);
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Create Admin Account
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Admin Name"
                        className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        required
                    />

                    <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700">
                        Create Admin
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/admin/login"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminSignup;
