import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="bg-[#F3F4F6] py-16 md:py-24 relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8]/10 to-[#F59E0B]/10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
                {/* Left: Text Content */}
                <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight mb-6 tracking-tight">
                        Your Money, Simplified with{" "}
                        <span className="bg-gradient-to-r from-[#1D4ED8] to-[#F59E0B] bg-clip-text text-transparent">
                            XKash
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#111827]/80 mb-8 max-w-lg mx-auto md:mx-0">
                        Send money, cash in, cash out—manage your finances effortlessly on a secure platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            to="/register"
                            className="bg-[#1D4ED8] text-white px-8 py-3 rounded-lg hover:bg-[#F59E0B] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white text-[#1D4ED8] px-8 py-3 rounded-lg border-2 border-[#1D4ED8] hover:bg-[#F3F4F6] hover:text-[#F59E0B] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right: Visual Element */}
                <div className="md:w-1/2 flex justify-center relative">
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        {/* Main Circle */}
                        <div className="absolute inset-0 bg-[#F59E0B]/20 rounded-full animate-pulse"></div>
                        {/* Inner Circle with Text */}
                        <div className="absolute inset-4 bg-[#1D4ED8]/10 rounded-full flex flex-col items-center justify-center p-6">
                            <div className="text-center space-y-4">
                                <p className="text-[#1D4ED8] text-lg md:text-2xl font-extrabold tracking-wide animate-fade-in">
                                    FAST
                                </p>
                                <p className="text-[#1D4ED8] text-lg md:text-2xl font-extrabold tracking-wide animate-fade-in delay-200">
                                    SECURE
                                </p>
                                <p className="text-[#1D4ED8] text-lg md:text-2xl font-extrabold tracking-wide animate-fade-in delay-400">
                                    SIMPLE
                                </p>
                            </div>
                            {/* Subtle Glow Effect */}
                            <div className="absolute inset-0 rounded-full bg-[#1D4ED8]/5 animate-pulse-slow"></div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#F59E0B] rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-[#1D4ED8] rounded-full animate-bounce delay-300"></div>
                        <div className="absolute top-1/2 -right-6 w-6 h-6 bg-[#F59E0B] rounded-full animate-ping"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;