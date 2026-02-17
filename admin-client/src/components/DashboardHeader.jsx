import { useAdminAuth } from "../context/AdminAuthContext";
import { FaUserCircle } from "react-icons/fa";

const DashboardHeader = ({ setIsOpen }) => {
    const { admin, logoutAdmin } = useAdminAuth();

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
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
                        Dashboard
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
                        onClick={logoutAdmin}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
