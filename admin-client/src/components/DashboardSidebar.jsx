import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    BuildingOffice2Icon,
    CalendarDaysIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition
     ${isActive
            ? "bg-amber-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`;

    const closeOnMobile = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };

    const iconClass = "w-5 h-5";

    return (
        <>
            {/* Overlay (Mobile) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 z-40
    h-screen w-72 shrink-0
    bg-white border-r border-gray-200
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                {/* Brand */}
                <div className="px-6 py-3 border-b border-gray-200">
                    <h1 className="text-2xl font-bold tracking-tight text-amber-600">
                        Maricuot Admin
                    </h1>
                    <p className="text-xs text-gray-500">
                        Hotel management system
                    </p>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 space-y-2">

                    <NavLink
                        to="/admin/dashboard"
                        end
                        className={linkClasses}
                        onClick={closeOnMobile}
                    >
                        <HomeIcon className={iconClass} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/dashboard/rooms"
                        className={linkClasses}
                        onClick={closeOnMobile}
                    >
                        <BuildingOffice2Icon className={iconClass} />
                        Rooms
                    </NavLink>

                    <NavLink
                        to="/admin/dashboard/bookings"
                        className={linkClasses}
                        onClick={closeOnMobile}
                    >
                        <CalendarDaysIcon className={iconClass} />
                        Bookings
                    </NavLink>

                    <NavLink
                        to="/admin/dashboard/users"
                        className={linkClasses}
                        onClick={closeOnMobile}
                    >
                        <UsersIcon className={iconClass} />
                        Users
                    </NavLink>

                </nav>
            </aside>
        </>
    );
};

export default DashboardSidebar;
