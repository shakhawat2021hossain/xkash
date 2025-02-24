import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false); // To close the menu when clicking a link

    return (
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Side: Logo */}
                    <Logo />

                    {/* Right Side: Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/login"
                            className="text-[#111827] text-sm font-medium hover:text-[#1D4ED8] transition-colors duration-300"
                        >
                            Login
                        </Link>

                        {/* Register Button */}
                        <Link
                            to="/register"
                            className="bg-[#1D4ED8] text-white px-4 py-2 rounded-lg hover:bg-[#10B981] hover:shadow-md transition-all duration-300 font-semibold"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-[#1D4ED8] hover:text-[#F59E0B] transition-colors duration-300 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu with Backdrop */}
                <div
                    className={`md:hidden w-full h-screen absolute top-0 right-0 bg-opacity-50 bg-gray-800 z-20 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
                    onClick={closeMenu} // Close on clicking outside
                >
                    <div className="w-2/3 h-full bg-gray-100 p-4 space-y-4 border-t border-gray-200">
                        <Link
                            to="/login"
                            className="block text-[#111827] hover:text-[#1D4ED8] transition-colors duration-300 text-lg font-semibold"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="block bg-[#1D4ED8] text-white px-4 py-2 rounded-lg hover:bg-[#10B981] hover:shadow-md transition-all duration-300 font-semibold text-lg"
                            onClick={closeMenu}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
