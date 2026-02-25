import { useAdminAuth } from "../context/AdminAuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const DashboardHeader = ({ setIsOpen }) => {
    const { admin, logoutAdmin } = useAdminAuth();
    const btnRef = useRef(null);
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname.split("/").pop();

        if (!path || path === "admin") return "Overview";

        return path
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleMouseEnter = (e) => {
        const btn = btnRef.current;
        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = btn.querySelector(".ripple");

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.remove("scale-0");
        ripple.classList.add("scale-[15]");
    };

    const handleMouseLeave = () => {
        const ripple = btnRef.current.querySelector(".ripple");
        ripple.classList.remove("scale-[15]");
        ripple.classList.add("scale-0");
    };

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
            <div className="flex items-center justify-between px-6 py-4">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                    >
                        ☰
                    </button>

                    <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                        {getPageTitle()}
                    </h2>
                </div>

                {/* Right */}
                <div className="flex items-center gap-5">

                    {/* Admin Info */}
                    <div className="flex flex-col text-right">
                        <span className="text-sm font-medium text-gray-900 capitalize">
                            {admin ? admin.name : "Admin"}
                        </span>
                        <span className="text-xs text-gray-500">
                            {admin ? admin.email : "admin@gmail.com"}
                        </span>
                    </div>

                    {/* Avatar */}
                    <FaUserCircle className="hidden md:block w-10 h-10 text-gray-500" />

                    {/* Logout */}
                    <button
                        ref={btnRef}
                        onClick={logoutAdmin}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="relative overflow-hidden flex items-center gap-2 px-6 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg cursor-pointer transition-colors duration-300 hover:text-white"
                    >
                        {/* Ripple Background */}
                        <span className="ripple absolute w-10 h-10 bg-amber-600 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-700 ease-out"></span>

                        <span className="relative z-10">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
