import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center px-4 sm:px-6">

            <div className="relative w-full max-w-2xl text-center py-16">

                {/* Decorative Blobs (Responsive + Safe) */}
                <div className="absolute -top-24 -left-24 w-56 h-56 sm:w-72 sm:h-72 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-24 -right-24 w-56 h-56 sm:w-72 sm:h-72 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                <div className="relative z-10">

                    {/* 404 */}
                    <h1 className="text-7xl sm:text-8xl md:text-[140px] font-extrabold text-amber-600 leading-none tracking-tight">
                        404
                    </h1>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
                        Oops! Page Not Found
                    </h2>

                    <p className="text-gray-500 mt-4 text-sm sm:text-base md:text-lg max-w-md mx-auto px-2">
                        The page you’re looking for might have been removed,
                        had its name changed, or is temporarily unavailable.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

                        <Link
                            to="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition duration-300"
                        >
                            <Home size={18} />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-2xl font-medium transition duration-300 cursor-pointer"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default NotFound;