import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("adminToken") || null
    );
    const [loading, setLoading] = useState(true);

    // Auto load admin on refresh
    useEffect(() => {
        if (token) {
            const storedAdmin = localStorage.getItem("adminProfile");
            if (storedAdmin) {
                setAdmin(JSON.parse(storedAdmin));
            }
        }
        setLoading(false);
    }, [token]);

    // LOGIN
    const loginAdmin = async (formData) => {
        const res = await API.post("/auth/login", formData);

        localStorage.setItem("adminToken", res.data.token);

        // ✅ store admin profile
        localStorage.setItem(
            "adminProfile",
            JSON.stringify({
                _id: res.data.admin._id,
                name: res.data.admin.name,
                email: res.data.admin.email,
            })
        );

        setToken(res.data.token);
        setAdmin(res.data.admin); // no change in flow
    };

    // SIGNUP
    const signupAdmin = async (formData) => {
        const res = await API.post("/auth/signup", formData);
        return res.data;
    };

    // LOGOUT
    const logoutAdmin = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminProfile"); // ✅ important
        setToken(null);
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider
            value={{
                admin,
                token,
                loginAdmin,
                signupAdmin,
                logoutAdmin,
                loading,
            }}
        >
            {!loading && children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
