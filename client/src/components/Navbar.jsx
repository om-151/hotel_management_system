import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setOpen(false);
    };

    const linkBase =
        "relative font-medium text-gray-700 hover:text-amber-600 transition";

    const activeStyle =
        "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-amber-600";

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">

            <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl">

                <div className="px-8 py-4 flex items-center justify-between">

                    {/* LOGO */}
                    <h1
                        onClick={() => navigate("/")}
                        className="text-2xl font-semibold text-amber-600 cursor-pointer tracking-wide"
                    >
                        Maricuot
                    </h1>

                    {/* DESKTOP LINKS */}
                    <ul className="hidden md:flex items-center gap-10">
                        {["/", "/rooms", "/booking", "/services", "/contact"].map(
                            (path, index) => (
                                <NavLink
                                    key={index}
                                    to={path}
                                    className={({ isActive }) =>
                                        `relative text-gray-700 font-medium transition hover:text-amber-600 ${isActive
                                            ? "text-amber-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-amber-600"
                                            : ""
                                        }`
                                    }
                                >
                                    {path === "/"
                                        ? "Home"
                                        : path.replace("/", "").charAt(0).toUpperCase() +
                                        path.slice(2)}
                                </NavLink>
                            )
                        )}
                    </ul>

                    {/* RIGHT AUTH BUTTONS */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-6 py-2 rounded-full text-sm font-medium border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition duration-300"
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    className="px-6 py-2 rounded-full text-sm font-medium bg-amber-600 text-white hover:bg-amber-500 transition duration-300"
                                >
                                    Sign up
                                </NavLink>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 rounded-full text-sm font-medium bg-amber-600 text-white hover:bg-amber-500 transition duration-300 cursor-pointer"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="md:hidden text-2xl cursor-pointer text-gray-700"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden mt-4 backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl overflow-hidden">
                    <div className="flex flex-col px-6 py-6 space-y-5">

                        {["/", "/rooms", "/booking", "/services", "/contact"].map(
                            (path, index) => (
                                <NavLink
                                    key={index}
                                    to={path}
                                    onClick={() => setOpen(false)}
                                    className="block w-full py-2 text-gray-700 font-medium hover:text-amber-600 transition"
                                >
                                    {path === "/"
                                        ? "Home"
                                        : path.replace("/", "").charAt(0).toUpperCase() +
                                        path.slice(2)}
                                </NavLink>
                            )
                        )}

                        <div className="pt-6 border-t border-gray-200 space-y-4">
                            {!isLoggedIn ? (
                                <>
                                    <NavLink
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                        className="block w-full text-center py-2 rounded-full border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition"
                                    >
                                        Login
                                    </NavLink>

                                    <NavLink
                                        to="/signup"
                                        onClick={() => setOpen(false)}
                                        className="block w-full text-center py-2 rounded-full bg-amber-600 text-white hover:bg-amber-500 transition"
                                    >
                                        Sign up
                                    </NavLink>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-center py-3 rounded-full bg-amber-600 text-white hover:bg-amber-500 transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
