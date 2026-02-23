import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const percent = (scrollTop / docHeight) * 100;
            setProgress(percent);

            setVisible(scrollTop > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (progress / 100) * circumference;

    return (
        <div
            className={`fixed bottom-10 right-10 z-50 transition-all duration-500 ${visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95 pointer-events-none"
                }`}
        >
            <button
                onClick={scrollToTop}
                className="relative w-14 h-14 flex items-center justify-center group cursor-pointer"
            >
                {/* Progress Circle */}
                <svg
                    className="absolute inset-0 rotate-[-90deg]"
                    width="56"
                    height="56"
                >
                    {/* Background circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="3"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="#d97706"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-200"
                    />
                </svg>

                {/* Inner Button */}
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-amber-600">
                    <ArrowUp
                        size={18}
                        className="text-gray-800 group-hover:text-white transition-colors duration-300"
                    />
                </div>
            </button>
        </div>
    );
};

export default BackToTop;