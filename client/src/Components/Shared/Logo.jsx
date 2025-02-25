import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="">
            {/* Stylized "X" with Curved Lines */}
            <Link to='/' className="flex items-center space-x-1">
                <div className="relative w-10 h-10">
                    <span className="absolute inset-0 w-8 h-1 bg-orange-500 rounded-full transform rotate-45 translate-y-3 translate-x-1"></span>
                    <span className="absolute inset-0 w-8 h-1 bg-orange-700 rounded-full transform -rotate-45 translate-y-3 -translate-x-1"></span>
                </div>
                {/* "kash" Text */}
                <span className="text-2xl font-semibold italic text-black">Kash</span>
            </Link>
        </div>
    );
};

export default Logo;