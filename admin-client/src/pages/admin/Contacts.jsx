import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../api/axios";
import { TrashIcon } from "@heroicons/react/24/outline";

const CONTACT_API = "http://localhost:5000/api/contacts";
const MySwal = withReactContent(Swal);

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("adminToken");

    const fetchContacts = async () => {
        try {
            const { data } = await API.get(`${CONTACT_API}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setContacts(data.data);
            setFilteredContacts(data.data);
        } catch (error) {
            console.error("Failed to fetch contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // 🔎 Search functionality
    useEffect(() => {
        const result = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.subject.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredContacts(result);
    }, [search, contacts]);

    const handleDelete = async (contact) => {
        const result = await MySwal.fire({
            title: "Are you sure?",
            text: `Delete message from ${contact.name}? This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            await API.delete(`${CONTACT_API}/${contact._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updatedContacts = contacts.filter(
                (c) => c._id !== contact._id
            );
            setContacts(updatedContacts);

            MySwal.fire({
                title: "Deleted!",
                text: "Message has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            MySwal.fire({
                title: "Error!",
                text: "Failed to delete message.",
                icon: "error",
            });
        }
    };

    // 📊 DataTable Columns
    const columns = useMemo(
        () => [
            {
                name: "Sender",
                center: true,
                sortable: true,
                selector: (row) => row.name,
                cell: (row) => (
                    <span className="font-medium text-gray-800">
                        {row.name}
                    </span>
                ),
            },
            {
                name: "Email",
                center: true,
                selector: (row) => row.email,
                sortable: true,
            },
            {
                name: "Subject",
                center: true,
                selector: (row) => row.subject,
                sortable: true,
            },
            {
                name: "Date",
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
                        title="Delete Message"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                ),
            },
        ],
        [contacts]
    );

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
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Contact Messages
                    </h1>

                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                </div>

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={filteredContacts}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    customStyles={customStyles}
                    noDataComponent="No messages found"
                />
            </div>
        </div>
    );
};

export default Contact;