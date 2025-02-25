import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    console.log(user);

    // Logout handler
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosPublic.post("/logout", {});
            return data;
        },
        onSuccess: () => {
            toast.success("Logged out Successfully");
            navigate("/login");
        },
    });

    const handleLogout = async () => {
        await mutateAsync();
    };

    // Role-based navigation items with balance display
    const getNavItems = () => {
        if (!user || isLoading) {
            return [
                { to: "/login", label: "Login", isButton: false },
                { to: "/register", label: "Register", isButton: true },
            ];
        }


        switch (user.role) {
            case "user":
                return [
                    { to: "/dashboard", label: "Dashboard", isButton: false },
                    { to: "/send-money", label: "Send Money", isButton: false },
                    { to: "/cash-out", label: "Cash Out", isButton: false },
                    { to: "/profile", label: "Profile", isButton: false },
                    { to: "", label: "Logout", isButton: true, onClick: handleLogout },
                ];
            case "agent":
                return [
                    { to: "/agent-dashboard", label: "Dashboard", isButton: false },
                    { to: "/cash-in", label: "Cash In", isButton: false },
                    { to: "/balance-request", label: "Balance Request", isButton: false },
                    { to: "/profile", label: "Profile", isButton: false },
                    { to: "", label: "Logout", isButton: true, onClick: handleLogout },
                ];
            case "admin":
                return [
                    { to: "/admin", label: "Dashboard", isButton: false },
                    { to: "/admin/users", label: "Users", isButton: false },
                    { to: "/admin/agent-approvals", label: "Agent Approvals", isButton: false },
                    { to: "/admin/requests", label: "Requests", isButton: false },
                    { to: "", label: "Logout", isButton: true, onClick: handleLogout },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Side: Logo */}
                    <Logo />



                    {/* Toggle Button */}
                    <div className="flex space-x-6 items-center">
                        <span className="my-4 px-6 py-1 bg-emerald-200 rounded-full">Tk. {user?.balance}</span>
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
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16m-7 6h7"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Toggle Menu */}
                <div
                    className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={closeMenu}
                >
                    <div
                        className={`fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 space-y-4">
                            {navItems.map((item, index) =>
                                item.isButton ? (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            item.onClick?.();
                                            closeMenu();
                                        }}
                                        className="block w-full text-left bg-[#1D4ED8] text-white px-4 py-2 rounded-lg hover:bg-[#F59E0B] transition-all duration-300 font-semibold"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={index}
                                        to={item.to}
                                        className="block w-full text-[#111827] hover:text-[#1D4ED8] px-4 py-2 rounded-lg transition-colors duration-300 font-semibold"
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;