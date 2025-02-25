import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="bg-[#F3F4F6] py-16 md:py-24 relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
                {/* Left: Text Content */}
                <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-tight mb-5 tracking-tight">
                        Your Money, Simplified with{' '}
                        <span className="bg-gradient-to-r from-primary to-[#F59E0B] bg-clip-text text-transparent">
                            XKash
                        </span>
                    </h1>
                    <p className="text-xl text-[#111827]/80 mb-8 max-w-lg mx-auto md:mx-0">
                        Send money, cash in, cash out—manage your finances effortlessly on a secure platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            to="/register"
                            className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-secondary transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white text-primary px-8 py-4 rounded-lg border-2 border-primary hover:bg-[#F3F4F6] hover:text-secondary transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right: Enhanced Illustration */}
                <div className="md:w-1/2 flex justify-center relative">
                    <div className="relative w-72 h-72 md:w-[28rem] md:h-[28rem]">
                        {/* Main Circle */}
                        <div className="absolute inset-0 bg-secondary/20 rounded-full animate-pulse"></div>
                        {/* Inner Circle with Enhanced Text */}
                        <div className="absolute inset-4 bg-primary/10 rounded-full flex flex-col items-center justify-center p-6">
                            <div className="text-center space-y-4">
                                <p className="text-primary text-xl md:text-3xl font-extrabold tracking-wide animate-fade-in">
                                    FAST
                                </p>
                                <p className="text-primary text-xl md:text-3xl font-extrabold tracking-wide animate-fade-in delay-200">
                                    SECURE
                                </p>
                                <p className="text-primary text-xl md:text-3xl font-extrabold tracking-wide animate-fade-in delay-400">
                                    SIMPLE
                                </p>
                            </div>
                            {/* Subtle Glow Effect */}
                            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow"></div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -left-6 w-10 h-10 bg-[#F59E0B] rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary rounded-full animate-bounce delay-300"></div>
                        <div className="absolute top-1/2 -right-8 w-8 h-8 bg-secondary rounded-full animate-ping"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;