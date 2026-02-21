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
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LOGO */}
                <h1
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold text-amber-600 cursor-pointer tracking-wide"
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
                                    `${linkBase} ${isActive ? activeStyle : ""}`
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
                                className="px-6 py-2 rounded-full text-sm font-medium border border-amber-600 hover:bg-amber-600 transition text-amber-600 hover:text-white"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/signup"
                                className="px-6 py-2 rounded-full text-sm font-medium bg-amber-600 text-white hover:bg-transparent hover:text-amber-600 transition border hover:border-amber-600"
                            >
                                Sign up
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 rounded-full text-sm font-medium bg-amber-600 text-white hover:bg-transparent hover:text-amber-600 border hover:border-amber-600 transition cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    className="md:hidden text-2xl cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="flex flex-col px-6 py-6 space-y-5">

                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            className="block w-full py-2 text-gray-700 font-medium hover:text-amber-600 transition"
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/rooms"
                            onClick={() => setOpen(false)}
                            className="block w-full py-2 text-gray-700 font-medium hover:text-amber-600 transition"
                        >
                            Rooms
                        </NavLink>

                        <NavLink
                            to="/booking"
                            onClick={() => setOpen(false)}
                            className="block w-full py-2 text-gray-700 font-medium hover:text-amber-600 transition"
                        >
                            Booking
                        </NavLink>

                        <NavLink
                            to="/services"
                            onClick={() => setOpen(false)}
                            className="block w-full py-2 text-gray-700 font-medium hover:text-amber-600 transition"
                        >
                            Services
                        </NavLink>

                        <NavLink
                            to="/contact"
                            onClick={() => setOpen(false)}
                            className="block w-full py-2 text-gray-700 font-medium hover:text-amber-600 transition"
                        >
                            Contact
                        </NavLink>

                        {/* AUTH SECTION */}
                        <div className="pt-6 border-t border-gray-200 space-y-4">
                            {!isLoggedIn ? (
                                <>
                                    <NavLink
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                        className="block w-full text-center py-2 rounded-full transition border border-amber-600 hover:bg-amber-600 text-amber-600 hover:text-white"
                                    >
                                        Login
                                    </NavLink>

                                    <NavLink
                                        to="/signup"
                                        onClick={() => setOpen(false)}
                                        className="block w-full text-center py-2 rounded-full  transition bg-amber-600 text-white hover:bg-transparent hover:text-amber-600 border hover:border-amber-600"
                                    >
                                        Sign up
                                    </NavLink>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-center py-3 rounded-full bg-amber-600 text-white hover:bg-transparent hover:text-amber-600 border hover:border-amber-600 transition cursor-pointer"
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
