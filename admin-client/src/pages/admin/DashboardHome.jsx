const DashboardHome = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            {/* Top Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-5">
                <h1 className="text-xl font-semibold text-slate-900">
                    Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                    Administrative overview
                </p>
            </header>

            <main className="px-8 py-8 space-y-8">
                {/* Metrics */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Metric label="Total Users" value="1,284" />
                    <Metric label="Active Bookings" value="356" />
                    <Metric label="Monthly Revenue" value="₹6,42,500" />
                    <Metric label="Pending Reviews" value="12" />
                </section>

                {/* Data Sections */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Activity Table */}
                    <div className="xl:col-span-2 bg-white border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
                                Recent Activity
                            </h2>
                        </div>

                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-slate-200">
                                {[
                                    "New user registration",
                                    "Booking confirmed (#3942)",
                                    "Room pricing updated",
                                    "Payment processed",
                                    "Admin role modified",
                                ].map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 text-slate-700">
                                            {item}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-right">
                                            {idx + 1}h ago
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* System Panel */}
                    <div className="bg-white border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
                                System Controls
                            </h2>
                        </div>

                        <div className="p-6 space-y-3">
                            <ActionButton>Manage Users</ActionButton>
                            <ActionButton>View Bookings</ActionButton>
                            <ActionButton primary>System Settings</ActionButton>
                        </div>
                    </div>
                </section>

                {/* Summary Table */}
                <section className="bg-white border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
                            Latest Bookings
                        </h2>
                    </div>

                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Booking ID</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {[
                                ["#3942", "Rahul Sharma", "Confirmed", "₹18,000"],
                                ["#3941", "Neha Patel", "Pending", "₹12,500"],
                                ["#3940", "Aman Verma", "Completed", "₹22,000"],
                            ].map((row, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4">{row[0]}</td>
                                    <td className="px-6 py-4">{row[1]}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-block rounded border px-2 py-0.5 text-xs">
                                            {row[2]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {row[3]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

/* Small reusable components */

const Metric = ({ label, value }) => (
    <div className="bg-white border border-slate-200 p-6">
        <p className="text-xs uppercase tracking-wide text-slate-500">
            {label}
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
            {value}
        </p>
    </div>
);

const ActionButton = ({ children, primary }) => (
    <button
        className={`w-full text-sm px-4 py-2 border transition
            ${
                primary
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
    >
        {children}
    </button>
);

export default DashboardHome;
