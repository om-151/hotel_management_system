import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
            <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setIsOpen={setIsOpen} />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
