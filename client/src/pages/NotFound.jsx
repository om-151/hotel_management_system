import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center px-6">

            <div className="max-w-2xl text-center relative">

                {/* Floating Decorative Circle */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>

                <div className="relative z-10">

                    {/* Big 404 */}
                    <h1 className="text-[110px] sm:text-[140px] font-extrabold text-amber-600 leading-none tracking-tight">
                        404
                    </h1>

                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-4">
                        Oops! Page Not Found
                    </h2>

                    <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-md mx-auto">
                        The page you’re looking for might have been removed,
                        had its name changed, or is temporarily unavailable.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

                        <Link
                            to="/"
                            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition duration-300"
                        >
                            <Home size={18} />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-2xl font-medium transition duration-300"
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