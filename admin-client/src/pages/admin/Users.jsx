import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../api/axios";
import { FaUserCircle } from "react-icons/fa";
import { TrashIcon } from "@heroicons/react/24/outline";

const USERS_API = "http://localhost:5000/api/users";
const MySwal = withReactContent(Swal);

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("adminToken");

    const fetchUsers = async () => {
        try {
            const { data } = await API.get(`${USERS_API}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(data.users);
            setFilteredUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Search functionality
    useEffect(() => {
        const result = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredUsers(result);
    }, [search, users]);

    const handleDelete = async (user) => {
        const result = await MySwal.fire({
            title: "Are you sure?",
            text: `Delete ${user.name}? This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            await API.delete(`${USERS_API}/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updatedUsers = users.filter((u) => u._id !== user._id);
            setUsers(updatedUsers);

            MySwal.fire({
                title: "Deleted!",
                text: "User has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            MySwal.fire({
                title: "Error!",
                text: "Failed to delete user.",
                icon: "error",
            });
        }
    };

    // DataTable columns
    const columns = useMemo(() => [
        {
            name: "",
            center: true,
            cell: () => (
                <FaUserCircle className="w-8 h-8 text-gray-400" />
            ),
            button: true,
        },
        {
            name: "User",
            center: true,
            sortable: true,
            cell: (row) => (
                <span className="font-medium">{row.name}</span>
            ),
        },
        {
            name: "Email",
            center: true,
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Joined",
            center: true,
            selector: (row) =>
                new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Action",
            center: true,
            cell: (row) => (
                <button
                    onClick={() => handleDelete(row)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition-all duration-200 cursor-pointer"
                    title="Delete User"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            ),
        }
    ], [users]);

    const customStyles = {
        rows: {
            style: {
                minHeight: "60px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "#f9fafb",
            },
        },
        cells: {
            style: {
                fontSize: "13px",
            },
        },
    };

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Manage Users
                    </h1>

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                </div>

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={filteredUsers}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    customStyles={customStyles}
                    noDataComponent="No users found"
                />
            </div>
        </div>
    );
};

export default Users;