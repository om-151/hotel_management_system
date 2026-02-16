const Booking = () => {
    return (
        <div className="pt-28 max-w-xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Book Your Stay</h2>

            <form className="bg-white shadow rounded-xl p-6 space-y-4">
                <input type="date" className="w-full border p-3 rounded" />
                <input type="date" className="w-full border p-3 rounded" />
                <select className="w-full border p-3 rounded">
                    <option>Select Room</option>
                    <option>Deluxe</option>
                    <option>Luxury</option>
                    <option>Suite</option>
                </select>

                <button className="w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default Booking;
